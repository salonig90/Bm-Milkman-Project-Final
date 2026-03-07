import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ShieldPlus, ArrowLeft, Briefcase } from 'lucide-react';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Milkman'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/staff/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Staff account created successfully! Please log in.');
        navigate('/admin/login');
      } else {
        setError(Object.values(data).flat().join(', ') || 'Registration failed');
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
          <Link to="/admin/login" className="back-link">
            <ArrowLeft size={18} /> Back to login
          </Link>
          <div className="auth-header text-center">
            <div className="auth-icon-wrap" style={{background: 'var(--primary)', color: 'white', margin: '0 auto 1.5rem'}}>
              <ShieldPlus size={32} />
            </div>
            <h1>Staff Registration</h1>
            <p className="lead">Create a new staff account</p>
          </div>

          {error && <div className="error-alert mt-4" style={{color: 'red', textAlign: 'center'}}>{error}</div>}

          <form className="auth-form mt-4" onSubmit={handleSignup}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={18} />
                <input 
                  type="text" 
                  placeholder="Test test" 
                  className="form-control" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Staff Email</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input 
                  type="email" 
                  placeholder="staff@dairymart.com" 
                  className="form-control" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Role</label>
              <div className="input-with-icon">
                <Briefcase size={18} />
                <select 
                  className="form-control" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="Milkman">Milkman</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
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
              {loading ? 'Creating Account...' : 'Register Staff'}
            </button>
          </form>

          <p className="auth-footer text-center mt-4">
            Already have a staff account? <Link to="/admin/login" className="text-highlight">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
