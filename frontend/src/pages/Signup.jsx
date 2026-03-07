import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, Phone } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Account created successfully! You can now log in.');
    navigate('/login');
  };

  return (
    <div className="auth-page animate-fade">
      <div className="auth-container">
        <div className="auth-card card animate-scale">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="auth-header text-center">
            <span className="eyebrow">Get Started</span>
            <h2>Create your account</h2>
          </div>
          <form className="auth-form mt-4" onSubmit={handleSignup}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={18} />
                <input type="text" placeholder="User user" className="form-control" required />
              </div>
            </div>
            <div className="form-group">
              <label>Username</label>
              <div className="input-with-icon">
                <User size={18} />
                <input type="text" placeholder="user" className="form-control" required />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input type="email" placeholder="user@example.com" className="form-control" required />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <Phone size={18} />
                <input type="tel" placeholder="+91 7378882022" className="form-control" required />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input type="password" placeholder="********" className="form-control" required />
              </div>
            </div>
            <div className="form-actions mt-2">
              <label className="checkbox-label">
                <input type="checkbox" required /> I agree to the <a href="#" className="text-highlight">Terms & Conditions</a>
              </label>
            </div>
            <button type="submit" className="btn btn-solid btn-lg full-width mt-4">
              Sign Up
            </button>
          </form>
          <div className="auth-footer mt-4 text-center">
            <p>Already have an account? <Link to="/login" className="text-highlight">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
