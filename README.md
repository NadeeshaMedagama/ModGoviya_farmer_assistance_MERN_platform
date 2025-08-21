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

### 📂 [Architecture_Diagram_Document](https://drive.google.com/file/d/13w8I3ct13dK8txjiAq4U6RbyNXQd_uQq/view?usp=sharing)

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

## 🔐 Security Notice

⚠️ **IMPORTANT**: This repository contains example configuration files with placeholder values. Before deploying to any environment, ensure you:

1. **Remove all sensitive data** from committed files
2. **Never commit** actual credentials, API keys, or secrets to version control
3. **Use environment variables** or secure secret management systems
4. **Generate strong, unique passwords** for all services
5. **Review all configuration files** before deployment

### Sensitive Data to Configure:
- Database credentials and connection strings
- JWT secrets and encryption keys
- Third-party API keys (OpenWeatherMap, Cloudinary, SendGrid, Google Maps)
- Email service credentials
- OAuth/OIDC client secrets
- SSL certificates and private keys

## 🗃️ Database Setup

### MongoDB Database Creation Script

Before running the application, you need to create the MongoDB database and initial collections. Run the following scripts:

#### 1. Database Initialization Script (`scripts/init-database.js`)

```javascript
// Connect to MongoDB and create the ModGoviya database
use modgoviya

// Create collections with validation schemas
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { bsonType: "string", minLength: 2, maxLength: 100 },
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" },
        password: { bsonType: "string", minLength: 6 },
        role: { enum: ["farmer", "expert", "admin"], default: "farmer" },
        location: {
          bsonType: "object",
          properties: {
            district: { bsonType: "string" },
            coordinates: {
              type: { enum: ["Point"] },
              coordinates: { bsonType: "array", minItems: 2, maxItems: 2 }
            }
          }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

db.createCollection("crops", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "farmer", "variety", "plantingDate"],
      properties: {
        name: { bsonType: "string", minLength: 1 },
        variety: { bsonType: "string" },
        plantingDate: { bsonType: "date" },
        expectedHarvest: { bsonType: "date" },
        area: { bsonType: "number", minimum: 0 },
        status: { enum: ["planted", "growing", "harvested", "failed"] }
      }
    }
  }
})

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "seller", "price", "category"],
      properties: {
        title: { bsonType: "string", minLength: 1 },
        price: { bsonType: "number", minimum: 0 },
        category: { enum: ["seeds", "fertilizers", "equipment", "produce", "services"] },
        availability: { enum: ["available", "sold", "reserved"] }
      }
    }
  }
})

db.createCollection("forumposts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "content", "author"],
      properties: {
        title: { bsonType: "string", minLength: 5 },
        content: { bsonType: "string", minLength: 10 },
        tags: { bsonType: "array", items: { bsonType: "string" } },
        likes: { bsonType: "number", minimum: 0 }
      }
    }
  }
})

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "location.coordinates": "2dsphere" })
db.crops.createIndex({ "farmer": 1, "plantingDate": -1 })
db.products.createIndex({ "category": 1, "availability": 1 })
db.products.createIndex({ "seller": 1 })
db.forumposts.createIndex({ "author": 1, "createdAt": -1 })
db.forumposts.createIndex({ "tags": 1 })

print("ModGoviya database initialized successfully!")
```

#### 2. Sample Data Script (`scripts/seed-data.js`)

```javascript
// Insert sample data for development/testing
use modgoviya

// Sample user data (passwords should be hashed in production)
db.users.insertMany([
  {
    name: "John Farmer",
    email: "john@example.com",
    password: "$2a$10$example_hashed_password", // Hash this properly
    role: "farmer",
    location: {
      district: "Colombo",
      coordinates: {
        type: "Point",
        coordinates: [79.8612, 6.9271]
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Dr. Agricultural Expert",
    email: "expert@example.com",
    password: "$2a$10$example_hashed_password", // Hash this properly
    role: "expert",
    location: {
      district: "Kandy",
      coordinates: {
        type: "Point",
        coordinates: [80.6337, 7.2906]
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// Sample crop categories
db.cropCategories = db.collection('cropCategories')
db.cropCategories.insertMany([
  { name: "Rice", type: "cereal", seasons: ["Yala", "Maha"] },
  { name: "Tea", type: "beverage", seasons: ["year-round"] },
  { name: "Coconut", type: "plantation", seasons: ["year-round"] },
  { name: "Vegetables", type: "horticulture", seasons: ["year-round"] }
])

print("Sample data inserted successfully!")
```

### Running Database Scripts

```bash
# Navigate to project root
cd modgoviya

# Create the scripts directory
mkdir -p scripts

# Make scripts executable
chmod +x scripts/*.js

# Run database initialization
mongosh < scripts/init-database.js

# Run sample data insertion (optional, for development)
mongosh < scripts/seed-data.js
```

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
   
   # Run database initialization scripts
   mongosh < scripts/init-database.js
   
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
├── scripts/
│   ├── init-database.js
│   └── seed-data.js
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

### Tomcat Server Deployment

#### Prerequisites for Tomcat Deployment
- Apache Tomcat 9.0 or higher
- Java 11 or higher
- Node.js build environment

#### Step 1: Prepare Application for Tomcat

1. **Build the React Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create WAR Structure**
   ```bash
   # Create deployment directory
   mkdir -p deploy/modgoviya
   
   # Copy built React app
   cp -r frontend/build/* deploy/modgoviya/
   
   # Create WEB-INF directory
   mkdir -p deploy/modgoviya/WEB-INF
   ```

3. **Create web.xml for Tomcat** (`deploy/modgoviya/WEB-INF/web.xml`)
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
            http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
     
     <display-name>ModGoviya</display-name>
     
     <!-- Default servlet for static content -->
     <servlet-mapping>
       <servlet-name>default</servlet-name>
       <url-pattern>*.js</url-pattern>
     </servlet-mapping>
     
     <servlet-mapping>
       <servlet-name>default</servlet-name>
       <url-pattern>*.css</url-pattern>
     </servlet-mapping>
     
     <servlet-mapping>
       <servlet-name>default</servlet-name>
       <url-pattern>*.png</url-pattern>
     </servlet-mapping>
     
     <servlet-mapping>
       <servlet-name>default</servlet-name>
       <url-pattern>*.jpg</url-pattern>
     </servlet-mapping>
     
     <!-- Route all other requests to index.html for React Router -->
     <error-page>
       <error-code>404</error-code>
       <location>/index.html</location>
     </error-page>
     
   </web-app>
   ```

#### Step 2: Deploy Backend API Server

The Node.js backend needs to run separately from Tomcat. Choose one of these approaches:

**Option A: Run Node.js Backend on Different Port**
```bash
# Start backend on port 8080 (or different from Tomcat)
cd backend
PORT=8080 npm start

# Update frontend API URL to point to backend
# In your React build, ensure REACT_APP_API_URL=http://your-server:8080/api
```

**Option B: Use Reverse Proxy (Recommended)**

Configure Apache HTTP Server or Nginx as reverse proxy:

**Apache httpd.conf:**
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    
    # Serve React app from Tomcat
    ProxyPass /api/ http://localhost:8080/api/
    ProxyPassReverse /api/ http://localhost:8080/api/
    
    # All other requests go to Tomcat (React app)
    ProxyPass / http://localhost:8080/modgoviya/
    ProxyPassReverse / http://localhost:8080/modgoviya/
</VirtualHost>
```

#### Step 3: Create WAR File and Deploy

1. **Create WAR file**
   ```bash
   cd deploy
   jar -cvf modgoviya.war -C modgoviya/ .
   ```

2. **Deploy to Tomcat**
   ```bash
   # Copy WAR to Tomcat webapps directory
   cp modgoviya.war $CATALINA_HOME/webapps/
   
   # Or use Tomcat Manager (if enabled)
   # Upload via http://localhost:8080/manager/html
   ```

3. **Start Services**
   ```bash
   # Start MongoDB
   mongod --config /etc/mongod.conf
   
   # Start Node.js backend
   cd backend
   NODE_ENV=production npm start
   
   # Start Tomcat
   $CATALINA_HOME/bin/startup.sh
   ```

#### Step 4: Production Environment Configuration

1. **Update Environment Variables for Production**
   ```bash
   # Backend production .env
   NODE_ENV=production
   MONGODB_URI=mongodb://localhost:27017/modgoviya_prod
   JWT_SECRET=your_production_jwt_secret
   PORT=8080
   
   # Ensure all API keys are configured
   WEATHER_API_KEY=your_actual_api_key
   CLOUDINARY_API_KEY=your_actual_api_key
   # ... other production credentials
   ```

2. **Configure Database for Production**
   ```bash
   # Create production database
   mongosh --eval "use modgoviya_prod" < scripts/init-database.js
   ```

3. **Set up SSL/HTTPS (Recommended)**
   - Configure SSL certificate in Tomcat or reverse proxy
   - Update all URLs to use HTTPS
   - Enable secure cookie settings

#### Troubleshooting Tomcat Deployment

**Common Issues:**

1. **404 errors for React routes:**
   - Ensure `web.xml` error-page configuration is correct
   - Verify React Router basename matches deployment path

2. **API calls failing:**
   - Check CORS configuration in backend
   - Verify API URL configuration in frontend
   - Ensure backend server is running and accessible

3. **Static assets not loading:**
   - Check servlet-mapping in `web.xml`
   - Verify build assets are in correct directory

**Logs to Check:**
- Tomcat logs: `$CATALINA_HOME/logs/catalina.out`
- Backend logs: Check your Node.js application logs
- MongoDB logs: `/var/log/mongodb/mongod.log`

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
