import { Link, useNavigate } from 'react-router-dom';
import { Check, Info, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Subscription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    category: 'Milk',
    product_name: '',
    quantity: 1
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products/');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, product_name: data[0].name }));
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const plans = [
    {
      id: 1,
      name: "Daily Fresh",
      price: "₹899",
      period: "month",
      description: "Pure milk delivered every single morning.",
      features: [
        "Choice of Raw/Buffalo Milk",
        "Free Delivery by 7 AM",
        "Flexible Start/End Dates",
        "Pause/Resume Anytime",
        "Glass Bottle Eco-Packaging"
      ],
      recommended: false
    },
    {
      id: 2,
      name: "Family Pack",
      price: "₹1599",
      period: "month",
      description: "Best for families with diverse dairy needs.",
      features: [
        "All Milk Categories Included",
        "Weekend Ghee & Paneer Bonus",
        "Priority Morning Delivery",
        "Monthly Health Reports",
        "Customizable Quantities",
        "Premium Support"
      ],
      recommended: true
    }
  ];

  const isLikelyEmail = (value) => {
    if (!value) return false;
    const v = String(value).trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const fallbackEmailFromUsername = (username) => {
    const base = String(username || '').trim().toLowerCase();
    const local = base
      .replace(/\s+/g, '.')
      .replace(/[^a-z0-9._-]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\.+/, '')
      .replace(/\.+$/, '');

    return `${local || 'user'}@example.com`;
  };

  const handleSubscribe = async (planName, isProduct = false) => {
    if (!user) {
      alert('Please login to subscribe!');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const customerEmail = isLikelyEmail(user.email)
        ? String(user.email).trim()
        : fallbackEmailFromUsername(user.username);

      const payload = {
        customer_name: user.username,
        customer_email: customerEmail,
        status: 'Active',
        start_date: formData.startDate
      };

      if (isProduct) {
        // For Product subscription
        payload.product_name = formData.product_name;
        payload.category = formData.category;
        payload.quantity = formData.quantity;
        payload.end_date = formData.endDate || null;
      } else {
        // For Plan subscription
        payload.plan_name = planName;
      }

      const response = await fetch('/api/subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Subscription started successfully!');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert('Error: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Error starting subscription:', error);
      alert('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plans-page page-container animate-fade">
      <section className="page-header section alternate">
        <div className="container text-center animate-fade-up">
          <span className="eyebrow">Subscription Packages</span>
          <h1>Wholesome Dairy, Delivered Daily</h1>
          <p className="text-center">Choose a flexible subscription that fits your lifestyle. No hidden costs.</p>
        </div>
      </section>

      <section className="subscription-config section py-5">
        <div className="container">
          <div className="subscription-card card animate-scale" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="card-body p-4">
              <h2 className="text-center mb-4" style={{ fontSize: '1.5rem' }}>Configure Your Product Subscription</h2>
              <div className="grid grid-3 gap-3">
                <div className="form-group">
                  <label className="mb-1"><Calendar size={14} /> Start Date</label>
                  <input 
                    type="date" 
                    className="form-control form-control-sm" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="mb-1"><Calendar size={14} /> End Date (Optional)</label>
                  <input 
                    type="date" 
                    className="form-control form-control-sm"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="mb-1">Category</label>
                  <select 
                    className="form-control form-control-sm"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Milk</option>
                    <option>Ghee</option>
                    <option>Milk Products</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="mb-1">Product</label>
                  <select 
                    className="form-control form-control-sm"
                    value={formData.product_name}
                    onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="mb-1">Quantity</label>
                  <input 
                    type="number" 
                    className="form-control form-control-sm"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                    placeholder="e.g., 2"
                    min="1"
                  />
                </div>
                <div className="form-group d-flex align-items-end">
                  <button 
                    onClick={() => handleSubscribe(null, true)}
                    disabled={loading}
                    className="btn btn-solid btn-sm full-width"
                    style={{ height: '38px' }}
                  >
                    {loading ? '...' : 'Subscribe Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="plans-grid section">
        <div className="container text-center mb-4">
          <h2>Or Choose a Fixed Plan</h2>
        </div>
        <div className="container">
          <div className="grid grid-2">
            {plans.map((plan, index) => (
              <div key={plan.id} className={`plan-card card ${plan.recommended ? 'recommended' : ''} animate-fade-up delay-${index + 1}`}>
                {/* ... plan content ... */}
                {plan.recommended && <div className="badge">Most Popular</div>}
                <div className="plan-header card-body">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="amount">{plan.price}</span>
                    {plan.period && <span className="period">/{plan.period}</span>}
                  </div>
                  <p>{plan.description}</p>
                </div>
                <div className="plan-features card-body">
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <Check size={18} className="text-success" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="plan-footer card-body">
                  <button 
                    onClick={() => handleSubscribe(plan.name, false)}
                    disabled={loading}
                    className={`btn btn-lg ${plan.recommended ? 'btn-solid' : 'btn-ghost'} full-width`}
                  >
                    {loading ? 'Processing...' : 'Start Subscription'}
                  </button>
                  <p className="note"><Info size={14} /> Plan start date: {formData.startDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
