import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Phone,
    Mail,
    MapPin,
    Star,
    Award,
    Briefcase,
    GraduationCap,
    Users,
    CheckCircle,
    Video,
    MessageCircle,
    FileText,
    Zap,
    Shield,
    TrendingUp,
    Leaf,
    Droplets,
    Bug,
    Wheat,
    Tractor,
    DollarSign,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Globe,
    Languages,
    Clock3,
    X
} from 'lucide-react';

const ExpertConsultationPage = () => {
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [selectedService, setSelectedService] = useState('video-call');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        farmSize: '',
        location: '',
        cropType: '',
        issue: '',
        priority: 'medium'
    });

    const experts = [
        {
            id: 'priya-sharma',
            name: 'Dr. Priya Sharma',
            title: 'Senior Agricultural Extension Officer',
            specialization: 'Monsoon & Seasonal Farming',
            experience: '15+ years',
            rating: 4.9,
            reviews: 342,
            languages: ['English', 'Hindi', 'Marathi'],
            location: 'Maharashtra, India',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
            expertise: ['Crop Protection', 'Weather Management', 'Irrigation Planning', 'Pest Control'],
            education: 'PhD in Agricultural Sciences, MS University',
            certifications: ['Certified Crop Advisor', 'Sustainable Agriculture Expert'],
            availability: 'Mon-Fri: 9AM-6PM',
            rate: '₹2,500/hour',
            description: 'Specialized in monsoon farming techniques with over 15 years of field experience helping farmers maximize yield during challenging weather conditions.'
        },
        {
            id: 'rajesh-kumar',
            name: 'Prof. Rajesh Kumar',
            title: 'Water Management Specialist',
            specialization: 'Irrigation & Water Conservation',
            experience: '20+ years',
            rating: 4.8,
            reviews: 298,
            languages: ['English', 'Hindi', 'Punjabi'],
            location: 'Punjab, India',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
            expertise: ['Smart Irrigation', 'Water Conservation', 'Soil Management', 'Technology Integration'],
            education: 'PhD in Water Resources Engineering, IIT Delhi',
            certifications: ['Water Management Professional', 'Smart Agriculture Technology'],
            availability: 'Mon-Sat: 8AM-5PM',
            rate: '₹3,000/hour',
            description: 'Leading expert in water management and smart irrigation systems, helping farmers implement cutting-edge water conservation technologies.'
        },
        {
            id: 'meera-patel',
            name: 'Dr. Meera Patel',
            title: 'Organic Farming Expert',
            specialization: 'Organic & Sustainable Farming',
            experience: '12+ years',
            rating: 4.9,
            reviews: 276,
            languages: ['English', 'Hindi', 'Gujarati'],
            location: 'Gujarat, India',
            image: 'https://images.unsplash.com/photo-1594824475317-2cd8debbe5d4?w=300&h=300&fit=crop&crop=face',
            expertise: ['Organic Pest Control', 'Soil Health', 'Sustainable Practices', 'Certification Guidance'],
            education: 'PhD in Organic Agriculture, Gujarat Agricultural University',
            certifications: ['Organic Farming Consultant', 'Sustainable Agriculture Advisor'],
            availability: 'Tue-Sat: 10AM-7PM',
            rate: '₹2,200/hour',
            description: 'Passionate advocate for organic farming with extensive experience in helping farmers transition to sustainable and profitable organic practices.'
        },
        {
            id: 'arjun-singh',
            name: 'Dr. Arjun Singh',
            title: 'Crop Disease Specialist',
            specialization: 'Plant Pathology & Disease Management',
            experience: '18+ years',
            rating: 4.7,
            reviews: 189,
            languages: ['English', 'Hindi', 'Bengali'],
            location: 'West Bengal, India',
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
            expertise: ['Disease Diagnosis', 'Treatment Protocols', 'Preventive Measures', 'Crop Recovery'],
            education: 'PhD in Plant Pathology, Calcutta University',
            certifications: ['Plant Disease Diagnostician', 'Integrated Pest Management'],
            availability: 'Mon-Fri: 9AM-5PM',
            rate: '₹2,800/hour',
            description: 'Expert in diagnosing and treating crop diseases with a proven track record of saving farmers from significant crop losses.'
        }
    ];

    const services = [
        {
            id: 'video-call',
            name: 'Video Consultation',
            icon: Video,
            duration: '60 minutes',
            description: 'Face-to-face consultation with screen sharing for detailed discussions',
            features: ['Real-time problem solving', 'Visual crop analysis', 'Document sharing', 'Recording available']
        },
        {
            id: 'phone-call',
            name: 'Phone Consultation',
            icon: Phone,
            duration: '45 minutes',
            description: 'Voice consultation for quick problem-solving and guidance',
            features: ['Immediate assistance', 'Audio recording', 'Follow-up notes', 'Flexible scheduling']
        },
        {
            id: 'field-visit',
            name: 'On-Site Field Visit',
            icon: MapPin,
            duration: '2-3 hours',
            description: 'Expert visits your farm for hands-on assessment and guidance',
            features: ['Physical inspection', 'Soil testing', 'Detailed report', 'Implementation guidance']
        },
        {
            id: 'report-analysis',
            name: 'Report Analysis',
            icon: FileText,
            duration: '2-3 days',
            description: 'Detailed analysis of your soil reports, crop data, or farming records',
            features: ['Comprehensive analysis', 'Written recommendations', 'Action plan', 'Follow-up support']
        }
    ];

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    const faqs = [
        {
            question: 'How do I choose the right expert for my needs?',
            answer: 'Each expert has specific areas of specialization listed on their profile. Consider your primary concern (irrigation, pest control, organic farming, etc.) and match it with the expert\'s expertise. You can also read reviews and check their experience level.'
        },
        {
            question: 'What happens during a video consultation?',
            answer: 'During a video consultation, you\'ll have a face-to-face conversation with the expert via our secure platform. You can share your screen, show photos/videos of your crops, discuss problems in real-time, and receive immediate guidance. Sessions are recorded for your reference.'
        },
        {
            question: 'Can I get a refund if I\'m not satisfied?',
            answer: 'Yes, we offer a 100% satisfaction guarantee. If you\'re not completely satisfied with your consultation, we\'ll provide a full refund or reschedule with another expert at no additional cost.'
        },
        {
            question: 'Do experts provide follow-up support?',
            answer: 'Yes, all consultations include 7 days of follow-up support via chat or email. For complex issues, experts may recommend additional sessions or provide extended support plans.'
        },
        {
            question: 'Is my farming data kept confidential?',
            answer: 'Absolutely. We follow strict data privacy protocols. All your farming data, consultation records, and personal information are encrypted and never shared with third parties without your explicit consent.'
        }
    ];

    const handleBooking = () => {
        if (!selectedExpert || !selectedService || !selectedDate || !selectedTime) {
            alert('Please select an expert, service type, date, and time slot');
            return;
        }
        setShowBookingForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the booking data to your backend
        alert('Consultation booked successfully! You will receive a confirmation email shortly.');
        setShowBookingForm(false);
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            farmSize: '',
            location: '',
            cropType: '',
            issue: '',
            priority: 'medium'
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const toggleFAQ = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-6">
                            <Award className="w-4 h-4 mr-2" />
                            Expert Agricultural Consultation
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Get Expert Guidance for Your
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"> Farm</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            Connect with certified agricultural experts who have helped thousands of farmers increase their yield,
                            solve complex problems, and implement modern farming techniques.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 text-emerald-600 mr-2" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">5,000+ Farmers Helped</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.8/5 Average Rating</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-lg">
                                <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">25% Avg Yield Increase</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-20">
                {/* Expert Selection */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Choose Your Agricultural Expert
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {experts.map((expert) => (
                            <div
                                key={expert.id}
                                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                                    selectedExpert?.id === expert.id
                                        ? 'ring-4 ring-emerald-500 ring-opacity-50'
                                        : 'hover:shadow-2xl'
                                }`}
                                onClick={() => setSelectedExpert(expert)}
                            >
                                <div className="p-8">
                                    <div className="flex items-start space-x-6">
                                        <div className="relative">
                                            <img
                                                src={expert.image}
                                                alt={expert.name}
                                                className="w-24 h-24 rounded-xl object-cover"
                                            />
                                            <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-2">
                                                <Award className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {expert.name}
                                            </h3>
                                            <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                                                {expert.title}
                                            </p>
                                            <div className="flex items-center mb-3">
                                                <div className="flex items-center mr-4">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                                                        {expert.rating} ({expert.reviews} reviews)
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {expert.experience} experience
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                                {expert.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {expert.expertise.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {expert.location}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Rate</span>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {expert.rate}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex items-center space-x-2">
                                                <Languages className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {expert.languages.join(', ')}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                                                <Clock3 className="w-4 h-4 mr-1" />
                                                {expert.availability}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedExpert && (
                    <>
                        {/* Service Selection */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                Choose Consultation Type
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {services.map((service) => (
                                    <div
                                        key={service.id}
                                        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                            selectedService === service.id
                                                ? 'ring-4 ring-emerald-500 ring-opacity-50 bg-emerald-50 dark:bg-emerald-900/20'
                                                : 'hover:shadow-xl'
                                        }`}
                                        onClick={() => setSelectedService(service.id)}
                                    >
                                        <div className="text-center">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl mb-4">
                                                <service.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                                {service.name}
                                            </h3>
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                                                {service.duration}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                {service.description}
                                            </p>
                                            <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                                {service.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <CheckCircle className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Date and Time Selection */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                Select Date & Time
                            </h2>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            <CalendarIcon className="w-5 h-5 inline mr-2" />
                                            Choose Date
                                        </label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            <Clock className="w-5 h-5 inline mr-2" />
                                            Choose Time
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        selectedTime === time
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/20'
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {selectedDate && selectedTime && (
                                    <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            Consultation Summary
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Expert:</strong> {selectedExpert.name}</p>
                                            <p><strong>Service:</strong> {services.find(s => s.id === selectedService)?.name}</p>
                                            <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                                            <p><strong>Time:</strong> {selectedTime}</p>
                                            <p><strong>Rate:</strong> {selectedExpert.rate}</p>
                                        </div>
                                        <button
                                            onClick={handleBooking}
                                            className="w-full mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
                                        >
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Book Consultation
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* FAQ Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {faq.question}
                                    </span>
                                    {expandedFAQ === index ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>
                                {expandedFAQ === index && (
                                    <div className="px-8 pb-6">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Why Choose Our Expert Network
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl mb-6">
                                <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Certified Experts
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                All our experts are certified professionals with advanced degrees and years of field experience.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl mb-6">
                                <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Proven Results
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Our experts have helped over 5,000 farmers achieve an average 25% increase in crop yield.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl mb-6">
                                <MessageCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Ongoing Support
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Get continued support after your consultation with follow-up sessions and expert guidance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Form Modal */}
            {showBookingForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Complete Your Booking
                                </h2>
                                <button
                                    onClick={() => setShowBookingForm(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Farm Size (acres)
                                        </label>
                                        <input
                                            type="text"
                                            name="farmSize"
                                            value={formData.farmSize}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Primary Crop Type
                                        </label>
                                        <select
                                            name="cropType"
                                            value={formData.cropType}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Select crop type</option>
                                            <option value="rice">Rice</option>
                                            <option value="wheat">Wheat</option>
                                            <option value="cotton">Cotton</option>
                                            <option value="sugarcane">Sugarcane</option>
                                            <option value="vegetables">Vegetables</option>
                                            <option value="fruits">Fruits</option>
                                            <option value="pulses">Pulses</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Describe Your Issue or Goals
                                    </label>
                                    <textarea
                                        name="issue"
                                        rows={4}
                                        value={formData.issue}
                                        onChange={handleInputChange}
                                        placeholder="Please describe the specific challenges you're facing or what you hope to achieve from this consultation..."
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Priority Level
                                    </label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="low">Low - General guidance</option>
                                        <option value="medium">Medium - Moderate concern</option>
                                        <option value="high">High - Urgent issue</option>
                                        <option value="critical">Critical - Emergency</option>
                                    </select>
                                </div>

                                {/* Consultation Summary in Form */}
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Booking Summary
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Expert:</span>
                                            <p className="text-gray-900 dark:text-white">{selectedExpert.name}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Service:</span>
                                            <p className="text-gray-900 dark:text-white">{services.find(s => s.id === selectedService)?.name}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Date:</span>
                                            <p className="text-gray-900 dark:text-white">{new Date(selectedDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Time:</span>
                                            <p className="text-gray-900 dark:text-white">{selectedTime}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Total Cost:</span>
                                            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                                {selectedExpert.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowBookingForm(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
                                    >
                                        <Calendar className="w-5 h-5 mr-2" />
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpertConsultationPage;
