import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ChevronDown, ChevronRight, X, SlidersHorizontal, ChevronUp } from 'lucide-react';
import '../styles/Shop.css';

const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className="filter-section">
        <div className="filter-header" onClick={onToggle}>
            <h3>{title}</h3>
            {isOpen ? <span className="toggle-icon">-</span> : <span className="toggle-icon">+</span>}
        </div>
        {isOpen && <div className="filter-content">{children}</div>}
    </div>
);

const Shop = () => {
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mobileStatsOpen, setMobileStatsOpen] = useState(false);
    const [openSections, setOpenSections] = useState({
        price: true,
        size: true,
        color: false,
        fabric: false,
        fit: false
    });

    // ... (state)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();

                if (subcategory) {
                    const subTerm = subcategory.toLowerCase().replace(/-/g, ' ');

                    // 1. Try Strict Category Match
                    let filtered = data.filter(p =>
                        p.category &&
                        (
                            p.category.name.toLowerCase() === subTerm ||
                            p.category.name.toLowerCase().replace(/ /g, '-') === subcategory.toLowerCase()
                        )
                    );

                    // 2. Fallback: Search in Name, Description, or Brand if no category match
                    if (filtered.length === 0) {
                        filtered = data.filter(p =>
                            (p.name && p.name.toLowerCase().includes(subTerm)) ||
                            (p.description && p.description.toLowerCase().includes(subTerm)) ||
                            (p.category && p.category.name.toLowerCase().includes(subTerm)) // Partial category match
                        );
                    }

                    setProducts(filtered);
                } else if (category) {
                    const catLower = category.toLowerCase();

                    // Logic for Parent Categories
                    if (catLower === 'men') {
                        // "Men" is the store default, show all products
                        setProducts(data);
                    } else if (catLower === 'winter') {
                        // Winter aggregation
                        const winterTerms = ['jackets', 'sweaters', 'sweatshirts', 'hoodies', 'thermals', 'woolen', 'scarves', 'gloves', 'beanies'];
                        const filtered = data.filter(p =>
                            p.category && winterTerms.some(term => p.category.name.toLowerCase().includes(term))
                        );
                        setProducts(filtered);
                    } else if (catLower === 'sale') {
                        // Show items in Sale category OR items that might be marked as sale
                        const filtered = data.filter(p =>
                            p.category && p.category.name.toLowerCase() === 'sale'
                        );
                        setProducts(filtered);
                    } else {
                        // Standard strict match for other direct accesses
                        const filtered = data.filter(p =>
                            p.category &&
                            p.category.name.toLowerCase().replace(/ /g, '-') === catLower
                        );
                        setProducts(filtered);
                    }
                } else {
                    setProducts(data);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, subcategory]);

    const formattedCategory = category
        ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
        : 'All Products';

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="shop-page container">
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                <Link to="/">Home</Link>
                <span>/</span>
                <span className="current">{formattedCategory}</span>
            </div>

            <div className="shop-header">
                <h1 className="collection-title">
                    {formattedCategory} <span className="product-count">({products.length} products)</span>
                </h1>

                {loading && <p>Loading products...</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="shop-controls">
                    <div className="mobile-only">
                        <button
                            className="btn btn-outline mobile-filter-btn"
                            onClick={() => setMobileStatsOpen(true)}
                        >
                            <SlidersHorizontal size={16} /> Filter
                        </button>
                    </div>

                    <div className="sort-wrapper">
                        <span className="sort-label">Sort by</span>
                        <select className="sort-select">
                            <option value="featured">Featured</option>
                            <option value="newest">Date, new to old</option>
                            <option value="oldest">Date, old to new</option>
                            <option value="price-low">Price, low to high</option>
                            <option value="price-high">Price, high to low</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="shop-layout">
                {/* Sidebar */}
                <aside className={`shop-sidebar ${mobileStatsOpen ? 'open' : ''}`}>
                    <div className="sidebar-header-mobile">
                        <h2>Filters</h2>
                        <button onClick={() => setMobileStatsOpen(false)}><X size={24} /></button>
                    </div>

                    <FilterSection
                        title="Price"
                        isOpen={openSections.price}
                        onToggle={() => toggleSection('price')}
                    >
                        <div className="price-range">
                            <div className="range-slider">
                                <div className="range-track"></div>
                                {/* Mock Slider Visual */}
                                <div className="range-thumb left" style={{ left: '0%' }}></div>
                                <div className="range-thumb right" style={{ left: '100%' }}></div>
                            </div>
                            <div className="price-inputs">
                                <div className="input-group">
                                    <span>₹</span>
                                    <input type="number" defaultValue="0" />
                                </div>
                                <span className="to">to</span>
                                <div className="input-group">
                                    <span>₹</span>
                                    <input type="number" defaultValue="20000" />
                                </div>
                            </div>
                        </div>
                    </FilterSection>

                    <FilterSection
                        title="Size"
                        isOpen={openSections.size}
                        onToggle={() => toggleSection('size')}
                    >
                        <div className="checkbox-list">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map(size => (
                                <label key={size} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    {size}
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection
                        title="Color"
                        isOpen={openSections.color}
                        onToggle={() => toggleSection('color')}
                    >
                        <div className="checkbox-list">
                            {['Black', 'Blue', 'Beige', 'Brown', 'Green', 'Grey', 'Red', 'White'].map(color => (
                                <label key={color} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    {color}
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection
                        title="Fabric"
                        isOpen={openSections.fabric}
                        onToggle={() => toggleSection('fabric')}
                    >
                        <div className="checkbox-list">
                            {['Cotton', 'Wool', 'Polyester', 'Blended', 'Linen'].map(fabric => (
                                <label key={fabric} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    {fabric}
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection
                        title="Fit"
                        isOpen={openSections.fit}
                        onToggle={() => toggleSection('fit')}
                    >
                        <div className="checkbox-list">
                            {['Regular Fit', 'Slim Fit', 'Relaxed Fit', 'Tailored Fit'].map(fit => (
                                <label key={fit} className="checkbox-item">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    {fit}
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                </aside>

                {/* Product Grid */}
                <main className="product-grid">
                    {!loading && !error && (
                        products.length > 0 ? (
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div className="no-products">
                                <h3>No items found</h3>
                                <p>Try adjusting your search or filters to find what you're looking for.</p>
                            </div>
                        )
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;
