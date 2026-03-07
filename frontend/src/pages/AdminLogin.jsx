import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/staff/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_user', JSON.stringify(data.staff));
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid admin credentials');
      }
    } catch (err) {
      setError('Connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade">
      <div className="auth-container">
        <div className="auth-card card animate-scale">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Back to site
          </Link>
          <div className="auth-header text-center">
            <div className="auth-icon-wrap" style={{background: 'var(--primary)', color: 'white', margin: '0 auto 1.5rem'}}>
              <ShieldCheck size={32} />
            </div>
            <h1>Admin Login</h1>
            <p className="lead">Access the DairyMart control center</p>
          </div>

          {error && <div className="error-alert mt-4" style={{color: 'red', textAlign: 'center'}}>{error}</div>}

          <form className="auth-form mt-4" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Staff Email</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input 
                  type="email" 
                  placeholder="admin@dairymart.com" 
                  className="form-control" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input 
                  type="password" 
                  placeholder="********" 
                  className="form-control" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-solid btn-lg full-width mt-4" disabled={loading}>
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
            </button>
          </form>

          <p className="auth-footer text-center mt-4">
            New staff member? <Link to="/admin/signup" className="text-highlight">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
