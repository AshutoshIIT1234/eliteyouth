import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import '../styles/ProductDetail.css';



const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('');
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;
    if (error) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
    if (!product) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Product not found</div>;

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addToCart(product, selectedSize);
        alert('Added to cart successfully!');
    };

    return (
        <div className="product-detail-page container">
            <div className="product-layout">
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    {/* Thumbnails would go here */}
                </div>

                <div className="product-info-panel">
                    <span className="category-tag">{product.category?.name || product.category || 'Category'}</span>
                    <h1>{product.name}</h1>
                    <div className="price-rating">
                        <span className="price-large">₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
                        <div className="rating">
                            <Star size={16} fill="gold" stroke="none" />
                            <Star size={16} fill="gold" stroke="none" />
                            <Star size={16} fill="gold" stroke="none" />
                            <Star size={16} fill="gold" stroke="none" />
                            <Star size={16} fill="gold" stroke="none" />
                            <span>(24 Reviews)</span>
                        </div>
                    </div>

                    <p className="description">{product.description}</p>

                    <div className="size-selector">
                        <h3>Select Size</h3>
                        <div className="size-options">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-primary btn-block add-cart-btn" onClick={handleAddToCart}>
                        Add to shopping bag <ArrowRight size={20} />
                    </button>

                    <div className="trust-badges">
                        <div className="badge-item">
                            <Truck size={20} />
                            <span>Free Shipping on orders over ₹1000</span>
                        </div>
                        <div className="badge-item">
                            <ShieldCheck size={20} />
                            <span>Secure Payment & Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
