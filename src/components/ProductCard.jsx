import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart, formatPrice } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const isWishlisted = isInWishlist(product._id);

    // Handle price being a number from backend or string from mock
    const priceValue = typeof product.price === 'number' ? product.price : parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

    // Create mock discount if not present
    const originalPrice = product.originalPrice || priceValue * 1.5;
    const discount = Math.round(((originalPrice - priceValue) / originalPrice) * 100);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 'M');
        // In a real app, this would trigger a mini-cart or toast
    };

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <Link to={`/product/${product._id}`} className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} className="main-img" />

                <button
                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={handleWishlistClick}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                <div className="card-overlays">
                    {discount > 0 && <span className="discount-badge">-{discount}%</span>}
                </div>

                <button
                    className="quick-add-btn"
                    onClick={handleAddToCart}
                >
                    <ShoppingBag size={16} /> Quick Add
                </button>
            </div>

            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-category">{product.category?.name || product.category || 'Category'}</p>
                <div className="product-price-row">
                    <span className="current-price">₹{priceValue.toFixed(2)}</span>
                    <span className="original-price">₹{originalPrice.toFixed(2)}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
