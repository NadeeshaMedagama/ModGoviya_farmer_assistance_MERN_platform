import React, { useState } from 'react';
import { Search, Filter, MapPin, User, Phone, Mail, Star, Heart, Eye, Plus, Grid, List, ChevronDown, ShoppingCart, Shield, AlertTriangle } from 'lucide-react';
import Footer from "../components/layout/Footer";

const Marketplace = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPostForm, setShowPostForm] = useState(false);

    // Sample product data
    const products = [
        {
            id: 1,
            title: "Organic Tomato Seeds - Premium Quality",
            price: 150,
            category: "seeds",
            location: "Colombo, Western Province",
            seller: "Sunil Fernando",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400",
            description: "High-quality organic tomato seeds with 95% germination rate. Perfect for home gardens and commercial farming.",
            condition: "new",
            availability: "In Stock",
            contact: { phone: "+94 77 123 4567", email: "sunil@email.com" }
        },
        {
            id: 2,
            title: "Professional Farming Tractor - John Deere",
            price: 850000,
            category: "equipment",
            location: "Kandy, Central Province",
            seller: "Agricultural Machinery Ltd",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400",
            description: "Well-maintained John Deere tractor, perfect for medium to large scale farming operations.",
            condition: "used",
            availability: "Available",
            contact: { phone: "+94 81 234 5678", email: "machinery@email.com" }
        },
        {
            id: 3,
            title: "Organic Fertilizer - NPK 10:10:10",
            price: 2500,
            category: "fertilizers",
            location: "Galle, Southern Province",
            seller: "Green Farm Solutions",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
            description: "100% organic NPK fertilizer suitable for all types of crops. 50kg bag.",
            condition: "new",
            availability: "In Stock",
            contact: { phone: "+94 91 345 6789", email: "greenfarm@email.com" }
        },
        {
            id: 4,
            title: "Fresh Coconuts - Grade A",
            price: 45,
            category: "crops",
            location: "Kurunegala, North Western",
            seller: "Coconut Farmers Co-op",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400",
            description: "Fresh coconuts directly from our plantation. Perfect for drinking and cooking.",
            condition: "new",
            availability: "Available",
            contact: { phone: "+94 37 456 7890", email: "coconut@email.com" }
        },
        {
            id: 5,
            title: "Hand Tools Set - Complete Farming Kit",
            price: 3500,
            category: "tools",
            location: "Matara, Southern Province",
            seller: "Tool Master",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
            description: "Complete set of hand tools including spades, hoes, pruning shears, and more.",
            condition: "new",
            availability: "In Stock",
            contact: { phone: "+94 41 567 8901", email: "tools@email.com" }
        },
        {
            id: 6,
            title: "Water Buffalo for Farming",
            price: 125000,
            category: "livestock",
            location: "Anuradhapura, North Central",
            seller: "Livestock Traders",
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400",
            description: "Healthy water buffalo, excellent for plowing and dairy. Well-trained and docile.",
            condition: "used",
            availability: "Available",
            contact: { phone: "+94 25 678 9012", email: "livestock@email.com" }
        }
    ];

    const categories = [
        { id: 'all', name: 'All Categories', icon: '🌾' },
        { id: 'seeds', name: 'Seeds', icon: '🌱' },
        { id: 'crops', name: 'Crops', icon: '🌽' },
        { id: 'tools', name: 'Tools & Equipment', icon: '🛠️' },
        { id: 'fertilizers', name: 'Fertilizers', icon: '🧪' },
        { id: 'equipment', name: 'Heavy Equipment', icon: '🚜' },
        { id: 'livestock', name: 'Livestock', icon: '🐄' },
        { id: 'services', name: 'Services', icon: '⚙️' }
    ];

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesCategory && matchesSearch && matchesPrice;
    });

    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {product.condition === 'new' ? 'New' : 'Used'}
          </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{product.location}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <User className="w-4 h-4 mr-1" />
                    <span>{product.seller}</span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                        View Details
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );

    const ProductModal = ({ product, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>

                        <div>
                            <div className="mb-4">
                                <span className="text-3xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                                <span className={`ml-3 px-3 py-1 text-sm font-medium rounded-full ${
                                    product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                  {product.condition === 'new' ? 'New' : 'Used'}
                </span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                                    <span>{product.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <User className="w-5 h-5 text-gray-500 mr-2" />
                                    <span>{product.seller}</span>
                                    <div className="flex items-center ml-2">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Description</h3>
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Contact Seller
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-lg flex items-center justify-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email
                                    </button>
                                    <button className="border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-lg flex items-center justify-center">
                                        <AlertTriangle className="w-4 h-4 mr-2" />
                                        Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Farming Marketplace</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Buy and sell farming tools, seeds, crops, fertilizers, and more. Connect with other farmers and sellers near you.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative flex-1 max-w-2xl mx-auto lg:mx-0">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by item name, location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                            >
                                <Filter className="w-5 h-5 mr-2" />
                                Filters
                            </button>

                            <button
                                onClick={() => setShowPostForm(true)}
                                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Post Ad
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 space-y-6">
                        {/* Categories */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                            selectedCategory === category.id
                                                ? 'bg-green-100 text-green-800'
                                                : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="mr-2">{category.icon}</span>
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Safety Tips */}
                        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                            <div className="flex items-center mb-3">
                                <Shield className="w-5 h-5 text-yellow-600 mr-2" />
                                <h3 className="font-semibold text-yellow-800">Safety Tips</h3>
                            </div>
                            <ul className="text-sm text-yellow-700 space-y-2">
                                <li>• Meet in safe, public locations</li>
                                <li>• Don't pay in advance</li>
                                <li>• Verify seller information</li>
                                <li>• Inspect items before buying</li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {filteredProducts.length} products found
                </span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="location">By Location</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className={`grid gap-6 ${
                            viewMode === 'grid'
                                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                                : 'grid-cols-1'
                        }`}>
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
            <Footer />
        </div>
    );
};

export default Marketplace;
