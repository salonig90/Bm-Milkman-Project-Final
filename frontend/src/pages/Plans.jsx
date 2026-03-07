import { Link } from 'react-router-dom';
import { Check, Info, Calendar } from 'lucide-react';
import { useState } from 'react';

const Subscription = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    product: 'Raw Cow Milk',
    quantity: 1
  });

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

  return (
    <div className="plans-page page-container animate-fade">
      <section className="page-header section alternate">
        <div className="container text-center animate-fade-up">
          <span className="eyebrow">Subscription Packages</span>
          <h1>Wholesome Dairy, Delivered Daily</h1>
          <p className="text-center">Choose a flexible subscription that fits your lifestyle. No hidden costs.</p>
        </div>
      </section>

      <section className="subscription-config section">
        <div className="container">
          <div className="subscription-card card animate-scale">
            <div className="card-body">
              <h2>Configure Your Subscription</h2>
              <div className="grid grid-4 mt-4">
                <div className="form-group animate-fade-up delay-1">
                  <label><Calendar size={16} /> Start Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div className="form-group animate-fade-up delay-2">
                  <label><Calendar size={16} /> End Date (Optional)</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
                <div className="form-group animate-fade-up delay-3">
                  <label>Category</label>
                  <select 
                    className="form-control"
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                  >
                    <option>Milk</option>
                    <option>Ghee</option>
                    <option>Milk Products</option>
                  </select>
                </div>
                <div className="form-group animate-fade-up delay-4">
                  <label>Quantity</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="e.g., 2"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="plans-grid section">
        <div className="container">
          <div className="grid grid-2">
            {plans.map((plan, index) => (
              <div key={plan.id} className={`plan-card card ${plan.recommended ? 'recommended' : ''} animate-fade-up delay-${index + 1}`}>
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
                  <Link to="/signup" className={`btn btn-lg ${plan.recommended ? 'btn-solid' : 'btn-ghost'} full-width`}>
                    Start Subscription
                  </Link>
                  <p className="note"><Info size={14} /> Dates and category can be changed later.</p>
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
