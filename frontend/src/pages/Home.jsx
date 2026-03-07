import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Truck, Clock, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page animate-fade">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content animate-fade-up">
            <span className="eyebrow delay-1">Fresh Every Morning</span>
            <h1 className="delay-2">Pure Milk, Straight From Our Farm to Your Home.</h1>
            <p className="lead delay-3">
              Experience the true taste of nature with our unadulterated, farm-fresh dairy products. We deliver health and happiness to your doorstep every single day.
            </p>
            <div className="cta-row delay-4">
              <Link to="/subscription" className="btn btn-solid btn-lg">
                Start Subscription <ArrowRight size={20} />
              </Link>
              <Link to="/products" className="btn btn-ghost btn-lg">
                Explore Products
              </Link>
            </div>
          </div>
          <div className="hero-image animate-scale delay-2">
            <img 
              src="https://cpimg.tistatic.com/05707277/b/4/Cow-Natural-Milk.jpg"
              alt="Fresh milk bottle" 
              className="floating-img"
            />
          </div>
        </div>
      </section>

      <section className="dairy-gallery section alternate">
        <div className="container">
          <div className="section-head text-center animate-fade-up">
            <span className="eyebrow">Our Goodness</span>
            <h2>Natural. Fresh. Wholesome.</h2>
          </div>
          <div className="grid grid-3">
            <div className="gallery-item card animate-fade-up delay-1">
              <img src="https://mcpress.mayoclinic.org/uploads/2023/10/DairymilkSoymilkAlmondmilkxGettyImages-1217137593.jpg" alt="Fresh Milk" />
              <div className="card-body">
                <h3>Premium Milk</h3>
                <p>Rich in nutrients, our milk is processed with minimal handling to preserve its natural goodness.</p>
              </div>
            </div>
            <div className="gallery-item card animate-fade-up delay-2">
              <img src="https://legpiece.in/wp-content/uploads/2024/12/curd.jpeg" alt="Dairy Products" />
              <div className="card-body">
                <h3>Fresh Curd</h3>
                <p>Thick, creamy, and probiotic-rich curd made from the finest farm milk.</p>
              </div>
            </div>
            <div className="gallery-item card animate-fade-up delay-3">
              <img src="https://img.freepik.com/free-photo/tofu-made-from-soybeans-food-nutrition-concept_1150-26357.jpg?semt=ais_rp_50_assets&w=740&q=80" alt="Artisan Paneer" />
              <div className="card-body">
                <h3> Fresh Paneer</h3>
                <p>Soft and delicious paneer crafted using traditional methods for the best texture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-summary section">
        <div className="container">
          <div className="section-head text-center animate-fade-up">
            <span className="eyebrow">Why DairyMart?</span>
            <h2>The Quality You Can Trust</h2>
          </div>
          <div className="grid grid-2 align-center">
            <div className="image-content animate-scale">
              <img src="https://media.istockphoto.com/id/501861293/photo/cow-livestock-new-zealand.jpg?s=612x612&w=0&k=20&c=8GjGU5DxGbIQFxDfvEnYMbGzT3ee8l4asRGTciSJ-BQ=" alt="Dairy Farm" className="rounded shadow-lg" />
            </div>
            <div className="text-content animate-fade-up delay-2">
              <div className="feature-item-inline">
                <div className="feature-icon-small"><CheckCircle /></div>
                <div>
                  <h3>Direct Farm Sourcing</h3>
                  <p>No middlemen. We bring milk directly from our healthy cows to your kitchen.</p>
                </div>
              </div>
              <div className="feature-item-inline">
                <div className="feature-icon-small"><CheckCircle /></div>
                <div>
                  <h3>Cold Chain Delivery</h3>
                  <p>Our specialized delivery network ensures the milk stays chilled until it reaches you.</p>
                </div>
              </div>
              <div className="feature-item-inline">
                <div className="feature-icon-small"><CheckCircle /></div>
                <div>
                  <h3>Hassle-Free Subscription</h3>
                  <p>Manage your daily needs easily with our flexible subscription plans.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section section alternate">
        <div className="container">
          <div className="cta-card text-center animate-fade-up">
            <h2 >Ready to transform your mornings?</h2>
            <p className="text-center">Join over 10,000 families who trust DairyMart for their daily nutrition.</p>
            <Link to="/signup" className="btn btn-solid btn-lg">Get Started Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
