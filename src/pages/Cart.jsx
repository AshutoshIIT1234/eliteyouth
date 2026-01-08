import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, formatPrice } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty container">
                <h2>Your Shopping Bag is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1>Shopping Bag ({cartItems.length})</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="cart-item-details">
                                <div className="cart-item-header">
                                    <h3>{item.name}</h3>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <p className="cart-item-meta">
                                    Size: {item.selectedSize} | Category: {typeof item.category === 'object' ? item.category.name : item.category}
                                </p>
                                <p className="cart-item-price">{formatPrice(item.price)}</p>

                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Link to="/shop" className="continue-shopping">
                        <ArrowLeft size={16} /> Continue Shopping
                    </Link>
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="summary-total">
                        <span>Total</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>

                    <Link to="/checkout" className="btn btn-primary btn-block checkout-btn">
                        Proceed to Checkout <ArrowRight size={18} />
                    </Link>

                    <div className="secure-checkout">
                        <p>Secure Checkout - 128-bit SSL Encryption</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
