import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    Calendar,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    Clock,
    Sprout,
    MapPin,
    TrendingUp,
    Camera
} from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const CropManagement = () => {
    const [crops, setCrops] = useState([
        {
            id: 1,
            name: 'Basmati Rice',
            type: 'Grain',
            startDate: '2024-06-01',
            harvestDate: '2024-10-15',
            location: 'Field A-1',
            quantity: '5 Acres',
            status: 'Growing',
            progress: 65,
            fertilizers: 'NPK 10-10-10, Urea',
            notes: 'Growth looking healthy, regular watering maintained'
        },
        {
            id: 2,
            name: 'Tomatoes',
            type: 'Vegetable',
            startDate: '2024-05-15',
            harvestDate: '2024-08-20',
            location: 'Greenhouse B',
            quantity: '200 Plants',
            status: 'Ready to Harvest',
            progress: 95,
            fertilizers: 'Compost, Bone meal',
            notes: 'Fruits are ripening well'
        },
        {
            id: 3,
            name: 'Wheat',
            type: 'Grain',
            startDate: '2024-11-01',
            harvestDate: '2025-04-15',
            location: 'Field C-2',
            quantity: '8 Acres',
            status: 'Planted',
            progress: 15,
            fertilizers: 'DAP, Potash',
            notes: 'Recently planted, monitoring germination'
        }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [showCalendar, setShowCalendar] = useState(false);
    const [newCrop, setNewCrop] = useState({
        name: '',
        type: 'Vegetable',
        startDate: '',
        harvestDate: '',
        location: '',
        quantity: '',
        fertilizers: '',
        notes: ''
    });

    const cropTypes = ['Vegetable', 'Grain', 'Fruit', 'Legume', 'Herb', 'Cash Crop'];
    const statusOptions = ['All', 'Planted', 'Growing', 'Ready to Harvest', 'Harvested', 'Failed'];

    const getStatusColor = (status) => {
        switch(status) {
            case 'Planted': return 'bg-blue-100 text-blue-800';
            case 'Growing': return 'bg-green-100 text-green-800';
            case 'Ready to Harvest': return 'bg-yellow-100 text-yellow-800';
            case 'Harvested': return 'bg-gray-100 text-gray-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getProgressColor = (progress) => {
        if (progress < 25) return 'bg-red-500';
        if (progress < 50) return 'bg-yellow-500';
        if (progress < 75) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const filteredCrops = crops.filter(crop => {
        const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crop.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || crop.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleAddCrop = () => {
        if (!newCrop.name || !newCrop.type || !newCrop.startDate || !newCrop.harvestDate || !newCrop.location || !newCrop.quantity) {
            alert('Please fill in all required fields');
            return;
        }

        const crop = {
            id: Date.now(),
            ...newCrop,
            status: 'Planted',
            progress: 5
        };
        setCrops([...crops, crop]);
        setNewCrop({
            name: '',
            type: 'Vegetable',
            startDate: '',
            harvestDate: '',
            location: '',
            quantity: '',
            fertilizers: '',
            notes: ''
        });
        setShowAddForm(false);
    };

    const handleMarkHarvested = (id) => {
        setCrops(crops.map(crop =>
            crop.id === id ? { ...crop, status: 'Harvested', progress: 100 } : crop
        ));
    };

    const handleDeleteCrop = (id) => {
        setCrops(crops.filter(crop => crop.id !== id));
    };

    const getDaysRemaining = (harvestDate) => {
        const today = new Date();
        const harvest = new Date(harvestDate);
        const diffTime = harvest - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Manage Your Crops Easily</h1>
                            <p className="text-green-100 text-lg">Track your crop lifecycle from planting to harvesting. Stay organized and improve your yield.</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-4 text-green-100">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{crops.length}</div>
                                    <div className="text-sm">Total Crops</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{crops.filter(c => c.status === 'Growing').length}</div>
                                    <div className="text-sm">Growing</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{crops.filter(c => c.status === 'Ready to Harvest').length}</div>
                                    <div className="text-sm">Ready</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Action Bar */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search crops..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowCalendar(!showCalendar)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Calendar className="w-5 h-5" />
                                Calendar
                            </button>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add Crop
                            </button>
                        </div>
                    </div>
                </div>

                {/* Crop Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredCrops.map(crop => (
                        <div key={crop.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{crop.name}</h3>
                                        <p className="text-sm text-gray-600">{crop.type}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}>
                    {crop.status}
                  </span>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {crop.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Sprout className="w-4 h-4 mr-2" />
                                        {crop.quantity}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-2" />
                                        {getDaysRemaining(crop.harvestDate) > 0 ?
                                            `${getDaysRemaining(crop.harvestDate)} days remaining` :
                                            'Harvest time!'
                                        }
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span>{crop.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(crop.progress)}`}
                                            style={{ width: `${crop.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedCrop(crop)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button className="flex items-center justify-center px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    {crop.status === 'Ready to Harvest' && (
                                        <button
                                            onClick={() => handleMarkHarvested(crop.id)}
                                            className="flex items-center justify-center px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteCrop(crop.id)}
                                        className="flex items-center justify-center px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tips Panel */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <TrendingUp className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Farming Tips</h3>
                            <p className="text-gray-700 mb-2">This week is ideal for applying fertilizer to your grain crops. Monitor weather conditions for optimal timing.</p>
                            <p className="text-sm text-gray-600">💡 Tip: Early morning is the best time for crop inspection and treatment application.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Crop Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Add New Crop</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={newCrop.name}
                                        onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                                        placeholder="e.g., Basmati Rice"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type *</label>
                                    <select
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={newCrop.type}
                                        onChange={(e) => setNewCrop({...newCrop, type: e.target.value})}
                                    >
                                        {cropTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date *</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={newCrop.startDate}
                                        onChange={(e) => setNewCrop({...newCrop, startDate: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Harvest Date *</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={newCrop.harvestDate}
                                        onChange={(e) => setNewCrop({...newCrop, harvestDate: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Field/Plot Location *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={newCrop.location}
                                        onChange={(e) => setNewCrop({...newCrop, location: e.target.value})}
                                        placeholder="e.g., Field A-1, Greenhouse B"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Planted *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        value={newCrop.quantity}
                                        onChange={(e) => setNewCrop({...newCrop, quantity: e.target.value})}
                                        placeholder="e.g., 5 Acres, 200 Plants, 10 Kg"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizers/Treatments</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={newCrop.fertilizers}
                                    onChange={(e) => setNewCrop({...newCrop, fertilizers: e.target.value})}
                                    placeholder="e.g., NPK 10-10-10, Urea, Compost"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes/Observations</label>
                                <textarea
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={newCrop.notes}
                                    onChange={(e) => setNewCrop({...newCrop, notes: e.target.value})}
                                    placeholder="Any additional notes about soil condition, weather, etc."
                                ></textarea>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleAddCrop}
                                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Add Crop
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Crop Details Modal */}
            {selectedCrop && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedCrop.name}</h2>
                                    <p className="text-gray-600">{selectedCrop.type}</p>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedCrop.status)}`}>
                  {selectedCrop.status}
                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Information</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Location:</span>
                                                <span className="font-medium">{selectedCrop.location}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Quantity:</span>
                                                <span className="font-medium">{selectedCrop.quantity}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Planted:</span>
                                                <span className="font-medium">{new Date(selectedCrop.startDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Harvest:</span>
                                                <span className="font-medium">{new Date(selectedCrop.harvestDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Days Remaining:</span>
                                                <span className="font-medium">{getDaysRemaining(selectedCrop.harvestDate)} days</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Timeline</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                                                <span className="text-sm">Planted - {new Date(selectedCrop.startDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded-full mr-3 ${selectedCrop.progress > 25 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className="text-sm">Germination</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded-full mr-3 ${selectedCrop.progress > 50 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className="text-sm">Growing</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded-full mr-3 ${selectedCrop.progress > 75 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className="text-sm">Maturation</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className={`w-4 h-4 rounded-full mr-3 ${selectedCrop.progress === 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className="text-sm">Harvest Ready</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatments & Fertilizers</h3>
                                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedCrop.fertilizers || 'No treatments recorded'}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes & Observations</h3>
                                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedCrop.notes || 'No notes recorded'}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Photo</h3>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-600 mb-2">Upload crop photos</p>
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                                Choose File
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Update Progress
                                </button>
                                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    Add Note
                                </button>
                                <button
                                    onClick={() => setSelectedCrop(null)}
                                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CropManagement;
