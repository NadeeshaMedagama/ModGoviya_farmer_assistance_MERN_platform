import React, { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    MessageCircle,
    ThumbsUp,
    Clock,
    Users,
    Wheat,
    Beef,
    Bug,
    Wrench,
    Leaf,
    TrendingUp,
    AlertTriangle,
    Star,
    MapPin,
    Eye,
    Flag,
    Share2,
    Bookmark
} from 'lucide-react';
import Footer from "../components/layout/Footer";

const CommunityPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', category: '', content: '', anonymous: false });

    // Mock data for demonstration
    const categories = [
        { id: 'all', name: 'All Categories', icon: Users, color: 'bg-green-500' },
        { id: 'crops', name: 'Crop Discussions', icon: Wheat, color: 'bg-yellow-500' },
        { id: 'livestock', name: 'Livestock', icon: Beef, color: 'bg-red-500' },
        { id: 'pest', name: 'Pest & Disease', icon: Bug, color: 'bg-orange-500' },
        { id: 'equipment', name: 'Equipment & Tools', icon: Wrench, color: 'bg-blue-500' },
        { id: 'organic', name: 'Organic Farming', icon: Leaf, color: 'bg-green-600' },
        { id: 'market', name: 'Market Prices', icon: TrendingUp, color: 'bg-purple-500' }
    ];

    const posts = [
        {
            id: 1,
            title: 'Best fertilizer for rice cultivation in monsoon season?',
            content: 'I\'m planning to start rice cultivation next month. What fertilizers work best during heavy rainfall? Any specific brands you recommend?',
            author: 'Sunil Perera',
            location: 'Anuradhapura',
            category: 'crops',
            replies: 15,
            likes: 8,
            views: 45,
            timeAgo: '2 hours ago',
            trending: true,
            comments: [
                {
                    id: 1,
                    author: 'Kamala Silva',
                    content: 'I recommend using organic compost mixed with NPK 15:15:15. Works great in my paddy fields.',
                    timeAgo: '1 hour ago',
                    likes: 3
                }
            ]
        },
        {
            id: 2,
            title: 'Coconut tree disease - leaves turning yellow',
            content: 'My coconut trees are showing yellow leaves and some are falling. What could be the cause? Attached photos for reference.',
            author: 'Nimal Fernando',
            location: 'Kurunegala',
            category: 'pest',
            replies: 22,
            likes: 12,
            views: 78,
            timeAgo: '5 hours ago',
            urgent: true
        },
        {
            id: 3,
            title: 'Today\'s vegetable prices at Dambulla market',
            content: 'Tomato - Rs.120/kg, Carrot - Rs.80/kg, Cabbage - Rs.60/kg, Beans - Rs.180/kg. Prices are stable compared to last week.',
            author: 'Market Reporter',
            location: 'Dambulla',
            category: 'market',
            replies: 8,
            likes: 25,
            views: 156,
            timeAgo: '1 day ago'
        }
    ];

    const topContributors = [
        { name: 'Dr. Ajith Kumar', posts: 45, reputation: 892 },
        { name: 'Farmer Saman', posts: 38, reputation: 756 },
        { name: 'AgriExpert LK', posts: 32, reputation: 643 }
    ];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleNewPost = () => {
        if (newPost.title && newPost.category && newPost.content) {
            // In real app, this would make an API call
            console.log('New post created:', newPost);
            setShowNewPost(false);
            setNewPost({ title: '', category: '', content: '', anonymous: false });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">ModGoviya Farmer Community</h1>
                        <p className="text-xl text-green-100 max-w-2xl mx-auto">
                            Ask questions, share ideas, and connect with fellow farmers across Sri Lanka
                        </p>
                        <div className="mt-8 flex justify-center space-x-4">
                            <div className="bg-white/10 backdrop-blur rounded-lg px-6 py-3">
                                <div className="text-2xl font-bold">1,247</div>
                                <div className="text-sm text-green-100">Active Farmers</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg px-6 py-3">
                                <div className="text-2xl font-bold">3,892</div>
                                <div className="text-sm text-green-100">Discussions</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg px-6 py-3">
                                <div className="text-2xl font-bold">12,456</div>
                                <div className="text-sm text-green-100">Solutions Shared</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Categories */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                                selectedCategory === category.id
                                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className={`p-1 rounded ${category.color} text-white`}>
                                                <IconComponent size={16} />
                                            </div>
                                            <span className="text-sm font-medium">{category.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Top Contributors */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Star className="text-yellow-500 mr-2" size={20} />
                                Top Contributors
                            </h3>
                            <div className="space-y-3">
                                {topContributors.map((contributor, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-sm text-gray-800">{contributor.name}</div>
                                            <div className="text-xs text-gray-500">{contributor.posts} posts • {contributor.reputation} pts</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {!selectedPost && !showNewPost && (
                            <>
                                {/* Search and Controls */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Search discussions..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="recent">Most Recent</option>
                                            <option value="popular">Most Popular</option>
                                            <option value="trending">Trending</option>
                                            <option value="unanswered">Unanswered</option>
                                        </select>
                                        <button
                                            onClick={() => setShowNewPost(true)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                        >
                                            <Plus size={20} />
                                            <span>New Post</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Posts List */}
                                <div className="space-y-4">
                                    {filteredPosts.map((post) => (
                                        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            {post.trending && (
                                                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                                  🔥 Trending
                                </span>
                                                            )}
                                                            {post.urgent && (
                                                                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                                  <AlertTriangle size={12} className="mr-1" />
                                  Urgent
                                </span>
                                                            )}
                                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                                categories.find(c => c.id === post.category)?.color || 'bg-gray-500'
                                                            } text-white`}>
                                {categories.find(c => c.id === post.category)?.name}
                              </span>
                                                        </div>
                                                        <h3
                                                            className="text-lg font-semibold text-gray-800 hover:text-green-600 cursor-pointer mb-2"
                                                            onClick={() => setSelectedPost(post)}
                                                        >
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.content}</p>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                            <div className="flex items-center space-x-1">
                                                                <Users size={16} />
                                                                <span>{post.author}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <MapPin size={16} />
                                                                <span>{post.location}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Clock size={16} />
                                                                <span>{post.timeAgo}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                        <div className="flex items-center space-x-1">
                                                            <MessageCircle size={16} />
                                                            <span>{post.replies} replies</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <ThumbsUp size={16} />
                                                            <span>{post.likes} likes</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Eye size={16} />
                                                            <span>{post.views} views</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                                                            <Bookmark size={16} />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                                                            <Share2 size={16} />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                                            <Flag size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* New Post Form */}
                        {showNewPost && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Create New Discussion</h2>
                                    <button
                                        onClick={() => setShowNewPost(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Discussion Title</label>
                                        <input
                                            type="text"
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="What's your question or topic?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            value={newPost.category}
                                            onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.filter(c => c.id !== 'all').map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                            rows={6}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Describe your question or share your knowledge..."
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="anonymous"
                                            checked={newPost.anonymous}
                                            onChange={(e) => setNewPost({...newPost, anonymous: e.target.checked})}
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                        <label htmlFor="anonymous" className="text-sm text-gray-700">Post anonymously</label>
                                    </div>

                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            onClick={handleNewPost}
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                                        >
                                            Post Discussion
                                        </button>
                                        <button
                                            onClick={() => setShowNewPost(false)}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Post Detail View */}
                        {selectedPost && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <button
                                        onClick={() => setSelectedPost(null)}
                                        className="text-green-600 hover:text-green-700 mb-4 flex items-center space-x-2"
                                    >
                                        <span>← Back to discussions</span>
                                    </button>

                                    <div className="flex items-center space-x-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        categories.find(c => c.id === selectedPost.category)?.color || 'bg-gray-500'
                    } text-white`}>
                      {categories.find(c => c.id === selectedPost.category)?.name}
                    </span>
                                        {selectedPost.trending && (
                                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                        🔥 Trending
                      </span>
                                        )}
                                    </div>

                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedPost.title}</h1>
                                    <p className="text-gray-700 mb-4">{selectedPost.content}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Users size={16} />
                                                <span>{selectedPost.author}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <MapPin size={16} />
                                                <span>{selectedPost.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Clock size={16} />
                                                <span>{selectedPost.timeAgo}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                                                <ThumbsUp size={16} />
                                                <span>{selectedPost.likes}</span>
                                            </button>
                                            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                                <Bookmark size={16} />
                                            </button>
                                            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                                <Share2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        {selectedPost.replies} Replies
                                    </h3>

                                    {selectedPost.comments && selectedPost.comments.map((comment) => (
                                        <div key={comment.id} className="border-l-2 border-green-200 pl-4 mb-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="font-medium text-gray-800">{comment.author}</span>
                                                <span className="text-sm text-gray-500">{comment.timeAgo}</span>
                                            </div>
                                            <p className="text-gray-700 mb-2">{comment.content}</p>
                                            <button className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700">
                                                <ThumbsUp size={14} />
                                                <span>{comment.likes}</span>
                                            </button>
                                        </div>
                                    ))}

                                    {/* Reply Form */}
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                    <textarea
                        placeholder="Share your knowledge or ask for clarification..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-3"
                    />
                                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                                            Post Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Community Guidelines Footer */}
            <div className="bg-gray-100 border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Guidelines</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                        <div>
                            <h4 className="font-medium text-gray-800 mb-2">Be Respectful</h4>
                            <p>Treat all community members with respect and kindness. Share knowledge constructively.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800 mb-2">Stay Relevant</h4>
                            <p>Keep discussions focused on farming, agriculture, and related topics that help fellow farmers.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800 mb-2">Report Issues</h4>
                            <p>Help keep our community safe by reporting spam, inappropriate content, or harassment.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CommunityPage;
