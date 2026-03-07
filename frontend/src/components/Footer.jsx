import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">DairyMart</Link>
            <p>Delivering fresh dairy products directly from the farm to your doorstep every morning.</p>
            <div className="social-links">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/subscription">Subscription</Link>
            <Link to="/admin/login" style={{marginTop: '1rem', opacity: 0.6, fontSize: '0.85rem'}}>Staff Portal</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DairyMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
