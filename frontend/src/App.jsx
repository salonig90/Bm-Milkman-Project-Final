import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Subscription from './pages/Plans';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPort = window.location.port === '3001';
  const isAuthPage = ['/login', '/signup', '/admin/login', '/admin/signup'].includes(location.pathname);
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');

  // On admin port, if we are at root, it's an auth page (AdminLogin)
  const isActuallyAuthPage = isAuthPage || (isAdminPort && location.pathname === '/');

  return (
    <div className="site-shell">
      {!isActuallyAuthPage && !isAdminDashboard && <Navbar />}
      <main className="main-content">
        {children}
      </main>
      {!isActuallyAuthPage && !isAdminDashboard && <Footer />}
    </div>
  );
};

function App() {
  const isAdminPort = window.location.port === '3001';

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={isAdminPort ? <AdminLogin /> : <Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
