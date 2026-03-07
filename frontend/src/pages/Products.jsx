import { useState } from 'react';
import { ShoppingCart, Star, Search, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({});
  const { addToCart, lastAdded } = useCart();

  const categories = ['All', 'Milk', 'Ghee', 'Milk Products'];

  const products = [
    {
      id: 1,
      name: "Raw Cow Milk",
      category: "Milk",
      description: "Freshly milked cow milk, no processing, pure and rich.",
      basePrice: 65,
      sizes: [
        { label: "500ml", multiplier: 0.5 },
        { label: "1L", multiplier: 1 },
        { label: "2L", multiplier: 1.9 }
      ],
      image: "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2024/11/AdobeStock_354060824-1024x683.jpeg",
      rating: 4.9
    },
    {
      id: 2,
      name: "Premium Buffalo Milk",
      category: "Milk",
      description: "High-fat, creamy buffalo milk for a richer taste.",
      basePrice: 85,
      sizes: [
        { label: "500ml", multiplier: 0.5 },
        { label: "1L", multiplier: 1 },
        { label: "2L", multiplier: 1.9 }
      ],
      image: "https://mydiagnostics.in/cdn/shop/articles/img-1748326586409_1024x1024.jpg?v=1748327918",
      rating: 4.8
    },
    {
      id: 3,
      name: "Pure Cow Ghee",
      category: "Ghee",
      description: "Traditional golden ghee made from cultured butter.",
      basePrice: 650,
      sizes: [
        { label: "250g", multiplier: 0.5 },
        { label: "500g", multiplier: 1 },
        { label: "1kg", multiplier: 1.9 }
      ],
      image: "https://5.imimg.com/data5/SELLER/Default/2023/3/294487755/BY/OE/YL/186787557/pure-ghee.jpg",
      rating: 5.0
    },
    {
      id: 4,
      name: "Farm Fresh Paneer",
      category: "Milk Products",
      description: "Soft, spongy paneer made daily in small batches.",
      basePrice: 90,
      sizes: [
        { label: "200g", multiplier: 1 },
        { label: "500g", multiplier: 2.4 }
      ],
      image: "https://himalayancreamery.com/cdn/shop/files/WhatsAppImage2025-06-17at15.03.17_2_dc58008d-b4c8-44c1-8dd7-ee0a26ffe1b9.jpg?v=1751224019",
      rating: 4.9
    },
    {
      id: 5,
      name: "Thick Set Curd",
      category: "Milk Products",
      description: "Creamy probiotic curd set traditionally in pots.",
      basePrice: 45,
      sizes: [
        { label: "500g", multiplier: 1 },
        { label: "1kg", multiplier: 1.8 }
      ],
      image: "https://cdnasd.countrydelight.in/New_product_image/Low%20fat%20Dahi%20-%20PDP%204_1681126973430.jpeg",
      rating: 5
    },
    {
      id: 6,
      name: "Organic Butter",
      category: "Milk Products",
      description: "Hand-churned butter from grass-fed cows.",
      basePrice: 120,
      sizes: [
        { label: "100g", multiplier: 1 },
        { label: "250g", multiplier: 2.3 },
        { label: "500g", multiplier: 4.4 }
      ],
      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800",
      rating: 4.8
    }
  ];

  const handleSizeSelect = (productId, sizeIndex) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: sizeIndex
    }));
  };

  const getProductPrice = (product) => {
    const selectedIndex = selectedSizes[product.id] || 0;
    const size = product.sizes[selectedIndex];
    return Math.round(product.basePrice * size.multiplier);
  };

  const getSelectedSizeLabel = (product) => {
    const selectedIndex = selectedSizes[product.id] || 0;
    return product.sizes[selectedIndex].label;
  };

  const handleAddToCart = (product) => {
    const price = getProductPrice(product);
    const size = getSelectedSizeLabel(product);
    addToCart({
      ...product,
      price: `₹${price}`,
      name: `${product.name} (${size})`
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                const currentPrice = getProductPrice(product);
                const selectedIndex = selectedSizes[product.id] || 0;

                return (
                  <div key={product.id} className={`product-card card animate-fade-up delay-${(index % 4) + 1}`}>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <span className="product-tag">{product.category}</span>
                      <div className="product-rating">
                        <Star size={14} fill="currentColor" /> {product.rating}
                      </div>
                    </div>
                    <div className="product-info card-body">
                      <h3>{product.name}</h3>
                      <p className="description">{product.description}</p>
                      <div className="product-sizes">
                        {product.sizes.map((size, idx) => (
                          <button 
                            key={size.label} 
                            className={`size-badge ${selectedIndex === idx ? 'active' : ''}`}
                            onClick={() => handleSizeSelect(product.id, idx)}
                          >
                            {size.label}
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
              <div className="no-results text-center">
                <h3>No products found for "{searchQuery}"</h3>
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
