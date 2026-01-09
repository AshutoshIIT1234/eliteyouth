import { useState } from 'react';
import { Search, ShoppingBag, User, Menu, Heart, MapPin, Truck, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const MEGA_MENU_DATA = {
  men: {
    columns: [
      {
        title: 'Topwear',
        items: ['Shirts', 'T-Shirts', 'Jackets']
      },
      {
        title: 'Jeans',
        items: ['Regular Fit', 'Straight Fit', 'Relax Fit', 'Boot Cut', 'Loose Fit', 'Lowrise', 'Midrise', 'Highrise']
      },
      {
        title: 'Bottomwear',
        items: ['Trousers', 'Trackpants', 'Shorts']
      },
      {
        title: 'Accessories',
        items: ['Belts', 'Wallets', 'Caps', 'Socks', 'Mufflers', 'Ties']
      }
    ],
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop',
    imageTitle: 'New Season'
  },
  winter: {
    columns: [
      {
        title: 'Topwear',
        items: ['Jackets', 'Sweaters', 'Sweatshirts', 'Hoodies', 'Thermals']
      },
      {
        title: 'Bottomwear',
        items: ['Woolen Trousers', 'Heavy Jeans']
      },
      {
        title: 'Accessories',
        items: ['Scarves', 'Gloves', 'Beanies', 'Woolen Socks']
      }
    ],
    image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1965&auto=format&fit=crop',
    imageTitle: 'Winter Edit'
  },
  sale: {
    columns: [
      {
        title: 'Discounts',
        items: ['Flat 50% Off', 'Flat 30% Off', 'Buy 1 Get 1']
      },
      {
        title: 'Categories',
        items: ['T-Shirts Sale', 'Jeans Sale', 'Jackets Sale', 'Shoes Sale']
      },
      {
        title: 'Clearance',
        items: ['Last Sizes', 'Factory Outlet']
      }
    ],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop',
    imageTitle: 'End of Season'
  }
};

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth(); // Use useAuth
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-left">
            <Link to="/brands">Our Brands <ChevronDown size={18} /></Link>
            <Link to="/stores">Our Store <MapPin size={18} /></Link>
          </div>
          <div className="top-right">
            <Link to="/wishlist"><Heart size={18} /> Wishlist</Link>
            {user ? (
              <>
                <Link to="/profile"><User size={18} /> {user.firstName}</Link>
                <button onClick={logout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>Logout</button>
              </>
            ) : (
              <Link to="/login"><User size={18} /> Login/Signup</Link>
            )}
            <Link to="/track-order"><Truck size={18} /> Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container header-content">
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}><Menu size={24} /></button>

          <Link to="/" className="logo">ELITE YOUTH</Link>

          <nav className="desktop-nav">
            {/* Mega Menu Items */}
            {['men', 'winter', 'sale'].map((category) => (
              <div
                key={category}
                className="nav-item"
                onMouseEnter={() => setActiveMenu(category)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link to={`/category/${category}`} className="nav-link">
                  {category.toUpperCase()}
                  <ChevronDown size={14} className="chevron" />
                </Link>

                {/* Mega Menu Dropdown */}
                {activeMenu === category && MEGA_MENU_DATA[category] && (
                  <div className="mega-menu">
                    <div className="container mega-menu-content">
                      <div className="mega-menu-cols">
                        {MEGA_MENU_DATA[category].columns.map((col, idx) => (
                          <div key={idx} className="mega-menu-column">
                            <h4>{col.title}</h4>
                            <ul>
                              {col.items.map((item, i) => (
                                <li key={i}><Link to={`/category/${category}/${item.toLowerCase().replace(' ', '-')}`}>{item}</Link></li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="mega-menu-promo">
                        <img src={MEGA_MENU_DATA[category].image} alt={category} />
                        <div className="promo-overlay">
                          <h3>{MEGA_MENU_DATA[category].imageTitle}</h3>
                          <span className="shop-link">Shop Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search for products..." />
              <Search size={18} className="search-icon" />
            </div>
            {user ? (
              <Link to="/profile" className="icon-btn mobile-only"><User size={22} /></Link>
            ) : (
              <Link to="/login" className="icon-btn mobile-only"><User size={22} /></Link>
            )}
            <Link to="/cart" className="icon-btn">
              <ShoppingBag size={22} />
              <span className="cart-badge">{cartCount}</span>
              <span className="cart-label">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <h3>Menu</h3>
          <button className="close-menu-btn" onClick={toggleMobileMenu}>&times;</button>
        </div>
        <div className="mobile-nav-content">
          {['men', 'winter', 'sale'].map((category) => (
            <div key={category} className="mobile-nav-item">
              <h4 onClick={(e) => {
                // Creating a simple accordion effect
                e.target.nextElementSibling.classList.toggle('open');
                e.target.classList.toggle('active');
              }}>
                {category.toUpperCase()} <ChevronDown size={16} />
              </h4>
              <div className="mobile-sub-menu">
                {MEGA_MENU_DATA[category] && MEGA_MENU_DATA[category].columns.map((col, idx) => (
                  <div key={idx} className="mobile-sub-group">
                    <h5>{col.title}</h5>
                    <ul>
                      {col.items.map((item, i) => (
                        <li key={i}><Link to={`/category/${category}/${item.toLowerCase().replace(' ', '-')}`} onClick={toggleMobileMenu}>{item}</Link></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mobile-nav-utilities" style={{ padding: '0 20px', borderBottom: '1px solid #f0f0f0' }}>
            <Link to="/wishlist" className="mobile-nav-item-link" onClick={toggleMobileMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 0', textDecoration: 'none', color: '#333', borderBottom: '1px solid #f0f0f0' }}>
              <Heart size={18} /> Wishlist
            </Link>
            <Link to="/track-order" className="mobile-nav-item-link" onClick={toggleMobileMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 0', textDecoration: 'none', color: '#333', borderBottom: '1px solid #f0f0f0' }}>
              <Truck size={18} /> Track Order
            </Link>
            <Link to="/stores" className="mobile-nav-item-link" onClick={toggleMobileMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 0', textDecoration: 'none', color: '#333' }}>
              <MapPin size={18} /> Our Stores
            </Link>
          </div>
          <div className="mobile-nav-auth">
            {user ? (
              <button onClick={() => { logout(); toggleMobileMenu(); }} className="btn-mobile-auth">Logout</button>
            ) : (
              <Link to="/login" className="btn-mobile-auth" onClick={toggleMobileMenu}>Login / Signup</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
