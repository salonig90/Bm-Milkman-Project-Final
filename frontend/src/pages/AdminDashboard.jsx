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
  MoreVertical,
  X,
  Upload,
  Layers,
  FileText,
  ShoppingBag
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data States
  const [products, setProducts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    total_orders: '0',
    active_users: '0',
    subscribers: '0',
    revenue: '₹0'
  });

  // Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Milk',
    price: '',
    stock: 'In Stock',
    quantity: '1L',
    description: '',
    image: null,
    image_url: '',
    price_data: [{ quantity: '1L', price: '' }],
    status: 'Active'
  });

  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin_user');
    if (!savedAdmin) {
      navigate('/admin/login');
    } else {
      setAdmin(JSON.parse(savedAdmin));
      fetchProducts();
      fetchSubscriptions();
      fetchUsers();
      fetchStats();
      fetchRecentOrders();
    }
  }, [navigate]);

  useEffect(() => {
    if (!admin) return;
    const intervalId = setInterval(() => {
      fetchStats();
      fetchRecentOrders();
      fetchSubscriptions();
      fetchUsers();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [admin]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products/');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscriptions/');
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleUpdateSubscriptionStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/subscriptions/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchSubscriptions();
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const handleDeleteSubscription = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        const response = await fetch(`/api/subscriptions/${id}/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchSubscriptions();
        }
      } catch (error) {
        console.error('Error deleting subscription:', error);
      }
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/staff/stats/');
      if (response.ok) {
        const data = await response.json();
        setDashboardStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch('/api/products/orders/');
      if (response.ok) {
        const data = await response.json();
        setRecentOrders(data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/customers/');
      if (response.ok) {
        const data = await response.json();
        // Standardize user data for the dashboard
        const formattedUsers = data.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
          address: u.address,
          joined: u.created_at ? new Date(u.created_at).toLocaleDateString() : '2024-03-16',
          orders: 0 
        }));
        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  // Product CRUD Handlers
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(products.filter(p => p.id !== id));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Milk',
      price: '',
      stock: 'In Stock',
      quantity: '1L',
    description: '',
      image: null,
      image_url: '',
      price_data: [{ quantity: '1L', price: '' }],
      status: 'Active'
    });
    setShowProductModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      quantity: product.quantity || '1L',
      description: product.description || '',
      image: null, // Keep existing unless changed
      image_url: product.image_url || '',
      price_data: (product.price_data && product.price_data.length > 0) 
        ? product.price_data 
        : [{ quantity: product.quantity || '1L', price: product.price }],
      status: product.status
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', productForm.name);
    formData.append('category', productForm.category);
    formData.append('price', productForm.price);
    formData.append('stock', productForm.stock);
    formData.append('quantity', productForm.quantity);
    formData.append('description', productForm.description);
    formData.append('image_url', productForm.image_url);
    formData.append('price_data', JSON.stringify(productForm.price_data));
    // Use the first price as the main price for backwards compatibility/display
    formData.append('price', productForm.price_data[0]?.price || '0');
    formData.append('quantity', productForm.price_data.map(pd => pd.quantity).join(', '));
    formData.append('status', productForm.status);
    if (productForm.image) {
      formData.append('image', productForm.image);
    }

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}/` : '/api/products/';
      const method = editingProduct ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        setShowProductModal(false);
        fetchProducts();
      } else {
        const errorData = await response.json();
        // Fallback for ID mismatch or not found errors
        if (response.status === 404 && editingProduct) {
          alert(`Error: Product ID ${editingProduct.id} not found in database. Please refresh and try again.`);
        } else {
          alert('Error: ' + JSON.stringify(errorData));
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPriceTier = () => {
    setProductForm({
      ...productForm,
      price_data: [...productForm.price_data, { quantity: '', price: '' }]
    });
  };

  const removePriceTier = (index) => {
    const newData = productForm.price_data.filter((_, i) => i !== index);
    setProductForm({ ...productForm, price_data: newData });
  };

  const handlePriceDataChange = (index, field, value) => {
    const newData = [...productForm.price_data];
    newData[index][field] = value;
    setProductForm({ ...productForm, price_data: newData });
  };

  // Filter Logic
  const filteredData = () => {
    const query = searchQuery.toLowerCase();
    if (activeTab === 'products') {
      return products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    }
    if (activeTab === 'subscriptions') {
      return subscriptions.filter(s => 
        (s.customer_name && s.customer_name.toLowerCase().includes(query)) || 
        (s.plan_name && s.plan_name.toLowerCase().includes(query)) ||
        (s.customer_email && s.customer_email.toLowerCase().includes(query))
      );
    }
    if (activeTab === 'users') {
      return users.filter(u => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query));
    }
    return [];
  };

  const stats = [
    { label: 'Total Orders', value: dashboardStats.total_orders, icon: <Package size={20} />, color: 'var(--primary)' },
    { label: 'Active Users', value: dashboardStats.active_users, icon: <Users size={20} />, color: '#3b82f6' },
    { label: 'Subscribers', value: dashboardStats.subscribers, icon: <Calendar size={20} />, color: '#8b5cf6' },
    { label: 'Revenue', value: dashboardStats.revenue, icon: <TrendingUp size={20} />, color: '#10b981' }
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
          <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="view-site-link">
            <ExternalLink size={14} /> View Website
          </a>
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
              <button className="btn btn-solid" onClick={openAddModal}>
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
                  <div className="table-responsive mt-3">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Email</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.customer_email}</td>
                            <td>
                              <span className={`status-badge ${order.status.toLowerCase() === 'delivered' ? 'success' : 'warning'}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {recentOrders.length === 0 && (
                          <tr>
                            <td colSpan="3" className="text-center py-3">No recent orders.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card padding-3 animate-fade-up" style={{animationDelay: '0.2s'}}>
                  <h3>Active Subscriptions</h3>
                  <div className="table-responsive mt-3">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.slice(0, 5).map(sub => (
                          <tr key={sub.id}>
                            <td>{sub.customer_name}</td>
                            <td>{sub.plan_name || sub.product_name}</td>
                          </tr>
                        ))}
                        {subscriptions.length === 0 && (
                          <tr>
                            <td colSpan="2" className="text-center py-3">No active subscriptions.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
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
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData().length > 0 ? (
                      filteredData().map(product => (
                        <tr key={product.id}>
                          <td className="product-cell">
                          {product.image ? (
                            <img src={product.image} alt="" className="table-img" />
                          ) : product.image_url ? (
                            <img src={product.image_url} alt="" className="table-img" />
                          ) : (
                            <div className="table-img-placeholder">NA</div>
                          )}
                          <strong>{product.name}</strong>
                        </td>
                          <td>{product.category}</td>
                          <td>₹{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>
                            <span className={`status-badge ${product.stock === 'In Stock' ? 'success' : 'warning'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button className="btn-icon-small" onClick={() => openEditModal(product)}><Edit3 size={16} /></button>
                              <button className="btn-icon-small text-danger" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-5">
                          {loading ? <div className="spinner"></div> : 'No products found. Add your first product!'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ... Other tabs ... */}
          {activeTab === 'subscriptions' && (
            <div className="content-card card animate-fade-up">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Category/Product</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData().length > 0 ? (
                      filteredData().map(sub => (
                        <tr key={sub.id}>
                          <td>
                            <strong>{sub.customer_name}</strong>
                          </td>
                          <td>{sub.customer_email}</td>
                          <td>{sub.plan_name ? 'Plan' : 'Product'}</td>
                          <td>
                            <div>{sub.plan_name || sub.product_name}</div>
                            <div className="text-muted" style={{fontSize: '0.8rem'}}>{sub.category} ({sub.quantity})</div>
                          </td>
                          <td>
                            <select 
                              value={sub.status} 
                              onChange={(e) => handleUpdateSubscriptionStatus(sub.id, e.target.value)}
                              className={`status-select ${sub.status.toLowerCase()}`}
                              style={{
                                padding: '4px 8px',
                                borderRadius: '6px',
                                border: '1px solid var(--line)',
                                fontSize: '0.85rem'
                              }}
                            >
                              <option value="Start">Start</option>
                              <option value="Active">Active</option>
                              <option value="Pause">Pause</option>
                              <option value="Resume">Resume</option>
                              <option value="Stop">Stop</option>
                            </select>
                          </td>
                          <td>{sub.start_date}</td>
                          <td>{sub.end_date || 'N/A'}</td>
                          <td>
                            <div className="table-actions">
                              <button className="btn-icon-small text-danger" onClick={() => handleDeleteSubscription(sub.id)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-5">No subscriptions found.</td>
                      </tr>
                    )}
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
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData().length > 0 ? (
                      filteredData().map(user => (
                        <tr key={user.id}>
                          <td><strong>{user.name}</strong></td>
                          <td>{user.email}</td>
                          <td>{user.phone || 'N/A'}</td>
                          <td>
                            <div style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={user.address}>
                              {user.address || 'N/A'}
                            </div>
                          </td>
                          <td>{user.joined}</td>
                          <td>
                            <button className="btn-icon-small text-danger"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-5">No customers found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product Modal */}
      {showProductModal && (
        <div className="modal-overlay">
          <div className="modal-content card animate-scale">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="btn-icon" onClick={() => setShowProductModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleProductSubmit} className="modal-form">
              <div className="grid grid-2 gap-3">
                <div className="form-group">
                  <label><ShoppingBag size={14} /> Product Name</label>
                  <input 
                    type="text" 
                    required 
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label><Layers size={14} /> Category</label>
                  <select 
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  >
                    <option value="Milk">Milk</option>
                    <option value="Ghee">Ghee</option>
                    <option value="Milk Products">Milk Products</option>
                  </select>
                </div>
                <div className="form-group col-span-full">
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span><IndianRupee size={14} /> Price & Quantity Tiers</span>
                    <button type="button" className="btn btn-icon-small" onClick={addPriceTier}>
                      <Plus size={14} />
                    </button>
                  </label>
                  <div className="price-tiers-list">
                    {productForm.price_data.map((tier, index) => (
                      <div key={index} className="price-tier-row mt-2" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          placeholder="Qty (e.g. 1L)" 
                          required 
                          value={tier.quantity}
                          onChange={(e) => handlePriceDataChange(index, 'quantity', e.target.value)}
                        />
                        <input 
                          type="number" 
                          placeholder="Price (₹)" 
                          required 
                          value={tier.price}
                          onChange={(e) => handlePriceDataChange(index, 'price', e.target.value)}
                        />
                        {productForm.price_data.length > 1 && (
                          <button type="button" className="btn-icon-small text-danger" onClick={() => removePriceTier(index)}>
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Stock Status</label>
                  <select 
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><Upload size={14} /> Product Image (Upload)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setProductForm({...productForm, image: e.target.files[0]})}
                  />
                </div>
                <div className="form-group">
                  <label><ExternalLink size={14} /> Product Image (URL)</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/image.jpg"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <label><FileText size={14} /> Description</label>
                <textarea 
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                ></textarea>
              </div>
              <div className="modal-footer mt-4">
                <button type="button" className="btn" onClick={() => setShowProductModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-solid" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
