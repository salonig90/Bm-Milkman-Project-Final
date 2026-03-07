import { Shield, Heart, Zap, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page page-container">
      <section className="about-hero section alternate">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="eyebrow">Our Story</span>
            <h1>Designed for trust from farm to doorstep</h1>
            <p className="lead">
              At DairyMart, we're on a mission to redefine the way families access fresh, high-quality dairy products while supporting local farmers.
            </p>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Farm fields at sunrise" 
              className="floating-img rounded"
            />
          </div>
        </div>
      </section>

      <section className="mission section">
        <div className="container text-center">
          <div className="section-head max-width-600">
            <span className="eyebrow">Our Mission</span>
            <h2>Pure, Fresh, and Sustainable</h2>
            <p>
              We believe that everyone deserves access to fresh, unprocessed dairy products. Our platform connects you directly with local dairy farmers, ensuring that the milk you drink is as fresh as it gets.
            </p>
          </div>
          
          <div className="grid grid-4 mt-4">
            <div className="stat-card card">
              <div className="icon-wrap"><Shield size={32} /></div>
              <h3>Safety First</h3>
              <p>Rigorous quality checks at every step of the supply chain.</p>
            </div>
            <div className="stat-card card">
              <div className="icon-wrap"><Heart size={32} /></div>
              <h3>Farm to Home</h3>
              <p>Direct sourcing from farms to maintain nutritional value.</p>
            </div>
            <div className="stat-card card">
              <div className="icon-wrap"><Zap size={32} /></div>
              <h3>Speedy Delivery</h3>
              <p>Advanced route planning to ensure your milk arrives by 7 AM.</p>
            </div>
            <div className="stat-card card">
              <div className="icon-wrap"><Award size={32} /></div>
              <h3>Sustainability</h3>
              <p>Committed to zero-waste packaging and fair farming practices.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team section alternate">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow">The Team</span>
            <h2>Passionate about dairy</h2>
            <p className="lead max-width-600">Our team consists of experts in dairy science, logistics, and technology working together to serve you better.</p>
          </div>
          <div className="team-grid grid grid-3">
            <div className="team-card text-center">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Team member" className="avatar rounded-circle" />
              <h3>David Wilson</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-card text-center">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Team member" className="avatar rounded-circle" />
              <h3>Sarah Johnson</h3>
              <p>Head of Quality Control</p>
            </div>
            <div className="team-card text-center">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Team member" className="avatar rounded-circle" />
              <h3>Michael Brown</h3>
              <p>Operations Manager</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
