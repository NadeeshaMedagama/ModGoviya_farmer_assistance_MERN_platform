import React, { useState, useRef, useEffect } from 'react';
import {
    MessageCircle,
    Send,
    Mic,
    MicOff,
    Paperclip,
    MoreVertical,
    ArrowLeft,
    Bot,
    User,
    Phone,
    Video,
    Star,
    Zap,
    Clock,
    CheckCircle,
    AlertCircle,
    Leaf,
    Minimize2,
    Maximize2,
    X,
    Search,
    ThumbsUp,
    ThumbsDown,
    Copy,
    Download
} from 'lucide-react';
import Header from "../layout/Header";

const ChatSupport = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm ModGoviya AI Assistant. I'm here to help you with all your farming and agricultural questions. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date(),
            typing: false
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Knowledge base for agricultural responses
    const getAIResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        // Weather-related questions
        if (message.includes('weather') || message.includes('rain') || message.includes('monsoon') || message.includes('temperature')) {
            return "I can help you with weather information! ModGoviya provides real-time weather data and forecasts with 85-90% accuracy for 7-day predictions. You can set up location-specific alerts for rain, temperature changes, and severe weather warnings. Would you like me to guide you on how to access weather analytics for your farm location?";
        }

        // Crop-related questions
        if (message.includes('crop') || message.includes('rice') || message.includes('vegetable') || message.includes('planting') || message.includes('harvest')) {
            return "Great question about crops! ModGoviya offers comprehensive crop management tools including planting schedules, growth tracking, and harvest optimization. For rice cultivation, we recommend our Complete Rice Cultivation Guide which covers the full 120-day cycle. What specific crop are you planning to grow, and what stage are you currently at?";
        }

        // Soil and fertilizer questions
        if (message.includes('soil') || message.includes('fertilizer') || message.includes('nutrient') || message.includes('ph')) {
            return "Soil health is crucial for successful farming! Our platform provides soil monitoring tools and nutrient analysis. We recommend testing soil pH regularly (ideal range for most crops is 6.0-7.0) and using our fertilizer calculator for optimal nutrient management. Would you like guidance on setting up soil monitoring sensors or interpreting soil test results?";
        }

        // Pest and disease questions
        if (message.includes('pest') || message.includes('disease') || message.includes('insect') || message.includes('fungus') || message.includes('treatment')) {
            return "Pest and disease management is essential for healthy crops. Our system can help identify common agricultural pests and diseases through image recognition. We also provide integrated pest management (IPM) strategies that combine biological, cultural, and chemical controls. Would you like me to guide you through our pest identification tool or recommend specific treatment protocols?";
        }

        // Pricing and subscription questions
        if (message.includes('price') || message.includes('cost') || message.includes('subscription') || message.includes('plan') || message.includes('free')) {
            return "ModGoviya offers flexible pricing plans! Our basic features are completely free, including weather alerts and basic crop tracking. Premium plans start at Rs. 2,500/month and include advanced analytics, AI-powered insights, and priority support. We also offer a 30-day free trial for all premium features. Would you like me to explain the differences between our plans?";
        }

        // Technical support questions
        if (message.includes('login') || message.includes('password') || message.includes('account') || message.includes('register') || message.includes('sign up')) {
            return "I can help with account issues! To create an account, click 'Register' and provide your basic information, then verify your phone number. If you're having login troubles, try resetting your password using the 'Forgot Password' link. For persistent issues, our technical support team is available at support@modgoviya.lk. What specific issue are you experiencing?";
        }

        // Market and trading questions
        if (message.includes('market') || message.includes('price') || message.includes('sell') || message.includes('buy') || message.includes('trading')) {
            return "Our marketplace connects farmers directly with buyers! You can check real-time market prices, list your products, and find potential buyers in your area. We provide market trend analysis and price predictions to help you make informed selling decisions. The platform charges a small commission only when you successfully complete a sale. Would you like help setting up your seller profile?";
        }

        // Equipment and technology questions
        if (message.includes('equipment') || message.includes('tractor') || message.includes('irrigation') || message.includes('sensor') || message.includes('technology')) {
            return "Modern farming equipment can significantly boost productivity! ModGoviya provides guidance on smart irrigation systems, soil sensors, and automated farming equipment. We also have partnerships with equipment suppliers for special pricing. Our IoT sensors can monitor soil moisture, temperature, and crop health in real-time. What type of equipment or technology are you interested in?";
        }

        // General farming advice
        if (message.includes('advice') || message.includes('tip') || message.includes('help') || message.includes('guide') || message.includes('how')) {
            return "I'm here to provide personalized farming advice! Based on your location, crop type, and farming goals, I can offer specific recommendations. Some general tips: monitor weather patterns regularly, maintain soil health through proper fertilization, implement integrated pest management, and keep detailed records of your farming activities. What specific area would you like advice on?";
        }

        // Greetings and general queries
        if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
            return "Hello! Welcome to ModGoviya support. I'm excited to help you with your farming journey. Whether you need help with weather forecasting, crop management, pest control, or using our platform features, I'm here to assist. What would you like to know about today?";
        }

        // Default response for unmatched queries
        return "Thank you for your question! While I strive to help with all agricultural queries, I might need more specific information to provide the best answer. Could you please provide more details about your farming situation or the specific challenge you're facing? Alternatively, you can:\n\n• Browse our comprehensive farming guides\n• Check our FAQ section\n• Contact our human experts at +94 11 234 5678\n• Email us at support@modgoviya.lk\n\nWhat specific area of farming would you like assistance with?";
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newUserMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputMessage('');
        setIsTyping(true);
        setShowQuickActions(false);

        // Simulate typing delay
        setTimeout(() => {
            const aiResponse = getAIResponse(inputMessage);
            const newBotMessage = {
                id: messages.length + 2,
                text: aiResponse,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newBotMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickActions = [
        { text: "Weather forecast for my farm", icon: "🌤️" },
        { text: "Rice cultivation guide", icon: "🌾" },
        { text: "Pest identification help", icon: "🐛" },
        { text: "Soil testing guidance", icon: "🌱" },
        { text: "Market prices today", icon: "💰" },
        { text: "Irrigation setup help", icon: "💧" }
    ];

    const handleQuickAction = (actionText) => {
        setInputMessage(actionText);
        setShowQuickActions(false);
        inputRef.current?.focus();
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const copyMessage = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
            {/* Header */}
            <Header />

            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => window.history.back()}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <ArrowLeft size={24} />
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">ModGoviya AI Assistant</h1>
                                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                        Online • Available 24/7
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Phone size={18} />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Video size={18} />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
                {/* Chat Container */}
                <div className={`flex-1 transition-all duration-300 ${isMinimized ? 'h-16' : ''}`}>
                    {!isMinimized && (
                        <>
                            {/* Quick Actions */}
                            {showQuickActions && (
                                <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Quick Actions</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {quickActions.map((action, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickAction(action.text)}
                                                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
                                            >
                                                <span className="text-2xl">{action.icon}</span>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{action.text}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex items-start space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                            {/* Avatar */}
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                                                message.sender === 'user'
                                                    ? 'bg-blue-600'
                                                    : 'bg-gradient-to-br from-green-500 to-emerald-600'
                                            }`}>
                                                {message.sender === 'user' ? (
                                                    <User className="w-5 h-5 text-white" />
                                                ) : (
                                                    <Bot className="w-5 h-5 text-white" />
                                                )}
                                            </div>

                                            {/* Message Content */}
                                            <div className={`group relative ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                                <div className={`px-6 py-4 rounded-2xl shadow-sm ${
                                                    message.sender === 'user'
                                                        ? 'bg-blue-600 text-white rounded-tr-md'
                                                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 rounded-tl-md'
                                                }`}>
                                                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                                                </div>

                                                {/* Message Actions */}
                                                <div className={`flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                                                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                                                }`}>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatTime(message.timestamp)}
                                                    </span>
                                                    {message.sender === 'bot' && (
                                                        <div className="flex items-center space-x-1">
                                                            <button
                                                                onClick={() => copyMessage(message.text)}
                                                                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                                                            >
                                                                <Copy size={14} />
                                                            </button>
                                                            <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                                                                <ThumbsUp size={14} />
                                                            </button>
                                                            <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                                                                <ThumbsDown size={14} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-2xl rounded-tl-md border border-gray-100 dark:border-gray-700">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </>
                    )}
                </div>

                {/* Message Input */}
                {!isMinimized && (
                    <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-end space-x-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <textarea
                                        ref={inputRef}
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything about farming, crops, weather, or ModGoviya features..."
                                        className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        rows={1}
                                        style={{ minHeight: '48px', maxHeight: '120px' }}
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                                        }}
                                    />
                                    <button className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <Paperclip size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={toggleRecording}
                                    className={`p-3 rounded-xl transition-colors ${
                                        isRecording
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                                </button>

                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim()}
                                    className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-4">
                                <span>Press Enter to send, Shift + Enter for new line</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Zap className="w-3 h-3 text-green-500" />
                                <span>Powered by ModGoviya AI</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Minimized State */}
                {isMinimized && (
                    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">ModGoviya AI Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsMinimized(false)}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Maximize2 size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Floating Action Button (when minimized) */}
            {!isMinimized && (
                <button
                    onClick={() => setIsMinimized(true)}
                    className="fixed bottom-6 right-6 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
                >
                    <Minimize2 size={20} />
                </button>
            )}

            {/* Support Info Footer */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-6">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">Need Human Support?</h3>
                        <p className="text-green-100 mb-4">Our agricultural experts are available for complex queries</p>
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
                            <div className="flex items-center">
                                <Phone size={16} className="mr-2" />
                                +94 11 234 5678
                            </div>
                            <div className="flex items-center">
                                <Clock size={16} className="mr-2" />
                                Mon-Fri: 8:00 AM - 6:00 PM
                            </div>
                            <div className="flex items-center">
                                <Star size={16} className="mr-2" />
                                4.9/5 Customer Rating
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSupport;
