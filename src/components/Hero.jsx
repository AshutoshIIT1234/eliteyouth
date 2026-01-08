import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section className="hero" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2148&auto=format&fit=crop")' }}>
            <div className="hero-overlay"></div>
            <div className="hero-content container">
                <span className="hero-subtitle">Elite Youth Collection 2026</span>
                <h1 className="hero-title">Redefining <br /> Men's Fashion</h1>
                <p className="hero-desc">Discover the new standard of luxury and comfort. <br /> Designed for the modern man.</p>
                <div className="hero-buttons">
                    <Link to="/category/men" className="btn btn-primary">Shop New Arrivals</Link>
                    <Link to="/category/men/t-shirts" className="btn btn-outline-light">Explore T-Shirts</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
