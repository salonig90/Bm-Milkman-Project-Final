import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="container">
        <Link to="/" className="brand">
          <span className="brand-icon">🥛</span>
          <span className="brand-text">Dairy<span className="text-highlight">Mart</span></span>
        </Link>
        
        <nav className={`menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/subscription" onClick={() => setIsOpen(false)}>Subscription</Link>
        </nav>

        <div className="topbar-right">
          <Link to="/checkout" className="btn btn-icon btn-ghost nav-cart" style={{position: 'relative'}}>
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>
          
          {user ? (
            <div className="user-nav">
              <span className="welcome-text">Hi, {user.username}</span>
              <button onClick={logout} className="btn btn-icon btn-ghost" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost nav-login">
                <User size={18} />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="btn btn-solid nav-login">
                Sign up
              </Link>
            </>
          )}
          
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
