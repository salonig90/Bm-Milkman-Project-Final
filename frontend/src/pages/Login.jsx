import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(username || 'User');
    alert('Logged in successfully!');
    navigate('/');
  };

  return (
    <div className="auth-page animate-fade">
      <div className="auth-container">
        <div className="auth-card card animate-scale">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="auth-header text-center">
            <span className="eyebrow">Welcome Back</span>
            <h2>Sign in to DairyMart</h2>
          </div>
          <form className="auth-form mt-4" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <div className="input-with-icon">
                <User size={18} />
                <input 
                  type="text" 
                  placeholder="johndoe123" 
                  className="form-control" 
                  required 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input type="password" placeholder="********" className="form-control" required />
              </div>
            </div>
            <div className="form-actions mt-2 flex justify-between">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-solid btn-lg full-width mt-4">
              Sign In
            </button>
          </form>
          <div className="auth-footer mt-4 text-center">
            <p>Don't have an account? <Link to="/signup" className="text-highlight">Create one</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
