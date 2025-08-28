import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
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
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import GetStartedPage from "./services/GetStartedPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';
import FeatureDetailsPage from "./components/common/FeatureDetailsPage";
import StartFreeTrialPage from "./components/forum/StartFreeTrialPage";
import ReadModePage from "./components/common/ReadModePage";
import ExpertConsultationPage from "./components/common/ExpertConsultationPage";
import ResourcesHub from "./components/common/ResourcesHub";
import ChatSupport from "./components/forum/ChatSupport";

function App() {
  return (
        <Router>
          <ThemeProvider>
            <AuthProvider>
              <LanguageProvider>
                <CartProvider>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
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
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/getstart" element={<GetStartedPage />} />
                    <Route path="/learnmorefeatures" element={<FeatureDetailsPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/freetrial" element={<StartFreeTrialPage />} />
                    <Route path="/readmore" element={<ReadModePage />} />
                    <Route path="/expertconsult" element={<ExpertConsultationPage />} />
                    <Route path="/resourcehub" element={<ResourcesHub />} />
                    <Route path="/chatsupport" element={<ChatSupport />} />
                  </Routes>
                </CartProvider>
              </LanguageProvider>
            </AuthProvider>
          </ThemeProvider>
        </Router>
  );
}

export default App;
