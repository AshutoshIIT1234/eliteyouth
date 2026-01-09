import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cart.css'; // Reusing Cart styles for basic layout

const Checkout = () => {
    const { cartItems, cartTotal, formatPrice, cartCount } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!user) {
            alert('Please login to continue');
            navigate('/login');
            return;
        }

        setLoading(true);
        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order on Backend
            const { data: order } = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
                amount: cartTotal,
                currency: 'INR'
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_HERE', // Add to frontend .env too if needed, or get from backend
                amount: order.amount,
                currency: order.currency,
                name: 'Elite Youth',
                description: 'Order Payment',
                image: '/logo.png', // Add your logo path
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // 2. Verify Payment on Backend
                        const verifyData = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyData.data.success) {
                            alert('Payment Successful!');
                            // TODO: Clear Cart, Redirect to Order Success Page
                            navigate('/');
                        } else {
                            alert('Payment Verification Failed!');
                        }
                    } catch (error) {
                        console.error(error);
                        alert('Payment Verification Failed!');
                    }
                },
                prefill: {
                    name: user.firstName + ' ' + user.lastName,
                    email: user.email,
                    contact: '9999999999', // You might want to get this from user profile
                },
                theme: {
                    color: '#000000',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
            alert('Something went wrong during payment initialization.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return <div className="container"><h2>Cart is empty</h2></div>;
    }

    return (
        <div className="checkout-page container" style={{ marginTop: '40px', maxWidth: '800px' }}>
            <h1>Checkout</h1>

            <div className="cart-summary" style={{ marginTop: '20px' }}>
                <h3>Order Summary ({cartCount} items)</h3>
                {cartItems.map(item => (
                    <div key={item.id + item.selectedSize} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                ))}
                <hr />
                <div className="summary-total">
                    <span>Total Amount</span>
                    <span>{formatPrice(cartTotal)}</span>
                </div>

                <button
                    className="btn btn-primary btn-block"
                    onClick={handlePayment}
                    disabled={loading}
                    style={{ marginTop: '20px' }}
                >
                    {loading ? 'Processing...' : 'Pay Now with Razorpay'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
