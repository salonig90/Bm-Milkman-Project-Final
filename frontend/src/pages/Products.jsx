import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Search, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({});
  const { addToCart, lastAdded } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Milk', 'Ghee', 'Milk Products'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products/');
      if (response.ok) {
        const data = await response.json();
        // Handle both direct array and paginated response (DRF style)
        setProducts(Array.isArray(data) ? data : (data.results || data.products || []));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeSelect = (productId, sizeLabel) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: sizeLabel
    }));
  };

  const getProductPrice = (product) => {
    if (product.price_data && product.price_data.length > 0) {
      const quantityOptions = product.price_data.map(pd => pd.quantity);
      const selectedSize = selectedSizes[product.id] || quantityOptions[0];
      const tier = product.price_data.find(pd => pd.quantity === selectedSize);
      return tier ? tier.price : product.price;
    }
    return product.price;
  };

  const handleAddToCart = (product) => {
    const price = getProductPrice(product);
    const quantityOptions = product.price_data && product.price_data.length > 0 
      ? product.price_data.map(pd => pd.quantity) 
      : (product.quantity ? product.quantity.split(',').map(q => q.trim()) : ['1L']);
    
    const selectedSize = selectedSizes[product.id] || quantityOptions[0];
    addToCart({
      ...product,
      price: `₹${price}`,
      name: `${product.name} (${selectedSize})`
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page page-container animate-fade">
      {lastAdded && (
        <div className="cart-toast">
          <CheckCircle size={18} /> {lastAdded} added to cart!
        </div>
      )}
      
      <section className="products-content section">
        <div className="container">
          <div className="products-toolbar animate-fade-up">
            <div className="product-search">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="category-filters">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-3 mt-4">
            {loading ? (
              <div className="col-span-full text-center py-10">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                const currentPrice = getProductPrice(product);
                const quantityOptions = product.price_data && product.price_data.length > 0
                  ? product.price_data.map(pd => pd.quantity)
                  : (product.quantity ? product.quantity.split(',').map(q => q.trim()) : ['1L']);
                const selectedSize = selectedSizes[product.id] || quantityOptions[0];

                return (
                  <div key={product.id} className={`product-card card animate-fade-up delay-${(index % 4) + 1}`}>
                    <div className="product-image">
                      <img src={product.image || product.image_url || "https://via.placeholder.com/400x300?text=No+Image"} alt={product.name} />
                      <span className="product-tag">{product.category}</span>
                      <div className="product-rating">
                        <Star size={14} fill="currentColor" /> {product.rating || '4.9'}
                      </div>
                    </div>
                    <div className="product-info card-body">
                      <h3>{product.name}</h3>
                      <p className="description">{product.description || 'Fresh dairy product directly from our farm.'}</p>
                      <div className="product-sizes">
                        {quantityOptions.map(q => (
                          <button 
                            key={q} 
                            className={`size-badge ${selectedSize === q ? 'active' : ''}`}
                            onClick={() => handleSizeSelect(product.id, q)}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                      <div className="product-footer">
                        <span className="price">₹{currentPrice}</span>
                        <button 
                          className="btn btn-icon btn-solid"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-results text-center col-span-full py-10">
                <h3>No products found</h3>
                <p>Try searching for something else like "milk" or "ghee".</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
