import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const categories = [
    { id: 1, name: 'Men', image: 'https://images.unsplash.com/photo-1488161628813-99cf3662d28d?q=80&w=2000&auto=format&fit=crop' },
    { id: 2, name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop' },
    { id: 3, name: 'Accessories', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1780&auto=format&fit=crop' },
    { id: 4, name: 'Winter', image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1965&auto=format&fit=crop' },
    { id: 5, name: 'Sale', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop' },
];

const Home = () => {
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    // Take first 4 items as new arrivals for now
                    setNewArrivals(data.slice(0, 4));
                } else {
                    console.error('API returned invalid data:', data);
                    setNewArrivals([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home-page">
            <Hero />

            {/* Premium Categories - Bento Grid */}
            <section className="section-categories container">
                <Reveal>
                    <div className="section-header-center">
                        <h2 className="section-title">Shop Collections</h2>
                        <p className="section-subtitle">Curated styles for every occasion</p>
                    </div>
                </Reveal>

                <div className="bento-grid">
                    <Reveal className="main" effect="fade-up">
                        <Link to="/category/men/t-shirts" className="bento-item">
                            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop" alt="T-Shirts" />
                            <div className="bento-content">
                                <h3>Exclusive T-Shirts</h3>
                                <span className="shop-arrow">Shop Now <ArrowRight size={16} /></span>
                            </div>
                        </Link>
                    </Reveal>

                    <Reveal className="sub-1" delay={0.1}>
                        <Link to="/category/men" className="bento-item">
                            <img src="https://images.unsplash.com/photo-1488161628813-99cf3662d28d?q=80&w=2000&auto=format&fit=crop" alt="Men" />
                            <div className="bento-content">
                                <h3>Men's Collection</h3>
                            </div>
                        </Link>
                    </Reveal>

                    <Reveal className="sub-2" delay={0.2}>
                        <Link to="/category/men/accessories" className="bento-item">
                            <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1780&auto=format&fit=crop" alt="Accessories" />
                            <div className="bento-content">
                                <h3>Accessories</h3>
                            </div>
                        </Link>
                    </Reveal>

                    <Reveal className="sub-3" delay={0.3}>
                        <Link to="/category/winter" className="bento-item">
                            <img src="https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1965&auto=format&fit=crop" alt="Winter" />
                            <div className="bento-content">
                                <h3>Winter Edit</h3>
                            </div>
                        </Link>
                    </Reveal>

                    <Reveal className="sub-4" delay={0.4}>
                        <Link to="/category/sale" className="bento-item">
                            <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop" alt="Sale" />
                            <div className="bento-content">
                                <h3>Sale</h3>
                            </div>
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Trust Signals */}
            <section className="section-trust">
                <div className="container trust-grid">
                    <Reveal delay={0.1} effect="scale-up" className="trust-item">
                        <div className="trust-icon text-gold">★</div>
                        <h4>Premium Quality</h4>
                        <p>Crafted with the finest materials</p>
                    </Reveal>
                    <Reveal delay={0.2} effect="scale-up" className="trust-item">
                        <div className="trust-icon text-gold">✈</div>
                        <h4>Express Shipping</h4>
                        <p>Fast delivery right to your doorstep</p>
                    </Reveal>
                    <Reveal delay={0.3} effect="scale-up" className="trust-item">
                        <div className="trust-icon text-gold">🛡</div>
                        <h4>Secure Payment</h4>
                        <p>100% secure payment processing</p>
                    </Reveal>
                    <Reveal delay={0.4} effect="scale-up" className="trust-item">
                        <div className="trust-icon text-gold">↺</div>
                        <h4>Easy Returns</h4>
                        <p>Hassle-free 30 day return policy</p>
                    </Reveal>
                </div>
            </section>

            {/* Promotional Posters */}
            <section className="section-posters container">
                <div className="posters-grid">
                    <Reveal effect="slide-right">
                        <div className="poster-card">
                            <img src="https://images.unsplash.com/photo-1516257984-b1b4d8c9b30b?q=80&w=2070&auto=format&fit=crop" alt="Winter Essentials" />
                            <div className="poster-content">
                                <h3>Winter Essentials</h3>
                                <p>Stay warm without compromising on style</p>
                                <Link to="/category/winter" className="btn-link">Shop Winter <ArrowRight size={16} /></Link>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal effect="slide-left" delay={0.2}>
                        <div className="poster-card">
                            <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1587&auto=format&fit=crop" alt="Casual Style" />
                            <div className="poster-content">
                                <h3>Urban Street Style</h3>
                                <p>Trendsetting looks for everyday comfort</p>
                                <Link to="/category/men" className="btn-link">Shop Casual <ArrowRight size={16} /></Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* New Arrivals Slider */}
            <section className="section-new-arrivals container">
                <Reveal>
                    <div className="section-header">
                        <h2 className="section-title">Trending Now</h2>
                        <Link to="/category/new" className="view-all-link">View All <ArrowRight size={16} /></Link>
                    </div>
                </Reveal>
                <div className="products-grid">
                    {newArrivals.map((product, index) => (
                        <Reveal key={product._id} delay={index * 0.1}>
                            <ProductCard product={product} />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Promotional Banner */}
            <Reveal effect="fade-in">
                <section className="promo-banner">
                    <div className="promo-content">
                        <h2>Winter Collection 2025</h2>
                        <p>Wrap yourself in luxury this season.</p>
                        <button className="btn btn-secondary">Explore Now</button>
                    </div>
                </section>
            </Reveal>
        </div>
    );
};

export default Home;
