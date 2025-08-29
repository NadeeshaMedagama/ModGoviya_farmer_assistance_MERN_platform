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
    Cloud
} from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext'; // Adjust path as needed

const WeatherPage = () => {
    const [location, setLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const { t } = useTranslation();

    // Get theme context
    const { isDarkMode } = useTheme();

    // API configuration
    const API_KEY = '316ac904c3c082b761a5b8d0795f894d'; // Replace with your actual API key
    const BASE_URL = 'https://api.openweathermap.org/data/2.5';
    const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';

    // Mock data for farming advice (unchanged)
    const farmingAdvice = [
        {
            icon: <Droplets className="w-5 h-5" />,
            title: t('weather.advice.irrigationTitle', { defaultValue: 'Irrigation' }),
            advice: t('weather.advice.irrigationText', { defaultValue: 'Reduce watering due to expected rainfall' }),
            timing: t('weather.advice.irrigationTiming', { defaultValue: 'Next 2 days' })
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: t('weather.advice.protectionTitle', { defaultValue: 'Crop Protection' }),
            advice: t('weather.advice.protectionText', { defaultValue: 'Cover sensitive crops before evening rain' }),
            timing: t('weather.advice.protectionTiming', { defaultValue: 'Before 17:00' })
        },
        {
            icon: <Sprout className="w-5 h-5" />,
            title: t('weather.advice.plantingTitle', { defaultValue: 'Planting' }),
            advice: t('weather.advice.plantingText', { defaultValue: 'Good conditions for rice planting after rain' }),
            timing: t('weather.advice.plantingTiming', { defaultValue: 'Sunday onwards' })
        }
    ];

    // Fetch weather data from OpenWeatherMap API
    const fetchWeatherData = async (lat, lon) => {
        setLoading(true);
        try {
            // Fetch current weather
            const currentResponse = await fetch(
                `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const currentData = await currentResponse.json();

            // Fetch forecast
            const forecastResponse = await fetch(
                `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const forecastData = await forecastResponse.json();

            // Validate API responses
            if (!currentData || !forecastData || !currentData.weather || !forecastData.list) {
                throw new Error('Invalid weather data received');
            }

            const processedCurrentWeather = {
                location: `${currentData.name || 'Unknown'}, ${currentData.sys?.country || ''}`,
                temperature: Math.round(currentData.main?.temp || 0),
                condition: currentData.weather[0]?.main || 'Unknown',
                icon: getIconName(currentData.weather[0]?.id, currentData.weather[0]?.icon),
                humidity: currentData.main?.humidity || 0,
                windSpeed: Math.round((currentData.wind?.speed || 0) * 3.6),
                windDirection: getWindDirection(currentData.wind?.deg),
                pressure: currentData.main?.pressure || 0,
                sunrise: currentData.sys?.sunrise
                    ? new Date(currentData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : '--:--',
                sunset: currentData.sys?.sunset
                    ? new Date(currentData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : '--:--',
                feelsLike: Math.round(currentData.main?.feels_like || 0),
                // Include raw data for alerts generation
                weather: currentData.weather,
                main: currentData.main,
                wind: currentData.wind,
                sys: currentData.sys
            };

            const processForecastData = (forecastData) => {
                // Process hourly forecast (next 6 hours)
                const hourlyForecast = forecastData.list.slice(0, 6).map(item => ({
                    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    temp: Math.round(item.main?.temp || 0),
                    condition: item.weather?.[0]?.main || 'Unknown',
                    precipitation: item.pop ? Math.round(item.pop * 100) : 0,
                    icon: getIconName(item.weather?.[0]?.id, item.weather?.[0]?.icon)
                }));

                // Process daily forecast (next 7 days)
                const dailyForecast = [];
                const today = new Date();

                for (let i = 0; i < 7; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);

                    const dayForecast = forecastData.list.filter(item => {
                        const itemDate = new Date(item.dt * 1000);
                        return itemDate.getDate() === date.getDate();
                    });

                    if (dayForecast.length > 0) {
                        const temps = dayForecast.map(item => item.main?.temp || 0);
                        const high = Math.round(Math.max(...temps));
                        const low = Math.round(Math.min(...temps));
                        const precipitation = Math.round(Math.max(...dayForecast.map(item => item.pop ? item.pop * 100 : 0)));

                        dailyForecast.push({
                            day: i === 0 ? 'Today' : date.toLocaleDateString([], { weekday: 'long' }),
                            high,
                            low,
                            condition: dayForecast[0].weather?.[0]?.main || 'Unknown',
                            precipitation,
                            icon: getIconName(dayForecast[0].weather?.[0]?.id, dayForecast[0].weather?.[0]?.icon)
                        });
                    }
                }

                return { hourly: hourlyForecast, daily: dailyForecast };
            };

            const processedForecast = processForecastData(forecastData);

            setCurrentWeather(processedCurrentWeather);
            setForecast(processedForecast);
            setAlerts(generateAlerts(currentData, forecastData));
        } catch (error) {
            console.error('Error fetching weather data:', error);
            loadMockData();
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get wind direction
    const getWindDirection = (degrees) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round((degrees % 360) / 45);
        return directions[index % 8];
    };

    // Helper function to get icon name from weather code
    const getIconName = (weatherId, iconCode) => {
        if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
        if (weatherId >= 300 && weatherId < 600) return 'rain';
        if (weatherId >= 600 && weatherId < 700) return 'snow';
        if (weatherId >= 700 && weatherId < 800) return 'fog';
        if (weatherId === 800) return iconCode.includes('n') ? 'clear-night' : 'sunny';
        if (weatherId > 800) {
            if (weatherId === 801 || weatherId === 802) return 'partly-cloudy';
            return 'cloudy';
        }
        return 'sunny';
    };

    // Generate farming alerts based on weather conditions
    const generateAlerts = (currentData, forecastData) => {
        const alerts = [];

        // Check if we have valid weather data
        if (!currentData?.weather || !currentData?.main || !forecastData?.list) {
            return [{
                type: 'info',
                title: t('weather.alerts.dataUnavailableTitle'),
                message: t('weather.alerts.dataUnavailableMessage'),
                priority: 'low'
            }];
        }

        const currentCondition = currentData.weather[0]?.main?.toLowerCase() || '';
        const rainForecast = forecastData.list.some(item =>
            item.weather?.[0]?.main?.toLowerCase().includes('rain') &&
            new Date(item.dt * 1000).getTime() - Date.now() < 24 * 60 * 60 * 1000
        );

        if (currentCondition.includes('rain') || rainForecast) {
            alerts.push({
                type: 'warning',
                title: t('weather.alerts.rainAlertTitle'),
                message: t('weather.alerts.rainAlertMessage'),
                priority: 'high'
            });
        }

        if (currentData.main?.temp > 30) {
            alerts.push({
                type: 'warning',
                title: t('weather.alerts.heatAlertTitle'),
                message: t('weather.alerts.heatAlertMessage'),
                priority: 'medium'
            });
        }

        if (forecastData.list.some(item => item.main?.temp_min < 10)) {
            alerts.push({
                type: 'warning',
                title: t('weather.alerts.coldAlertTitle'),
                message: t('weather.alerts.coldAlertMessage'),
                priority: 'medium'
            });
        }

        if (alerts.length === 0) {
            alerts.push({
                type: 'advice',
                title: t('weather.alerts.generalAdviceTitle'),
                message: t('weather.alerts.generalAdviceMessage'),
                priority: 'low'
            });
        }

        return alerts;
    };

    // Fallback to mock data
    const loadMockData = () => {
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
            feelsLike: 32,
            weather: [{ main: 'Partly Cloudy' }],
            main: { temp: 28, feels_like: 32, humidity: 75, pressure: 1013 },
            wind: { speed: 12, deg: 45 },
            sys: { sunrise: 1234567890, sunset: 1234567890, country: 'LK' }
        };

        const mockHourlyForecast = [
            {
                dt: Date.now() / 1000 + 3600,
                main: { temp: 28, temp_min: 27, temp_max: 29 },
                weather: [{ main: 'Sunny', id: 800 }],
                pop: 0.1
            },
            { time: '14:00', temp: 28, condition: 'Sunny', precipitation: 10, icon: 'sunny' },
            { time: '15:00', temp: 29, condition: 'Partly Cloudy', precipitation: 15, icon: 'partly-cloudy' },
            { time: '16:00', temp: 27, condition: 'Cloudy', precipitation: 25, icon: 'cloudy' },
            { time: '17:00', temp: 26, condition: 'Light Rain', precipitation: 60, icon: 'rain' },
            { time: '18:00', temp: 25, condition: 'Rain', precipitation: 80, icon: 'rain' },
            { time: '19:00', temp: 24, condition: 'Light Rain', precipitation: 45, icon: 'rain' }
        ];

        const mockForecastData = {
            list: mockHourlyForecast
        };

        generateAlerts(
            { weather: [{ main: 'Partly Cloudy' }], main: { temp: 28 } },
            { list: mockHourlyForecast }
        );

        setCurrentWeather(mockCurrentWeather);
        setForecast({
            hourly: mockHourlyForecast.map(hour => ({
                time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                temp: Math.round(hour.main.temp),
                condition: hour.weather[0].main,
                precipitation: hour.pop ? Math.round(hour.pop * 100) : 0,
                icon: getIconName(hour.weather[0].id)
            })),
            daily: [
                { day: 'Today', high: 29, low: 24, condition: 'Partly Cloudy', precipitation: 30, icon: 'partly-cloudy' },
                { day: 'Tomorrow', high: 31, low: 25, condition: 'Sunny', precipitation: 10, icon: 'sunny' },
                { day: 'Saturday', high: 28, low: 23, condition: 'Rainy', precipitation: 85, icon: 'rain' },
                { day: 'Sunday', high: 27, low: 22, condition: 'Thunderstorms', precipitation: 90, icon: 'thunderstorm' },
                { day: 'Monday', high: 30, low: 24, condition: 'Partly Cloudy', precipitation: 20, icon: 'partly-cloudy' },
                { day: 'Tuesday', high: 32, low: 26, condition: 'Sunny', precipitation: 5, icon: 'sunny' },
                { day: 'Wednesday', high: 29, low: 23, condition: 'Cloudy', precipitation: 40, icon: 'cloudy' }
            ]
        });
        setAlerts(generateAlerts(mockCurrentWeather, mockForecastData));
    };

    // Handle location search
    const handleLocationSearch = async () => {
        if (!location.trim()) return;

        setLoading(true);
        try {
            // First get coordinates for the location
            const geocodeResponse = await fetch(
                `${GEOCODING_URL}?q=${encodeURIComponent(location)}&limit=1&appid=${API_KEY}`
            );
            const geocodeData = await geocodeResponse.json();

            if (geocodeData.length > 0) {
                const { lat, lon } = geocodeData[0];
                await fetchWeatherData(lat, lon);
            } else {
                alert('Location not found. Please try a different location.');
                loadMockData();
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
            loadMockData();
        }
    };

    // Handle location detection
    const handleLocationDetect = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`${latitude}, ${longitude}`);
                    await fetchWeatherData(latitude, longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setLoading(false);
                    alert('Location detection failed. Please enter manually.');
                    loadMockData();
                }
            );
        } else {
            setLoading(false);
            alert('Geolocation is not supported by your browser.');
            loadMockData();
        }
    };

    // Get weather icon component
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'sunny':
            case 'clear-night':
                return <Sun className="w-8 h-8 text-yellow-500" />;
            case 'partly-cloudy':
                return <Cloud className="w-8 h-8 text-gray-400" />;
            case 'cloudy':
                return <Cloud className="w-8 h-8 text-gray-500" />;
            case 'rain':
                return <CloudRain className="w-8 h-8 text-blue-500" />;
            case 'thunderstorm':
                return <CloudRain className="w-8 h-8 text-purple-500" />;
            case 'snow':
                return <CloudRain className="w-8 h-8 text-blue-200" />;
            case 'fog':
                return <Cloud className="w-8 h-8 text-gray-300" />;
            default:
                return <Sun className="w-8 h-8 text-yellow-500" />;
        }
    };

    // Initial load - use geolocation if available
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`${latitude}, ${longitude}`);
                    await fetchWeatherData(latitude, longitude);
                },
                () => {
                    // Default to a location if geolocation fails
                    setLocation('Colombo');
                    loadMockData();
                }
            );
        } else {
            // Default to a location if geolocation not available
            setLocation('Colombo');
            loadMockData();
        }
    }, []);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Header />

            {/* Hero Section */}
            <section className={`relative ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'} py-20 lg:py-32`}>
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-gray-600/20 to-gray-800/20' : 'bg-gradient-to-r from-blue-600/10 to-cyan-600/10'}`}></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className={`text-4xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-green-600'} mb-6 leading-tight`}>
                        {t('weather.hero.title', { defaultValue: 'Weather & Farming Insights' })}
                    </h1>
                    <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
                        {t('weather.hero.subtitle', { defaultValue: 'Get accurate weather forecasts and farming recommendations to protect your crops and optimize your farming schedule.' })}
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Location Input */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                        <MapPin className="w-5 h-5 text-green-500" />
                        {t('weather.location', { defaultValue: 'Location' })}
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-64">
                            <input
                                type="text"
                                placeholder={t('weather.locationPlaceholder', { defaultValue: 'Enter city, village, or coordinates...' })}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg ${
                                    isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'border-gray-300 text-gray-900'
                                }`}
                            />
                        </div>
                        <button
                            onClick={handleLocationSearch}
                            disabled={loading}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 flex items-center gap-2 font-medium"
                        >
                            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
                            {t('common.search', { defaultValue: 'Search' })}
                        </button>
                        <button
                            onClick={handleLocationDetect}
                            disabled={loading}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center gap-2 font-medium"
                        >
                            <Navigation className="w-5 h-5" />
                            {t('weather.detect', { defaultValue: 'Detect' })}
                        </button>
                    </div>
                </div>

                {/* Alerts */}
                {alerts.length > 0 && (
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
                        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            {t('weather.alerts')}
                        </h2>
                        <div className="space-y-4">
                            {alerts.map((alert, index) => (
                                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                                    alert.priority === 'high'
                                        ? `${isDarkMode ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-50 border-red-500 text-red-800'}`
                                        : `${isDarkMode ? 'bg-yellow-900/30 border-yellow-700 text-yellow-300' : 'bg-yellow-50 border-yellow-500 text-yellow-800'}`
                                }`}>
                                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{alert.title}</h3>
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{alert.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Current Weather */}
                {currentWeather && (
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
                                <Thermometer className="w-5 h-5 text-blue-500" />
                                {t('weather.currentWeather')}
                            </h2>
                            <button
                                onClick={handleLocationSearch}
                                className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition duration-200`}
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
                                        <div className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{currentWeather.temperature}°C</div>
                                        <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('weather.feelsLike', { defaultValue: 'Feels like {{temp}}°C', temp: currentWeather.feelsLike })}</div>
                                    </div>
                                </div>
                                <div className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{currentWeather.condition}</div>
                                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-2 justify-center lg:justify-start`}>
                                    <MapPin className="w-4 h-4" />
                                    {currentWeather.location}
                                </div>
                            </div>

                            {/* Weather Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'} p-4 rounded-lg`}>
                                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                                        <Droplets className="w-5 h-5" />
                                        <span className="font-medium">{t('weather.humidity')}</span>
                                    </div>
                                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{currentWeather.humidity}%</div>
                                </div>

                                <div className={`${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'} p-4 rounded-lg`}>
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                                        <Wind className="w-5 h-5" />
                                        <span className="font-medium">{t('weather.windSpeed')}</span>
                                    </div>
                                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{currentWeather.windSpeed} km/h</div>
                                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentWeather.windDirection}</div>
                                </div>

                                <div className={`${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'} p-4 rounded-lg`}>
                                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
                                        <Eye className="w-5 h-5" />
                                        <span className="font-medium">{t('weather.pressure', { defaultValue: 'Pressure' })}</span>
                                    </div>
                                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{currentWeather.pressure} hPa</div>
                                </div>

                                <div className={`${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-50'} p-4 rounded-lg`}>
                                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                                        <Sunrise className="w-5 h-5" />
                                        <span className="font-medium">{t('weather.sun', { defaultValue: 'Sun' })}</span>
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
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
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
                        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                            <Clock className="w-5 h-5 text-blue-500" />
                            {t('weather.hourly', { defaultValue: 'Hourly Forecast' })}
                        </h2>
                        <div className="overflow-x-auto">
                            <div className="flex gap-4 min-w-max">
                                {forecast.hourly.map((hour, index) => (
                                    <div key={index} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg text-center min-w-24`}>
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{hour.time}</div>
                                        <div className="flex justify-center mb-2">
                                            {getWeatherIcon(hour.icon)}
                                        </div>
                                        <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-1`}>{hour.temp}°C</div>
                                        <div className="text-xs text-blue-600 dark:text-blue-400">{hour.precipitation}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Daily Forecast */}
                {forecast && (
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
                        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                            <Calendar className="w-5 h-5 text-green-500" />
                            {t('weather.forecast')}
                        </h2>
                        <div className="space-y-3">
                            {forecast.daily.map((day, index) => (
                                <div key={index} className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg transition duration-200`}>
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-20 ${isDarkMode ? 'text-white' : 'text-gray-800'} font-medium`}>{day.day}</div>
                                        <div className="flex items-center gap-2">
                                            {getWeatherIcon(day.icon)}
                                            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{day.condition}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-blue-600 dark:text-blue-400 text-sm">{day.precipitation}%</div>
                                        <div className="flex gap-2">
                                            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{day.high}°</span>
                                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{day.low}°</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Farming Recommendations */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center gap-2`}>
                        <Sprout className="w-5 h-5 text-green-500" />
                        {t('weather.advice.title', { defaultValue: 'Farming Recommendations' })}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {farmingAdvice.map((advice, index) => (
                            <div key={index} className={`${isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'} p-4 rounded-lg border`}>
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                                    {advice.icon}
                                    <span className="font-medium">{advice.title}</span>
                                </div>
                                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{advice.advice}</p>
                                <p className="text-sm text-green-600 dark:text-green-400 font-medium">{advice.timing}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Source */}
                <div className={`text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {t('weather.dataSource', { defaultValue: 'Weather data provided by OpenWeatherMap API' })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WeatherPage;
