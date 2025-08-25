import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Sprout,
    Cloud,
    ShoppingCart,
    Calendar,
    Bug,
    Users,
    BookOpen,
    Bell,
    Globe,
    BarChart3,
    ArrowRight,
    Check,
    Star,
    Shield,
    Clock,
    User,
    Mail,
    Phone,
    MapPin,
    Eye,
    EyeOff,
    Wheat,
    Tractor,
    Droplets,
    Sun
} from 'lucide-react';
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const StartFreeTrialPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        farmLocation: '',
        farmSize: '',
        primaryCrops: '',
        experience: '',
        agreeToTerms: false,
        newsletter: true
    });
    const [currentStep, setCurrentStep] = useState(1);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const benefits = [
        {
            icon: Sprout,
            title: "Smart Crop Management",
            description: "AI-powered insights for optimal crop health and yield"
        },
        {
            icon: Cloud,
            title: "Real-time Weather Data",
            description: "Hyperlocal weather forecasts and alerts"
        },
        {
            icon: BarChart3,
            title: "Analytics & Reports",
            description: "Detailed performance metrics and trends"
        },
        {
            icon: Users,
            title: "Expert Community",
            description: "Connect with agricultural experts and farmers"
        },
        {
            icon: Bell,
            title: "Smart Notifications",
            description: "Never miss important farming activities"
        },
        {
            icon: Shield,
            title: "Secure & Reliable",
            description: "Enterprise-grade security for your data"
        }
    ];

    const testimonials = [
        {
            name: "Priyantha Silva",
            role: "Rice Farmer, Anuradhapura",
            content: "ModGoviya increased my rice yield by 35% in just one season. The weather alerts alone saved my crops twice!",
            rating: 5
        },
        {
            name: "Kamala Perera",
            role: "Vegetable Farmer, Nuwara Eliya",
            content: "The community feature connected me with experts who helped solve my pest problems. Highly recommended!",
            rating: 5
        },
        {
            name: "Ranjan Fernando",
            role: "Tea Plantation Owner, Kandy",
            content: "The analytics dashboard gives me insights I never had before. My farm operations are now 50% more efficient.",
            rating: 5
        }
    ];

    const plans = [
        {
            name: "Starter",
            price: "Free",
            duration: "30 days",
            features: [
                "Up to 5 acres coverage",
                "Basic weather updates",
                "Crop calendar",
                "Community access",
                "Mobile app"
            ],
            recommended: false
        },
        {
            name: "Professional",
            price: "Rs: 1,500",
            duration: "per month",
            features: [
                "Up to 25 acres coverage",
                "Advanced weather & pest alerts",
                "AI-powered recommendations",
                "Market price tracking",
                "Priority support",
                "Analytics dashboard"
            ],
            recommended: true
        },
        {
            name: "Enterprise",
            price: "Rs: 3,500",
            duration: "per month",
            features: [
                "Unlimited acres coverage",
                "Custom integrations",
                "Dedicated support",
                "Advanced analytics",
                "Multi-farm management",
                "API access"
            ],
            recommended: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="relative py-16 lg:py-24">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Clock className="w-4 h-4 mr-2" />
                            Limited Time: 30-Day Free Trial + Premium Features
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Transform Your Farm with
                            <span className="block text-green-600">ModGoviya Today</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Join 50,000+ successful farmers who've increased their yield by 35% and reduced costs by 25% with our AI-powered farming assistant.
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-500 mr-2" />
                                No credit card required
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-500 mr-2" />
                                30-day money-back guarantee
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-500 mr-2" />
                                Cancel anytime
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Registration Form */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-green-100">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Start Your Free Trial</h2>
                                <p className="text-gray-600">Get instant access to all premium features</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                placeholder="Enter first name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            placeholder="Enter last name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            placeholder="farmer@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            placeholder="+94 XX XXX XXXX"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Farm Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Farm Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <select
                                                name="farmLocation"
                                                value={formData.farmLocation}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                                required
                                            >
                                                <option value="">Select district</option>
                                                <option value="colombo">Colombo</option>
                                                <option value="kandy">Kandy</option>
                                                <option value="galle">Galle</option>
                                                <option value="anuradhapura">Anuradhapura</option>
                                                <option value="kurunegala">Kurunegala</option>
                                                <option value="ratnapura">Ratnapura</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size</label>
                                        <select
                                            name="farmSize"
                                            value={formData.farmSize}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            required
                                        >
                                            <option value="">Select size</option>
                                            <option value="small">Less than 5 acres</option>
                                            <option value="medium">5-25 acres</option>
                                            <option value="large">25-100 acres</option>
                                            <option value="enterprise">100+ acres</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Crops</label>
                                    <div className="relative">
                                        <Wheat className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="primaryCrops"
                                            value={formData.primaryCrops}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            placeholder="Rice, vegetables, tea, etc."
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            placeholder="Create a strong password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Terms and Newsletter */}
                                <div className="space-y-3">
                                    <label className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleInputChange}
                                            className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            required
                                        />
                                        <span className="text-sm text-gray-600">
                                            I agree to the <Link to="/terms" className="text-green-600 hover:text-green-700">Terms of Service</Link> and <Link to="/privacy" className="text-green-600 hover:text-green-700">Privacy Policy</Link>
                                        </span>
                                    </label>
                                    <label className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            name="newsletter"
                                            checked={formData.newsletter}
                                            onChange={handleInputChange}
                                            className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-600">
                                            Send me farming tips and product updates (optional)
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                                >
                                    Start My Free 30-Day Trial
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>

                                <p className="text-center text-sm text-gray-600">
                                    Already have an account? <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">Sign in</Link>
                                </p>
                            </form>
                        </div>

                        {/* Benefits & Features */}
                        <div className="space-y-8">
                            {/* What You'll Get */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get Instantly</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {benefits.map((benefit, index) => {
                                        const IconComponent = benefit.icon;
                                        return (
                                            <div key={index} className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <IconComponent className="w-5 h-5 text-green-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                                                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-6">What Farmers Are Saying</h3>
                                <div className="space-y-6">
                                    {testimonials.slice(0, 2).map((testimonial, index) => (
                                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                            <div className="flex items-center mb-3">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                            <p className="text-green-50 mb-3">"{testimonial.content}"</p>
                                            <div>
                                                <p className="font-semibold">{testimonial.name}</p>
                                                <p className="text-green-200 text-sm">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="bg-gray-50 rounded-2xl p-6 text-center">
                                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h4 className="font-bold text-gray-900 mb-2">Your Data is Safe</h4>
                                <p className="text-gray-600 text-sm">
                                    Enterprise-grade security with 256-bit SSL encryption.
                                    Your farm data is protected and never shared.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                        <p className="text-xl text-gray-600">Start free, upgrade when you're ready</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative rounded-3xl p-8 ${
                                    plan.recommended
                                        ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-2xl scale-105'
                                        : 'bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {plan.recommended && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </div>
                                    </div>
                                )}
                                <div className="text-center mb-8">
                                    <h3 className={`text-2xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className={`mb-4 ${plan.recommended ? 'text-green-100' : 'text-gray-600'}`}>
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        {plan.price !== "Free" && <span className="text-sm">/{plan.duration}</span>}
                                    </div>
                                    {plan.price === "Free" && (
                                        <div className={`text-sm ${plan.recommended ? 'text-green-100' : 'text-gray-600'}`}>
                                            {plan.duration} trial
                                        </div>
                                    )}
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.recommended ? 'text-green-300' : 'text-green-600'}`} />
                                            <span className={`text-sm ${plan.recommended ? 'text-green-50' : 'text-gray-600'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                                    plan.recommended
                                        ? 'bg-white text-green-600 hover:bg-green-50'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                }`}>
                                    {plan.name === "Starter" ? "Start Free Trial" : "Choose Plan"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default StartFreeTrialPage;
