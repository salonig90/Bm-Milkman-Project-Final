import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  Calendar, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Search,
  TrendingUp,
  LayoutDashboard,
  ExternalLink,
  CheckCircle,
  XCircle,
  IndianRupee,
  MoreVertical
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulated Data States
  const [products, setProducts] = useState([
    { id: 1, name: "Raw Cow Milk", category: "Milk", price: 65, stock: "In Stock", status: "Active" },
    { id: 2, name: "Buffalo Milk", category: "Milk", price: 85, stock: "In Stock", status: "Active" },
    { id: 3, name: "Pure Cow Ghee", category: "Ghee", price: 650, stock: "In Stock", status: "Active" },
    { id: 4, name: "Farm Fresh Paneer", category: "Milk Products", price: 90, stock: "Low Stock", status: "Active" },
    { id: 5, name: "Thick Set Curd", category: "Milk Products", price: 45, stock: "In Stock", status: "Active" },
  ]);

  const [subscriptions, setSubscriptions] = useState([
    { id: 1, user: "Amit Sharma", plan: "Daily Fresh", product: "Milk", status: "Active", start: "2024-03-01" },
    { id: 2, user: "Priya Patel", plan: "Family Pack", product: "Ghee", status: "Paused", start: "2024-02-15" },
    { id: 3, user: "Rahul Verma", plan: "Daily Fresh", product: "Milk Products", status: "Active", start: "2024-03-05" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Amit Sharma", email: "amit@gmail.com", joined: "2024-01-10", orders: 12 },
    { id: 2, name: "Priya Patel", email: "priya@yahoo.com", joined: "2024-02-05", orders: 5 },
    { id: 3, name: "Rahul Verma", email: "rahul@outlook.com", joined: "2024-02-28", orders: 8 },
  ]);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin_user');
    if (!savedAdmin) {
      navigate('/admin/login');
    } else {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  // CRUD Handlers (Simulated)
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    const name = prompt('Enter Product Name:');
    if (name) {
      const newProduct = {
        id: Date.now(),
        name,
        category: "Milk",
        price: 0,
        stock: "In Stock",
        status: "Active"
      };
      setProducts([newProduct, ...products]);
    }
  };

  // Filter Logic
  const filteredData = () => {
    const query = searchQuery.toLowerCase();
    if (activeTab === 'products') {
      return products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    }
    if (activeTab === 'subscriptions') {
      return subscriptions.filter(s => s.user.toLowerCase().includes(query) || s.plan.toLowerCase().includes(query));
    }
    if (activeTab === 'users') {
      return users.filter(u => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query));
    }
    return [];
  };

  const stats = [
    { label: 'Total Orders', value: '1,284', icon: <Package size={20} />, color: 'var(--primary)' },
    { label: 'Active Users', value: users.length.toString(), icon: <Users size={20} />, color: '#3b82f6' },
    { label: 'Subscribers', value: subscriptions.filter(s => s.status === 'Active').length.toString(), icon: <Calendar size={20} />, color: '#8b5cf6' },
    { label: 'Revenue', value: '₹42,500', icon: <TrendingUp size={20} />, color: '#10b981' }
  ];

  if (!admin) return null;

  return (
    <div className="admin-dashboard animate-fade">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="brand">
            <span className="brand-text">Dairy<span className="text-highlight">Mart</span></span>
          </Link>
          <div className="admin-badge">Admin Panel</div>
          <Link to="/" className="view-site-link">
            <ExternalLink size={14} /> View Website
          </Link>
        </div>
        
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <Package size={20} /> Products
          </button>
          <button className={`nav-item ${activeTab === 'subscriptions' ? 'active' : ''}`} onClick={() => setActiveTab('subscriptions')}>
            <Calendar size={20} /> Subscriptions
          </button>
          <button className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <Users size={20} /> Users
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">{admin.name[0]}</div>
            <div>
              <p className="admin-name">{admin.name}</p>
              <p className="admin-role">{admin.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="header-actions">
            {activeTab !== 'dashboard' && (
              <div className="search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            {activeTab === 'products' && (
              <button className="btn btn-solid" onClick={handleAddProduct}>
                <Plus size={18} /> Add Product
              </button>
            )}
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'dashboard' && (
            <>
              <div className="stats-grid">
                {stats.map((stat, i) => (
                  <div key={i} className="stat-card card animate-scale" style={{animationDelay: `${i * 0.1}s`}}>
                    <div className="stat-icon" style={{backgroundColor: stat.color + '20', color: stat.color}}>
                      {stat.icon}
                    </div>
                    <div className="stat-info">
                      <p className="stat-label">{stat.label}</p>
                      <h3 className="stat-value">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-2 mt-4">
                <div className="card padding-3 animate-fade-up">
                  <h3>Recent Orders</h3>
                  <p className="text-muted">You have 12 new orders today.</p>
                  {/* Summary content could go here */}
                </div>
                <div className="card padding-3 animate-fade-up" style={{animationDelay: '0.2s'}}>
                  <h3>Active Subscriptions</h3>
                  <p className="text-muted">Total recurring revenue: ₹18,200</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div className="content-card card animate-fade-up">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData().map(product => (
                      <tr key={product.id}>
                        <td><strong>{product.name}</strong></td>
                        <td>{product.category}</td>
                        <td>₹{product.price}</td>
                        <td>
                          <span className={`status-badge ${product.stock === 'In Stock' ? 'success' : 'warning'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="btn-icon-small"><Edit3 size={16} /></button>
                            <button className="btn-icon-small text-danger" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="content-card card animate-fade-up">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Plan</th>
                      <th>Product</th>
                      <th>Status</th>
                      <th>Start Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData().map(sub => (
                      <tr key={sub.id}>
                        <td><strong>{sub.user}</strong></td>
                        <td>{sub.plan}</td>
                        <td>{sub.product}</td>
                        <td>
                          <span className={`status-badge ${sub.status === 'Active' ? 'success' : 'warning'}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td>{sub.start}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="content-card card animate-fade-up">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Joined</th>
                      <th>Orders</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData().map(user => (
                      <tr key={user.id}>
                        <td><strong>{user.name}</strong></td>
                        <td>{user.email}</td>
                        <td>{user.joined}</td>
                        <td>{user.orders}</td>
                        <td>
                          <button className="btn-icon-small"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
