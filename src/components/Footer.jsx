import { Facebook, Instagram, Twitter, Youtube, Smartphone, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Column 1: Collections */}
                    <div className="footer-col">
                        <h4>COLLECTIONS</h4>
                        <ul>
                            <li><Link to="/category/men">Men</Link></li>
                            <li><Link to="/category/activewear">Activewear</Link></li>
                            <li><Link to="/category/winter">Winter Collection</Link></li>
                            <li><Link to="/category/summer">Summer Collection</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Information */}
                    <div className="footer-col">
                        <h4>INFORMATION</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/terms">Terms & Conditions</Link></li>
                            <li><Link to="/payment-terms">Payment Terms & Conditions</Link></li>
                            <li><Link to="/gift-card-terms">Gift Cards Terms & Conditions</Link></li>
                            <li><Link to="/shipping-policy">Shipping & Return Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="footer-col">
                        <h4>QUICK LINKS</h4>
                        <ul>
                            <li><Link to="/create-return">Create Return</Link></li>
                            <li><Link to="/stores">Our Stores</Link></li>
                            <li><Link to="/gift-card">Gift Card</Link></li>
                            <li><Link to="/track-return">Track Return</Link></li>
                            <li><Link to="/faqs">FAQs</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/loyalty-terms">Loyalty Points T&C</Link></li>
                            <li><Link to="/sbi-offers">SBI Offer T&C</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & App */}
                    <div className="footer-col newsletter-col">
                        <h4>SUBSCRIBE OUR NEWSLETTER</h4>
                        <div className="newsletter-box">
                            <input type="email" placeholder="Your e-mail" />
                            <button aria-label="Subscribe">→</button>
                        </div>
                        <p className="newsletter-note">You can unsubscribe at any time, no hard feelings</p>

                    </div>
                </div>

                <div className="footer-social-section">
                    <h4>FOLLOW US</h4>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>All rights reserved © Elite Youth {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
