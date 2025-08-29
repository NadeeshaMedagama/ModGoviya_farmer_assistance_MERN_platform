import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    User,
    Smartphone,
    Globe,
    Leaf,
    ArrowLeft,
    ChevronRight,
    Search,
    Settings,
    Lock,
    UserPlus,
    LogIn,
    RefreshCw,
    Trash2,
    Eye,
    EyeOff,
    Download,
    Bell,
    Bug,
    CreditCard,
    ShoppingCart,
    Package,
    TrendingUp,
    DollarSign,
    Shield,
    Headphones,
    Cloud,
    Calendar,
    BarChart3,
    Sprout,
    Thermometer,
    Droplets,
    Wind,
    Sun,
    AlertTriangle,
    BookOpen,
    Video,
    MessageCircle,
    Phone,
    Mail,
    CheckCircle,
    Info,
    HelpCircle,
    Star,
    Users,
    MapPin,
    Zap,
    Filter,
    SortAsc
} from 'lucide-react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const SupportCategoriesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('account');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);

    const categories = [
        {
            id: 'account',
            title: 'Account & Profile',
            description: 'Help with account setup, profile management, and login issues',
            icon: User,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            borderColor: 'border-blue-200 dark:border-blue-800'
        },
        {
            id: 'mobile',
            title: 'Mobile App',
            description: 'Support for iOS and Android app features and troubleshooting',
            icon: Smartphone,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            borderColor: 'border-green-200 dark:border-green-800'
        },
        {
            id: 'marketplace',
            title: 'Marketplace',
            description: 'Buying, selling, payment issues, and transaction support',
            icon: Globe,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            borderColor: 'border-purple-200 dark:border-purple-800'
        },
        {
            id: 'farming',
            title: 'Farming Tools',
            description: 'Weather data, crop planning, and agricultural guidance',
            icon: Leaf,
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            borderColor: 'border-orange-200 dark:border-orange-800'
        }
    ];

    const categoryContent = {
        account: {
            title: 'Account & Profile Support',
            subtitle: 'Get help with your ModGoviya account setup, profile management, and access issues',
            sections: [
                {
                    title: 'Getting Started',
                    icon: UserPlus,
                    items: [
                        {
                            title: 'Creating Your Account',
                            description: 'Step-by-step guide to register on ModGoviya platform',
                            solutions: [
                                'Visit ModGoviya website or download mobile app',
                                'Click "Sign Up" and choose account type (Farmer/Buyer/Supplier)',
                                'Fill in basic information: name, phone, email, location',
                                'Verify phone number with SMS code',
                                'Complete your farmer profile with crop types and farm details'
                            ]
                        },
                        {
                            title: 'Account Verification',
                            description: 'How to verify your farmer credentials and farm details',
                            solutions: [
                                'Upload government-issued ID (NIC/Passport)',
                                'Provide land ownership documents or lease agreement',
                                'Submit recent photos of your farm/crops',
                                'Wait 24-48 hours for verification review',
                                'Receive email confirmation once approved'
                            ]
                        }
                    ]
                },
                {
                    title: 'Login Issues',
                    icon: LogIn,
                    items: [
                        {
                            title: 'Forgot Password',
                            description: 'Reset your password when you cannot access your account',
                            solutions: [
                                'Click "Forgot Password" on login page',
                                'Enter registered email or phone number',
                                'Check SMS/email for reset code',
                                'Enter verification code and create new password',
                                'Password must be 8+ characters with numbers and symbols'
                            ]
                        },
                        {
                            title: 'Account Locked',
                            description: 'What to do when your account is temporarily locked',
                            solutions: [
                                'Account locks after 5 failed login attempts',
                                'Wait 30 minutes for automatic unlock',
                                'Or click "Unlock Account" and verify with SMS',
                                'Contact support if repeatedly locked',
                                'Review security settings to prevent future locks'
                            ]
                        }
                    ]
                },
                {
                    title: 'Profile Management',
                    icon: Settings,
                    items: [
                        {
                            title: 'Updating Farm Information',
                            description: 'Keep your farm profile current with latest details',
                            solutions: [
                                'Go to Profile > Farm Details',
                                'Update crop types, growing seasons, farm size',
                                'Add new cultivation methods or certifications',
                                'Upload recent farm photos',
                                'Save changes and wait for verification if needed'
                            ]
                        },
                        {
                            title: 'Language Preferences',
                            description: 'Change your language settings to Sinhala, Tamil, or English',
                            solutions: [
                                'Access Settings > Language & Region',
                                'Select preferred language (Sinhala/Tamil/English)',
                                'Choose date and number format preferences',
                                'Update currency display settings',
                                'Changes apply immediately across the platform'
                            ]
                        }
                    ]
                },
                {
                    title: 'Privacy & Security',
                    icon: Shield,
                    items: [
                        {
                            title: 'Account Security Settings',
                            description: 'Protect your account with enhanced security features',
                            solutions: [
                                'Enable two-factor authentication (2FA)',
                                'Set up login notifications',
                                'Review active sessions and devices',
                                'Create strong, unique password',
                                'Monitor account activity regularly'
                            ]
                        },
                        {
                            title: 'Privacy Controls',
                            description: 'Manage what information is visible to other users',
                            solutions: [
                                'Control farm location visibility',
                                'Set contact information privacy levels',
                                'Manage marketplace profile visibility',
                                'Choose what crops/products to display publicly',
                                'Review data sharing preferences'
                            ]
                        }
                    ]
                }
            ],
            commonIssues: [
                'Cannot receive SMS verification codes',
                'Email not found in system',
                'Profile information not saving',
                'Unable to upload farm photos',
                'Verification taking too long'
            ]
        },
        mobile: {
            title: 'Mobile App Support',
            subtitle: 'Get help with ModGoviya mobile app features and troubleshooting for iOS and Android',
            sections: [
                {
                    title: 'App Installation',
                    icon: Download,
                    items: [
                        {
                            title: 'Downloading ModGoviya App',
                            description: 'Get the official ModGoviya app on your device',
                            solutions: [
                                'iOS: Search "ModGoviya" on App Store',
                                'Android: Find on Google Play Store',
                                'Minimum requirements: iOS 12+ or Android 8+',
                                'Ensure stable internet connection for download',
                                'App size: ~50MB, requires 100MB free space'
                            ]
                        },
                        {
                            title: 'App Not Installing',
                            description: 'Troubleshoot installation problems',
                            solutions: [
                                'Check device storage - need 200MB free space',
                                'Ensure strong internet connection',
                                'Update your device operating system',
                                'Clear Play Store/App Store cache',
                                'Restart device and try again'
                            ]
                        }
                    ]
                },
                {
                    title: 'App Features',
                    icon: Smartphone,
                    items: [
                        {
                            title: 'Weather Notifications',
                            description: 'Set up and manage weather alerts for your crops',
                            solutions: [
                                'Enable notifications in device settings',
                                'Go to Weather > Notification Settings',
                                'Choose alert types: rain, temperature, wind, humidity',
                                'Set location-specific weather zones',
                                'Configure timing for morning/evening updates'
                            ]
                        },
                        {
                            title: 'Offline Mode',
                            description: 'Access key features without internet connection',
                            solutions: [
                                'Download weather data when connected',
                                'Save crop calendar offline',
                                'Cache marketplace listings for viewing',
                                'Sync data when connection restored',
                                'Access emergency contact numbers offline'
                            ]
                        },
                        {
                            title: 'Camera & Photo Features',
                            description: 'Use camera for crop monitoring and marketplace listings',
                            solutions: [
                                'Grant camera permission in device settings',
                                'Use crop health scanner with built-in camera',
                                'Take high-quality photos for marketplace',
                                'Apply filters to enhance crop images',
                                'Compress photos automatically for faster upload'
                            ]
                        }
                    ]
                },
                {
                    title: 'Performance Issues',
                    icon: Bug,
                    items: [
                        {
                            title: 'App Running Slowly',
                            description: 'Improve app performance and responsiveness',
                            solutions: [
                                'Close background apps to free memory',
                                'Clear ModGoviya app cache',
                                'Update to latest app version',
                                'Restart your device',
                                'Check available storage space (need 500MB+)'
                            ]
                        },
                        {
                            title: 'App Crashes',
                            description: 'Fix frequent app crashes and freezing',
                            solutions: [
                                'Update app to latest version',
                                'Restart device and reopen app',
                                'Clear app data and log in again',
                                'Check device OS compatibility',
                                'Report crash details to support team'
                            ]
                        }
                    ]
                },
                {
                    title: 'Sync & Data',
                    icon: RefreshCw,
                    items: [
                        {
                            title: 'Data Not Syncing',
                            description: 'Ensure your data stays updated across devices',
                            solutions: [
                                'Check internet connection stability',
                                'Log out and log back in',
                                'Enable background app refresh',
                                'Manually sync in Settings > Data Sync',
                                'Contact support if sync errors persist'
                            ]
                        }
                    ]
                }
            ],
            commonIssues: [
                'Push notifications not working',
                'GPS location not accurate',
                'Camera permission denied',
                'App consuming too much battery',
                'Login issues on mobile'
            ]
        },
        marketplace: {
            title: 'Marketplace Support',
            subtitle: 'Get help with buying, selling, payments, and transactions on ModGoviya marketplace',
            sections: [
                {
                    title: 'Selling Your Produce',
                    icon: Package,
                    items: [
                        {
                            title: 'Creating Product Listings',
                            description: 'List your agricultural products effectively',
                            solutions: [
                                'Take high-quality photos of your produce',
                                'Write detailed descriptions including variety, grade',
                                'Set competitive prices based on market rates',
                                'Specify quantity available and harvest date',
                                'Add location and delivery options'
                            ]
                        },
                        {
                            title: 'Managing Inventory',
                            description: 'Keep track of your available products',
                            solutions: [
                                'Update quantities as you sell products',
                                'Set automatic low-stock alerts',
                                'Mark items as sold out when needed',
                                'Schedule listings for future harvests',
                                'Archive old listings to keep profile clean'
                            ]
                        },
                        {
                            title: 'Pricing Strategies',
                            description: 'Set optimal prices for your agricultural products',
                            solutions: [
                                'Check daily market rates in your area',
                                'Consider transportation and packaging costs',
                                'Offer bulk discounts for large orders',
                                'Adjust prices based on seasonal demand',
                                'Monitor competitor pricing regularly'
                            ]
                        }
                    ]
                },
                {
                    title: 'Buying Products',
                    icon: ShoppingCart,
                    items: [
                        {
                            title: 'Finding Quality Produce',
                            description: 'Search and evaluate products effectively',
                            solutions: [
                                'Use filters: location, price range, organic certification',
                                'Check seller ratings and reviews',
                                'Read product descriptions carefully',
                                'View multiple photos of the produce',
                                'Contact seller for specific questions'
                            ]
                        },
                        {
                            title: 'Placing Orders',
                            description: 'Complete purchases smoothly',
                            solutions: [
                                'Verify product details and quantity',
                                'Choose preferred delivery method',
                                'Confirm delivery address and timing',
                                'Select payment method (cash/digital)',
                                'Review order summary before confirming'
                            ]
                        }
                    ]
                },
                {
                    title: 'Payment Issues',
                    icon: CreditCard,
                    items: [
                        {
                            title: 'Payment Methods',
                            description: 'Available payment options and setup',
                            solutions: [
                                'Cash on delivery (COD) for local transactions',
                                'Digital payments via PickMe Pay, eZ Cash',
                                'Bank transfers for large orders',
                                'Mobile banking integration',
                                'Escrow service for secure high-value transactions'
                            ]
                        },
                        {
                            title: 'Payment Problems',
                            description: 'Resolve payment-related issues',
                            solutions: [
                                'Payment failed: Check internet connection and retry',
                                'Card declined: Contact your bank',
                                'Double charges: Report to support immediately',
                                'Refund requests: Use dispute resolution system',
                                'Payment not received: Check transaction status'
                            ]
                        }
                    ]
                },
                {
                    title: 'Transaction Support',
                    icon: DollarSign,
                    items: [
                        {
                            title: 'Order Tracking',
                            description: 'Monitor your orders from purchase to delivery',
                            solutions: [
                                'View order status in real-time',
                                'Get notifications at each stage',
                                'Track delivery vehicles when available',
                                'Contact drivers directly if needed',
                                'Confirm receipt and rate transaction'
                            ]
                        },
                        {
                            title: 'Dispute Resolution',
                            description: 'Handle issues with transactions',
                            solutions: [
                                'Report issues within 24 hours of delivery',
                                'Upload photos as evidence if needed',
                                'Communicate with other party first',
                                'Use ModGoviya mediation service',
                                'Get refunds or replacements when justified'
                            ]
                        },
                        {
                            title: 'Reviews and Ratings',
                            description: 'Leave and manage feedback for transactions',
                            solutions: [
                                'Rate transactions honestly (1-5 stars)',
                                'Write detailed reviews about product quality',
                                'Include photos in your reviews',
                                'Report fake or inappropriate reviews',
                                'Respond professionally to negative feedback'
                            ]
                        }
                    ]
                }
            ],
            commonIssues: [
                'Product photos not uploading',
                'Payment gateway errors',
                'Delivery delays',
                'Wrong product received',
                'Seller not responding'
            ]
        },
        farming: {
            title: 'Farming Tools Support',
            subtitle: 'Get help with weather data, crop planning, and agricultural guidance tools',
            sections: [
                {
                    title: 'Weather Services',
                    icon: Cloud,
                    items: [
                        {
                            title: 'Weather Forecasts',
                            description: 'Access accurate weather predictions for farming decisions',
                            solutions: [
                                'Get 7-day detailed weather forecasts',
                                'View hourly predictions for critical farming days',
                                'Check rainfall probability and amounts',
                                'Monitor temperature variations day/night',
                                'Track wind speed and humidity levels'
                            ]
                        },
                        {
                            title: 'Weather Alerts',
                            description: 'Set up automatic notifications for weather changes',
                            solutions: [
                                'Create alerts for specific weather conditions',
                                'Set rainfall thresholds for irrigation planning',
                                'Get storm and extreme weather warnings',
                                'Receive frost alerts for sensitive crops',
                                'Configure multiple location-based alerts'
                            ]
                        },
                        {
                            title: 'Historical Weather Data',
                            description: 'Analyze past weather patterns for better planning',
                            solutions: [
                                'View weather history for past 5 years',
                                'Compare current season with previous years',
                                'Identify optimal planting and harvesting windows',
                                'Analyze rainfall patterns by month',
                                'Export weather data for record keeping'
                            ]
                        }
                    ]
                },
                {
                    title: 'Crop Planning',
                    icon: Calendar,
                    items: [
                        {
                            title: 'Crop Calendar',
                            description: 'Plan your entire farming season effectively',
                            solutions: [
                                'Create customized planting schedules',
                                'Set reminders for key farming activities',
                                'Track crop growth stages and milestones',
                                'Plan irrigation and fertilizer applications',
                                'Schedule harvest times based on market demand'
                            ]
                        },
                        {
                            title: 'Crop Recommendations',
                            description: 'Get suggestions for suitable crops in your area',
                            solutions: [
                                'Input your soil type and climate conditions',
                                'Get crop variety recommendations',
                                'View expected yields and market prices',
                                'Consider water requirements and availability',
                                'Evaluate crop rotation possibilities'
                            ]
                        },
                        {
                            title: 'Seasonal Planning',
                            description: 'Optimize farming activities across seasons',
                            solutions: [
                                'Plan for Maha and Yala seasons',
                                'Coordinate with monsoon patterns',
                                'Schedule land preparation activities',
                                'Plan crop diversification strategies',
                                'Prepare for seasonal pest and disease patterns'
                            ]
                        }
                    ]
                },
                {
                    title: 'Agricultural Guidance',
                    icon: Sprout,
                    items: [
                        {
                            title: 'Crop Care Tips',
                            description: 'Expert advice for healthy crop growth',
                            solutions: [
                                'Follow best practices for your specific crops',
                                'Learn about organic farming methods',
                                'Get guidance on fertilizer application timing',
                                'Understand pest and disease management',
                                'Implement water-efficient irrigation techniques'
                            ]
                        },
                        {
                            title: 'Problem Diagnosis',
                            description: 'Identify and solve crop health issues',
                            solutions: [
                                'Use photo diagnosis tool for plant diseases',
                                'Get expert recommendations for treatment',
                                'Access database of common agricultural problems',
                                'Connect with agricultural extension officers',
                                'Find local suppliers for recommended solutions'
                            ]
                        },
                        {
                            title: 'Yield Optimization',
                            description: 'Maximize your crop productivity',
                            solutions: [
                                'Track and analyze crop performance data',
                                'Compare yields with regional averages',
                                'Get recommendations for improvement',
                                'Learn about high-yield farming techniques',
                                'Access success stories from other farmers'
                            ]
                        }
                    ]
                },
                {
                    title: 'Data & Analytics',
                    icon: BarChart3,
                    items: [
                        {
                            title: 'Farm Analytics',
                            description: 'Use data to make better farming decisions',
                            solutions: [
                                'Track expenses and income by crop type',
                                'Monitor resource usage (water, fertilizer, seeds)',
                                'Analyze profitability across different seasons',
                                'View productivity trends over time',
                                'Generate reports for loan applications'
                            ]
                        },
                        {
                            title: 'Market Intelligence',
                            description: 'Access market trends and pricing information',
                            solutions: [
                                'View daily wholesale and retail prices',
                                'Track price trends for your crops',
                                'Get demand forecasts for planning',
                                'Find information about export opportunities',
                                'Access government subsidy information'
                            ]
                        }
                    ]
                }
            ],
            commonIssues: [
                'Weather data not loading',
                'Incorrect location for weather',
                'Crop calendar not syncing',
                'Photo diagnosis not working',
                'Market prices outdated'
            ]
        }
    };

    const selectedCategoryData = categoryContent[selectedCategory];

    const filteredSections = selectedCategoryData.sections.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.items.length > 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <Header />

            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 top-10 z-50 pt-20 pb-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/support"
                                className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                <span className="font-medium">Back to Support</span>
                            </Link>
                            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Support Categories</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search help topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Categories</h2>
                            <nav className="space-y-2">
                                {categories.map((category) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                                                selectedCategory === category.id
                                                    ? `${category.bgColor} ${category.borderColor} border-2`
                                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                                                    <IconComponent className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 dark:text-white">{category.title}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {category.description}
                                                    </p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Quick Contact */}
                            <div className="mt-8 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                                <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
                                <p className="text-sm text-green-100 mb-3">Contact our support team directly</p>
                                <div className="space-y-2">
                                    <Link
                                        to="/chatsupport"
                                        className="block w-full bg-white bg-opacity-20 text-white px-3 py-2 rounded text-sm font-medium hover:bg-opacity-30 transition-colors duration-200"
                                    >
                                        Live Chat
                                    </Link>
                                    <a
                                        href="tel:+94112345678"
                                        className="block w-full bg-white bg-opacity-20 text-white px-3 py-2 rounded text-sm font-medium hover:bg-opacity-30 transition-colors duration-200 text-center"
                                    >
                                        Call Support
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Category Header */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
                            <div className="flex items-start space-x-4">
                                <div className={`w-16 h-16 bg-gradient-to-r ${categories.find(c => c.id === selectedCategory)?.color} rounded-xl flex items-center justify-center`}>
                                    {React.createElement(categories.find(c => c.id === selectedCategory)?.icon || User, {
                                        className: "w-8 h-8 text-white"
                                    })}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {selectedCategoryData.title}
                                    </h1>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        {selectedCategoryData.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-8">
                            {filteredSections.map((section, sectionIndex) => {
                                const SectionIcon = section.icon;
                                return (
                                    <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                    <SectionIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                </div>
                                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {section.title}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-6">
                                                {section.items.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                                                        <button
                                                            onClick={() => setExpandedFaq(expandedFaq === `${sectionIndex}-${itemIndex}` ? null : `${sectionIndex}-${itemIndex}`)}
                                                            className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 rounded-lg"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                                        {item.title}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                                                    expandedFaq === `${sectionIndex}-${itemIndex}` ? 'transform rotate-90' : ''
                                                                }`} />
                                                            </div>
                                                        </button>
                                                        {expandedFaq === `${sectionIndex}-${itemIndex}` && (
                                                            <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                                                                <div className="pt-4">
                                                                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Step-by-step solution:</h4>
                                                                    <ol className="space-y-2">
                                                                        {item.solutions.map((solution, solIndex) => (
                                                                            <li key={solIndex} className="flex items-start space-x-3">
                                                                                <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-medium">
                                                                                    {solIndex + 1}
                                                                                </span>
                                                                                <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ol>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Common Issues */}
                        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-6">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                                        Common Issues in {selectedCategoryData.title}
                                    </h3>
                                    <ul className="space-y-1">
                                        {selectedCategoryData.commonIssues.map((issue, index) => (
                                            <li key={index} className="text-yellow-700 dark:text-yellow-300 text-sm">
                                                • {issue}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-3">
                                        If you're experiencing any of these issues and can't find the solution above, please contact our support team.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Options */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link
                                to="/chatsupport"
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Live Chat</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    Get instant help from our support agents. Available 24/7 for urgent issues.
                                </p>
                                <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                                    <span>Start Chat</span>
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </Link>

                            <a
                                href="tel:+94112345678"
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Phone Support</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    Speak directly with agricultural experts for complex technical issues.
                                </p>
                                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                                    <span>+94 11 234 5678</span>
                                </div>
                            </a>

                            <a
                                href="mailto:support@modgoviya.lk"
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    Send detailed questions and get comprehensive answers within 24 hours.
                                </p>
                                <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                                    <span>support@modgoviya.lk</span>
                                </div>
                            </a>
                        </div>

                        {/* Additional Resources */}
                        <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
                            <p className="text-green-100 mb-6">
                                Explore more ways to get help and improve your farming experience with ModGoviya.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                    <BookOpen className="w-6 h-6 mb-2" />
                                    <h3 className="font-semibold mb-1">User Guide</h3>
                                    <p className="text-sm text-green-100">Comprehensive documentation</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                    <Video className="w-6 h-6 mb-2" />
                                    <h3 className="font-semibold mb-1">Video Tutorials</h3>
                                    <p className="text-sm text-green-100">Step-by-step visual guides</p>
                                </div>
                                <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                    <Users className="w-6 h-6 mb-2" />
                                    <h3 className="font-semibold mb-1">Community Forum</h3>
                                    <p className="text-sm text-green-100">Connect with other farmers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SupportCategoriesPage;
