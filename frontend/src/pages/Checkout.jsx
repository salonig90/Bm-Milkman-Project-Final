import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, CreditCard, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    if (!user) {
      alert("Please login first to access the checkout.");
      navigate('/login');
    }
  }, [user, navigate]);

  const resolveCustomerEmail = async () => {
    if (user?.email) return String(user.email).trim();

    const lookupName = String(user?.username || user?.name || '').trim().toLowerCase();
    if (!lookupName) return null;

    try {
      const response = await fetch('/api/customers/');
      if (!response.ok) return null;
      const customers = await response.json();
      const match = (customers || []).find(
        (c) => String(c?.name || '').trim().toLowerCase() === lookupName
      );
      if (match?.email) {
        updateUser({ ...match, username: user?.username || match.name });
        return String(match.email).trim();
      }
    } catch (_) {
      // ignore
    }

    return null;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const customerEmail = await resolveCustomerEmail();
    if (!customerEmail) {
      alert('Your account does not have an email on file. Please log in again.');
      return;
    }
    if (cartItems.length === 0) return;

    setIsPaying(true);
    try {
      // Create one Order row per cart item (backend Order model is per product).
      await Promise.all(
        cartItems.map((item) =>
          fetch('/api/products/orders/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer_email: customerEmail,
              product: item.id,
              quantity: item.quantity,
              status: 'Pending',
            }),
          }).then(async (r) => {
            if (!r.ok) {
              const err = await r.json().catch(() => ({}));
              throw new Error(JSON.stringify(err));
            }
          })
        )
      );

      // Small delay to keep the existing "processing" feel.
      setTimeout(() => {
        setOrderPlaced(true);
        clearCart();
      }, 600);
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="success-screen card">
            <div className="success-icon">
              <CheckCircle size={48} />
            </div>
            <h1>Order Placed Successfully!</h1>
            <p className="lead">Your fresh dairy products will be delivered tomorrow morning by 7 AM.</p>
            <div className="mt-4">
              <Link to="/products" className="btn btn-solid btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container text-center">
          <div className="card padding-4">
            <ShoppingBag size={64} className="text-muted mb-4" style={{margin: '0 auto 2rem'}} />
            <h2>Your cart is empty</h2>
            <p className="lead">Looks like you haven't added any dairy goodness yet.</p>
            <Link to="/products" className="btn btn-solid mt-4">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="mb-4">Checkout</h1>
        <div className="checkout-grid">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <div className="cart-item-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>{item.price} per unit</p>
                  </div>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-price">
                    ₹{parseFloat(item.price.replace('₹', '')) * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-footer">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
          </div>

          <div className="payment-card">
            <h3>Payment Details</h3>
            <form className="mt-4" onSubmit={handlePayment}>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter your full address"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                ></textarea>
              </div>
              
              <div className="payment-options mt-4">
                <p className="mb-2"><strong>Payment Method</strong></p>
                <div className="form-group">
                  <label className="checkbox-label card padding-2" style={{border: '1px solid var(--primary)'}}>
                    <input type="radio" name="payment" defaultChecked />
                    <span className="flex align-center gap-2">
                      <CreditCard size={18} /> Online Payment / UPI
                    </span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label card padding-2">
                    <input type="radio" name="payment" />
                    <span className="flex align-center gap-2">
                      <Truck size={18} /> Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-solid btn-lg full-width mt-4" disabled={isPaying}>
                {isPaying ? 'Processing...' : `Pay ₹${cartTotal}`} <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
