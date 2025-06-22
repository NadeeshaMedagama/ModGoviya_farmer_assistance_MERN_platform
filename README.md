# 🌾 ModGoviya - Modern Farming Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%5E18.0.0-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](https://expressjs.com/)

> **Empowering farmers through technology** - A comprehensive digital platform designed to revolutionize agricultural practices in Sri Lanka and beyond.

## 🌟 Overview

ModGoviya is a cutting-edge web application built with the MERN stack that bridges the gap between traditional farming and modern technology. Our platform empowers farmers with essential tools, real-time information, and community-driven services to optimize their agricultural operations and increase productivity.

### 🎯 Mission
To democratize access to agricultural technology and information, enabling farmers to make data-driven decisions that improve crop yields, reduce costs, and promote sustainable farming practices.

## ✨ Features

### 🌱 Core Functionality
- **Crop Management System** - Comprehensive tracking of crop lifecycle from planting to harvest
- **Real-time Weather Forecasting** - Localized weather data integration for informed decision-making
- **Digital Marketplace** - Buy and sell farming products, equipment, and services
- **Task Scheduler** - Automated reminders for farming activities
- **Pest & Disease Management** - AI-powered identification and treatment recommendations

### 🤝 Community Features
- **Community Forum** - Connect with local farmers and agricultural experts
- **Knowledge Hub** - Access to modern farming techniques and industry news
- **Multi-language Support** - Available in Sinhala, Tamil, and English

### 📊 Analytics & Insights
- **Crop Performance Analytics** - Track yields, expenses, and profitability
- **Weather Pattern Analysis** - Historical and predictive weather insights
- **Market Price Trends** - Real-time commodity pricing information

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and context
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **React Query** - Data fetching and caching

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication

### External APIs & Services
- **OpenWeatherMap API** - Weather data integration
- **Cloudinary** - Image storage and optimization
- **SendGrid** - Email service for notifications
- **Google Maps API** - Location services

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/modgoviya.git
   cd modgoviya
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**

   Create `.env` files in both backend and frontend directories:

   **Backend (.env)**
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/modgoviya
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   
   # External APIs
   WEATHER_API_KEY=your_openweathermap_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   
   # Email Service
   SENDGRID_API_KEY=your_sendgrid_api_key
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

   **Frontend (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB service
   mongod
   
   # Run database migrations (if applicable)
   cd backend
   npm run migrate
   ```

5. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm run dev
   
   # Start frontend development server (in a new terminal)
   cd frontend
   npm start
   ```

6. **Access the application**
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:5000
    - API Documentation: http://localhost:5000/api-docs

## 📁 Project Structure

```
ModGoviya/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cropController.js
│   │   ├── marketplaceController.js
│   │   └── weatherController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Crop.js
│   │   ├── Product.js
│   │   └── ForumPost.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── crops.js
│   │   ├── marketplace.js
│   │   └── forum.js
│   ├── utils/
│   │   ├── emailService.js
│   │   └── weatherService.js
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── crops/
│   │   │   ├── marketplace/
│   │   │   └── forum/
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── CropManagement.js
│   │   │   ├── Marketplace.js
│   │   │   └── Community.js
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── docs/
├── tests/
├── README.md
└── package.json
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run migrate` - Run database migrations

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e
```

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Crop Management
- `GET /api/crops` - Get all crops
- `POST /api/crops` - Create new crop
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop

### Marketplace
- `GET /api/marketplace/products` - Get all products
- `POST /api/marketplace/products` - Create product listing
- `GET /api/marketplace/orders` - Get user orders

For complete API documentation, visit `/api-docs` when running the server.

## 🌍 Localization

ModGoviya supports multiple languages to serve diverse farming communities:

- **English** (en) - Default language
- **Sinhala** (si) - Primary local language
- **Tamil** (ta) - Secondary local language

### Adding New Languages
1. Create translation files in `frontend/src/locales/`
2. Update language selector component
3. Add RTL support if needed

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Build backend (if using TypeScript)
cd backend
npm run build
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Cloud Deployment
- **Frontend**: Deploy to Vercel, Netlify, or AWS S3
- **Backend**: Deploy to Heroku, AWS EC2, or DigitalOcean
- **Database**: MongoDB Atlas for managed database

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Issue Reporting
- Use issue templates
- Provide detailed reproduction steps
- Include system information and logs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: [Nadeesha Medagama](https://github.com/NadeeshaMedagama)
- **Backend Developer**: [Team Member](https://github.com/teammember)
- **Frontend Developer**: [Team Member](https://github.com/teammember)
- **UI/UX Designer**: [Team Member](https://github.com/teammember)

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data API
- **Cloudinary** for image management services
- **Sri Lankan Department of Agriculture** for agricultural data
- **Local farming communities** for insights and feedback

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/modgoviya/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/modgoviya/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/modgoviya/discussions)
- **Email**: nadeeshamedagama@gmail.com

## 🔮 Roadmap

### Version 2.0 (Q3 2025)
- [ ] Mobile application (React Native)
- [ ] AI-powered crop recommendations
- [ ] IoT device integration
- [ ] Advanced analytics dashboard

### Version 2.1 (Q4 2025)
- [ ] Blockchain-based supply chain tracking
- [ ] Drone imagery integration
- [ ] Voice commands in local languages
- [ ] Offline mode support

---

<div align="center">

**Built with ❤️ for the farming community**

[Website](https://modgoviya.com) • [Documentation](https://docs.modgoviya.com) • [Community](https://community.modgoviya.com)

</div>
