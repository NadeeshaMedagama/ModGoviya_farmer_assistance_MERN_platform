import axios from 'axios';

// Create an axios instance with default settings
const api = axios.create({
    // Base URL should match your backend (development vs production)
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',

    // Important for cookies/sessions to work
    withCredentials: true,

    // Default timeout (5 seconds)
    timeout: 5000,

    // Default headers
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor (add auth token if exists)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (handle common errors)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common error statuses
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized (redirect to login)
                    window.location.href = '/login?session_expired=true';
                    break;
                case 403:
                    // Handle forbidden access
                    console.error('Forbidden access');
                    break;
                case 404:
                    // Handle not found
                    console.error('API endpoint not found');
                    break;
                case 500:
                    // Handle server errors
                    console.error('Server error occurred');
                    break;
                default:
                    console.error('Unhandled API error', error);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Request setup error', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
