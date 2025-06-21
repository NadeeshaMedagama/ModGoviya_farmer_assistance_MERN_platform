import React, { useState, useEffect } from 'react';
import {
    MapPin,
    RefreshCw,
    Thermometer,
    Droplets,
    Wind,
    Eye,
    Sunrise,
    Sunset,
    CloudRain,
    AlertTriangle,
    Sprout,
    Shield,
    Calendar,
    Clock,
    Navigation,
    Sun,
    Cloud,
    CloudSnow
} from 'lucide-react';
import Footer from "../components/layout/Footer";

const WeatherPage = () => {
    const [location, setLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);

    // Mock weather data for demonstration
    const mockCurrentWeather = {
        location: 'Colombo, Sri Lanka',
        temperature: 28,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy',
        humidity: 75,
        windSpeed: 12,
        windDirection: 'NE',
        pressure: 1013,
        sunrise: '06:15',
        sunset: '18:30',
        feelsLike: 32
    };

    const mockHourlyForecast = [
        { time: '14:00', temp: 28, condition: 'Sunny', precipitation: 10, icon: 'sunny' },
        { time: '15:00', temp: 29, condition: 'Partly Cloudy', precipitation: 15, icon: 'partly-cloudy' },
        { time: '16:00', temp: 27, condition: 'Cloudy', precipitation: 25, icon: 'cloudy' },
        { time: '17:00', temp: 26, condition: 'Light Rain', precipitation: 60, icon: 'rain' },
        { time: '18:00', temp: 25, condition: 'Rain', precipitation: 80, icon: 'rain' },
        { time: '19:00', temp: 24, condition: 'Light Rain', precipitation: 45, icon: 'rain' }
    ];

    const mockDailyForecast = [
        { day: 'Today', high: 29, low: 24, condition: 'Partly Cloudy', precipitation: 30, icon: 'partly-cloudy' },
        { day: 'Tomorrow', high: 31, low: 25, condition: 'Sunny', precipitation: 10, icon: 'sunny' },
        { day: 'Saturday', high: 28, low: 23, condition: 'Rainy', precipitation: 85, icon: 'rain' },
        { day: 'Sunday', high: 27, low: 22, condition: 'Thunderstorms', precipitation: 90, icon: 'thunderstorm' },
        { day: 'Monday', high: 30, low: 24, condition: 'Partly Cloudy', precipitation: 20, icon: 'partly-cloudy' },
        { day: 'Tuesday', high: 32, low: 26, condition: 'Sunny', precipitation: 5, icon: 'sunny' },
        { day: 'Wednesday', high: 29, low: 23, condition: 'Cloudy', precipitation: 40, icon: 'cloudy' }
    ];

    const mockAlerts = [
        {
            type: 'warning',
            title: 'Heavy Rain Alert',
            message: 'Heavy rainfall expected in the next 24 hours. Consider postponing outdoor farming activities.',
            priority: 'high'
        },
        {
            type: 'advice',
            title: 'Irrigation Recommendation',
            message: 'With upcoming rain, reduce irrigation for the next 2 days to prevent waterlogging.',
            priority: 'medium'
        }
    ];

    const farmingAdvice = [
        {
            icon: <Droplets className="w-5 h-5" />,
            title: 'Irrigation',
            advice: 'Reduce watering due to expected rainfall',
            timing: 'Next 2 days'
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: 'Crop Protection',
            advice: 'Cover sensitive crops before evening rain',
            timing: 'Before 17:00'
        },
        {
            icon: <Sprout className="w-5 h-5" />,
            title: 'Planting',
            advice: 'Good conditions for rice planting after rain',
            timing: 'Sunday onwards'
        }
    ];

    useEffect(() => {
        // Simulate loading weather data
        setCurrentWeather(mockCurrentWeather);
        setForecast({ hourly: mockHourlyForecast, daily: mockDailyForecast });
        setAlerts(mockAlerts);
    }, []);

    const handleLocationSearch = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleLocationDetect = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
                    setLoading(false);
                },
                () => {
                    setLoading(false);
                    alert('Location detection failed. Please enter manually.');
                }
            );
        }
    };

    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
            case 'partly-cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
            case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
            case 'rain': return <CloudRain className="w-8 h-8 text-blue-500" />;
            case 'thunderstorm': return <CloudRain className="w-8 h-8 text-purple-500" />;
            default: return <Sun className="w-8 h-8 text-yellow-500" />;
        }
    };

    const translations = {
        en: {
            title: 'Weather Dashboard',
            location: 'Location',
            current: 'Current Weather',
            hourly: 'Hourly Forecast',
            daily: 'Daily Forecast',
            alerts: 'Agricultural Alerts',
            advice: 'Farming Recommendations'
        },
        si: {
            title: 'කාලගුණ පුවරුව',
            location: 'ස්ථානය',
            current: 'වර්තමාන කාලගුණය',
            hourly: 'පැය අනුව පුරෝකථනය',
            daily: 'දෛනික පුරෝකථනය',
            alerts: 'කෘෂිකාර්මික අනතුරු ඇඟවීම්',
            advice: 'ගොවිතැන් නිර්දේශ'
        },
        ta: {
            title: 'வானிலை கட்டுப்பாடு',
            location: 'இடம்',
            current: 'தற்போதைய வானிலை',
            hourly: 'மணிநேர முன்னறிவிப்பு',
            daily: 'தினசரி முன்னறிவிப்பு',
            alerts: 'விவசாய எச்சரிக்கைகள்',
            advice: 'விவசாய பரிந்துரைகள்'
        }
    };

    const t = translations[language];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
            {/* Header */}
            <div className="bg-white shadow-lg border-b-4 border-green-500">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <Sprout className="w-6 h-6 text-white" />
                            </div>
                            ModGoviya - {t.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="en">English</option>
                                <option value="si">සිංහල</option>
                                <option value="ta">தமிழ்</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Location Input */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-500" />
                        {t.location}
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-64">
                            <input
                                type="text"
                                placeholder="Enter city, village, or coordinates..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                            />
                        </div>
                        <button
                            onClick={handleLocationSearch}
                            disabled={loading}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 flex items-center gap-2 font-medium"
                        >
                            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
                            Search
                        </button>
                        <button
                            onClick={handleLocationDetect}
                            disabled={loading}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center gap-2 font-medium"
                        >
                            <Navigation className="w-5 h-5" />
                            Detect
                        </button>
                    </div>
                </div>

                {/* Alerts */}
                {alerts.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            {t.alerts}
                        </h2>
                        <div className="space-y-4">
                            {alerts.map((alert, index) => (
                                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                                    alert.priority === 'high' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                                }`}>
                                    <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                                    <p className="text-gray-600 mt-1">{alert.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Current Weather */}
                {currentWeather && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Thermometer className="w-5 h-5 text-blue-500" />
                                {t.current}
                            </h2>
                            <button
                                onClick={handleLocationSearch}
                                className="p-2 text-gray-500 hover:text-gray-700 transition duration-200"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Main Weather Info */}
                            <div className="text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                                    {getWeatherIcon(currentWeather.icon)}
                                    <div>
                                        <div className="text-5xl font-bold text-gray-800">{currentWeather.temperature}°C</div>
                                        <div className="text-gray-600">Feels like {currentWeather.feelsLike}°C</div>
                                    </div>
                                </div>
                                <div className="text-xl text-gray-700 mb-2">{currentWeather.condition}</div>
                                <div className="text-gray-600 flex items-center gap-2 justify-center lg:justify-start">
                                    <MapPin className="w-4 h-4" />
                                    {currentWeather.location}
                                </div>
                            </div>

                            {/* Weather Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <Droplets className="w-5 h-5" />
                                        <span className="font-medium">Humidity</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">{currentWeather.humidity}%</div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-green-600 mb-2">
                                        <Wind className="w-5 h-5" />
                                        <span className="font-medium">Wind</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">{currentWeather.windSpeed} km/h</div>
                                    <div className="text-sm text-gray-600">{currentWeather.windDirection}</div>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                                        <Eye className="w-5 h-5" />
                                        <span className="font-medium">Pressure</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">{currentWeather.pressure} hPa</div>
                                </div>

                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-orange-600 mb-2">
                                        <Sunrise className="w-5 h-5" />
                                        <span className="font-medium">Sun</span>
                                    </div>
                                    <div className="text-sm text-gray-800">
                                        <div className="flex items-center gap-1">
                                            <Sunrise className="w-3 h-3" />
                                            {currentWeather.sunrise}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Sunset className="w-3 h-3" />
                                            {currentWeather.sunset}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hourly Forecast */}
                {forecast && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            {t.hourly}
                        </h2>
                        <div className="overflow-x-auto">
                            <div className="flex gap-4 min-w-max">
                                {forecast.hourly.map((hour, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg text-center min-w-24">
                                        <div className="text-sm text-gray-600 mb-2">{hour.time}</div>
                                        <div className="flex justify-center mb-2">
                                            {getWeatherIcon(hour.icon)}
                                        </div>
                                        <div className="font-bold text-gray-800 mb-1">{hour.temp}°C</div>
                                        <div className="text-xs text-blue-600">{hour.precipitation}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Daily Forecast */}
                {forecast && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-green-500" />
                            {t.daily}
                        </h2>
                        <div className="space-y-3">
                            {forecast.daily.map((day, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-20 text-gray-800 font-medium">{day.day}</div>
                                        <div className="flex items-center gap-2">
                                            {getWeatherIcon(day.icon)}
                                            <span className="text-gray-700">{day.condition}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-blue-600 text-sm">{day.precipitation}%</div>
                                        <div className="flex gap-2">
                                            <span className="font-bold text-gray-800">{day.high}°</span>
                                            <span className="text-gray-500">{day.low}°</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Farming Recommendations */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Sprout className="w-5 h-5 text-green-500" />
                        {t.advice}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {farmingAdvice.map((advice, index) => (
                            <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2 text-green-600 mb-2">
                                    {advice.icon}
                                    <span className="font-medium">{advice.title}</span>
                                </div>
                                <p className="text-gray-700 mb-2">{advice.advice}</p>
                                <p className="text-sm text-green-600 font-medium">{advice.timing}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Source */}
                <div className="text-center text-gray-500 text-sm">
                    Weather data provided by OpenWeatherMap API
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WeatherPage;
