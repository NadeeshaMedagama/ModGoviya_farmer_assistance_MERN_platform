import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import CropManagement from "./pages/CropManagement";
import Login from './components/auth/Login';
import RegisterPage from './components/auth/RegisterPage';
import FeaturesPage from "./pages/FeaturesPage";
import Marketplace from "./pages/Marketplace";
import CommunityPage from "./pages/CommunityPage";

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/cropmanage" element={<CropManagement />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/community" element={<CommunityPage />} />

          </Routes>
        </Router>
  );
}

export default App;
