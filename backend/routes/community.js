const express = require('express');
const { body, validationResult } = require('express-validator');
const CommunityPost = require('../models/CommunityPost');

const router = express.Router();

// GET /api/community - list posts with basic sorting
router.get('/', async (req, res) => {
    try {
        const { sort = 'recent', category, q } = req.query;
        const filter = {};
        if (category && category !== 'all') {
            filter.category = category;
        }
        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: 'i' } },
                { content: { $regex: q, $options: 'i' } }
            ];
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'popular') sortOption = { likes: -1 };
        if (sort === 'trending') sortOption = { views: -1 };

        const posts = await CommunityPost.find(filter).sort(sortOption).limit(100).lean();

        // Add computed fields similar to mock data
        const mapped = posts.map(p => ({
            id: p._id,
            title: p.title,
            content: p.content,
            author: p.anonymous ? 'Anonymous' : (p.author || 'Anonymous'),
            location: p.location || '',
            category: p.category,
            replies: (p.comments || []).length,
            likes: p.likes || 0,
            views: p.views || 0,
            timeAgo: new Date(p.createdAt).toLocaleString(),
            trending: !!p.trending,
            urgent: !!p.urgent,
            comments: (p.comments || []).map(c => ({
                id: c._id,
                author: c.author || 'Anonymous',
                content: c.content,
                timeAgo: new Date(c.createdAt).toLocaleString(),
                likes: c.likes || 0
            }))
        }));

        res.json(mapped);
    } catch (error) {
        console.error('Error fetching community posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
});

// POST /api/community - create a new post
router.post('/', [
    body('title').trim().isLength({ min: 3, max: 200 }),
    body('content').trim().isLength({ min: 10, max: 5000 }),
    body('category').trim().isLength({ min: 2, max: 50 }),
    body('anonymous').optional().isBoolean(),
    body('author').optional().trim().isLength({ min: 1, max: 100 }),
    body('location').optional().trim().isLength({ min: 0, max: 120 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content, category, anonymous, author, location } = req.body;
        const post = new CommunityPost({
            title,
            content,
            category,
            anonymous: !!anonymous,
            author: author || 'Anonymous',
            location: location || ''
        });
        const saved = await post.save();
        res.status(201).json({ id: saved._id });
    } catch (error) {
        console.error('Error creating community post:', error);
        res.status(500).json({ message: 'Failed to create post' });
    }
});

module.exports = router;


