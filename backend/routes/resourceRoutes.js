// const express = require('express');
// const router = express.Router();
// const { protect, admin } = require('../middleware/authMiddleware');
// const Resource = require('../models/Resource');
// const asyncHandler = require('express-async-handler');
//
// // @desc    Get all resources
// // @route   GET /api/resources
// // @access  Public
// router.get('/', asyncHandler(async (req, res) => {
//     // Filtering options
//     const { type, category, language, search } = req.query;
//
//     const filter = {};
//     if (type) filter.type = type;
//     if (category) filter.category = category;
//     if (language) filter.language = language;
//
//     if (search) {
//         filter.$or = [
//             { title: { $regex: search, $options: 'i' } },
//             { description: { $regex: search, $options: 'i' } }
//         ];
//     }
//
//     const resources = await Resource.find(filter).sort('-createdAt');
//     res.json({
//         success: true,
//         count: resources.length,
//         data: resources
//     });
// }));
//
// // @desc    Get single resource
// // @route   GET /api/resources/:id
// // @access  Public
// router.get('/:id', asyncHandler(async (req, res) => {
//     const resource = await Resource.findById(req.params.id);
//
//     if (!resource) {
//         res.status(404);
//         throw new Error('Resource not found');
//     }
//
//     res.json({
//         success: true,
//         data: resource
//     });
// }));
//
// // @desc    Create new resource
// // @route   POST /api/resources
// // @access  Private/Admin
// router.post('/', protect, admin, asyncHandler(async (req, res) => {
//     const { title, description, type, category, language, fileUrl, thumbnailUrl } = req.body;
//
//     // Basic validation
//     if (!title || !description || !type || !category || !language) {
//         res.status(400);
//         throw new Error('Please include all required fields');
//     }
//
//     const resource = await Resource.create({
//         title,
//         description,
//         type,
//         category,
//         language,
//         fileUrl,
//         thumbnailUrl,
//         createdBy: req.user._id
//     });
//
//     res.status(201).json({
//         success: true,
//         data: resource
//     });
// }));
//
// // @desc    Update resource
// // @route   PUT /api/resources/:id
// // @access  Private/Admin
// router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
//     const resource = await Resource.findById(req.params.id);
//
//     if (!resource) {
//         res.status(404);
//         throw new Error('Resource not found');
//     }
//
//     // Update fields
//     resource.title = req.body.title || resource.title;
//     resource.description = req.body.description || resource.description;
//     resource.type = req.body.type || resource.type;
//     resource.category = req.body.category || resource.category;
//     resource.language = req.body.language || resource.language;
//     resource.fileUrl = req.body.fileUrl || resource.fileUrl;
//     resource.thumbnailUrl = req.body.thumbnailUrl || resource.thumbnailUrl;
//
//     const updatedResource = await resource.save();
//
//     res.json({
//         success: true,
//         data: updatedResource
//     });
// }));
//
// // @desc    Delete resource
// // @route   DELETE /api/resources/:id
// // @access  Private/Admin
// router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
//     const resource = await Resource.findById(req.params.id);
//
//     if (!resource) {
//         res.status(404);
//         throw new Error('Resource not found');
//     }
//
//     await resource.remove();
//
//     res.json({
//         success: true,
//         data: {}
//     });
// }));
//
// // @desc    Increment resource view count
// // @route   PUT /api/resources/:id/views
// // @access  Public
// router.put('/:id/views', asyncHandler(async (req, res) => {
//     const resource = await Resource.findByIdAndUpdate(
//         req.params.id,
//         { $inc: { views: 1 } },
//         { new: true }
//     );
//
//     if (!resource) {
//         res.status(404);
//         throw new Error('Resource not found');
//     }
//
//     res.json({
//         success: true,
//         data: resource
//     });
// }));
//
// module.exports = router;
