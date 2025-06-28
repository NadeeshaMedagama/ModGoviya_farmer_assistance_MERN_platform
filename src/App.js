import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import WeatherPage from './pages/WeatherPage';
import CropManagement from "./pages/CropManagement";
import Login from './components/auth/Login';
import RegisterPage from './components/auth/RegisterPage';
import FeaturesPage from "./pages/FeaturesPage";
import Marketplace from "./pages/Marketplace";
import CommunityPage from "./pages/CommunityPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./services/ContactUs";
import StartTrading from "./services/StartTrading";
import BrowseFeaturesPage from "./services/BrowseFeaturesPage";
import WatchDemoPage from "./services/WatchDemoPage";
import ScheduleDemo from "./components/forum/ScheduleDemo";
import LearnMore from "./services/LearnMore";
import Cart from "./pages/Cart";

function App() {
  return (
        <Router>
          <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/cropmanage" element={<CropManagement />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/trade" element={<StartTrading />} />
            <Route path="/browse" element={<BrowseFeaturesPage />} />
            <Route path="/watchdemo" element={<WatchDemoPage />} />
            <Route path="/schedule" element={<ScheduleDemo />} />
            <Route path="/learnmore" element={<LearnMore />} />
            <Route path="/cart" element={<Cart />} />

          </Routes>
            </CartProvider>
        </Router>
  );
}

export default App;
