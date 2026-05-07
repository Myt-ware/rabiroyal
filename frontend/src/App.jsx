import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Contact from './pages/Contact';
import MyOrders from './pages/MyOrders';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

// Scroll to top on every page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isWelcomePage) {
      document.body.style.paddingTop = '0px';
      document.body.style.backgroundColor = '#000000';
    } else if (isAdminPage) {
      document.body.style.paddingTop = '0px';
      document.body.style.backgroundColor = '#111111';
    } else {
      document.body.style.paddingTop = '40px';
      document.body.style.backgroundColor = 'var(--light-bg)';
    }
  }, [isWelcomePage, isAdminPage]);

  return (
    <>
      <ScrollToTop />
      {!isWelcomePage && !isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/my-orders" 
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isWelcomePage && !isAdminPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
