import React from 'react';
import '../styles/About.css';
import { DollarSign, Truck, Users, Activity } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1 className="hero-title">The Elite Youth Difference</h1>
                    <p className="hero-subtitle">Radical Transparency. Ethical Manufacturing. Uncompromising Quality.</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-mission container">
                <div className="mission-content">
                    <h2>Why We Exist</h2>
                    <p>
                        In a world of fast fashion and disposable trends, Elite Youth stands for something permanent.
                        We believe that premium men's clothing shouldn't come at the cost of the planet or the people who make it.
                        Our mission is to provide you with garments that look exceptional, feel incredible, and last a lifetime.
                    </p>
                </div>
            </section>

            {/* Transparency Section - Cost Breakdown */}
            <section className="about-transparency">
                <div className="container">
                    <h2>Where Your Money Goes</h2>
                    <p className="section-desc">Most luxury brands mark up their products by 8-10x. We believe you have the right to know what you're paying for.</p>

                    <div className="cost-breakdown-grid">
                        <div className="cost-card">
                            <div className="icon-wrapper"><Activity size={32} /></div>
                            <h3>Materials</h3>
                            <p className="price">$25.00</p>
                            <p className="details">Premium Italian Cotton & Hardware</p>
                        </div>
                        <div className="cost-card">
                            <div className="icon-wrapper"><Users size={32} /></div>
                            <h3>Labor</h3>
                            <p className="price">$18.50</p>
                            <p className="details">Fair Living Wages & Safe Conditions</p>
                        </div>
                        <div className="cost-card">
                            <div className="icon-wrapper"><Truck size={32} /></div>
                            <h3>Transport</h3>
                            <p className="price">$5.50</p>
                            <p className="details">Duties & Shipping</p>
                        </div>
                        <div className="cost-card highlight">
                            <div className="icon-wrapper"><DollarSign size={32} /></div>
                            <h3>Elite Youth Price</h3>
                            <p className="price">$85.00</p>
                            <p className="details">Our Honest Markup (vs $220 Traditional Retail)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manufacturing Section */}
            <section className="about-manufacturing container">
                <div className="manufacturing-grid">
                    <div className="manufacturing-text">
                        <h2>Handcrafted Perfection</h2>
                        <p>
                            Every stitch tells a story. We partner directly with family-owned factories in Portugal and Japan,
                            renowned for their craftsmanship. We visit them often to ensure that our ethical standards are met
                            and that every garment is produced with the utmost care.
                        </p>
                        <p>
                            By cutting out the middlemen, we bring you master-level tailoring at a fraction of the traditional cost.
                        </p>
                    </div>
                    <div className="manufacturing-image">
                        <img src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=2063&auto=format&fit=crop" alt="Tailoring Process" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="container">
                    <h2>Join the Movement</h2>
                    <p>Experience the quality yourself.</p>
                    <a href="/shop" className="btn-shop">Shop the Collection</a>
                </div>
            </section>
        </div>
    );
};

export default About;
