import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import '../styles/Shop.css'; // Using Shop styles for grid

const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="shop-page container" style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <Reveal>
                <div className="section-header-center">
                    <h2 className="section-title">My Wishlist</h2>
                    <p className="section-subtitle">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
                </div>
            </Reveal>

            {wishlist.length === 0 ? (
                <div className="empty-cart-state" style={{ textAlign: 'center', padding: '50px 0' }}>
                    <h3>Your wishlist is empty</h3>
                    <p style={{ marginBottom: '20px', color: 'var(--color-text-light)' }}>
                        Save items you love to revisit later by clicking the heart icon.
                    </p>
                    <Link to="/category/men" className="btn btn-primary">Start Shopping</Link>
                </div>
            ) : (
                <div className="products-grid">
                    {wishlist.map((product) => (
                        <Reveal key={product._id} effect="fade-up">
                            <ProductCard product={product} />
                        </Reveal>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
