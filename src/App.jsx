import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import ComingSoon from './pages/ComingSoon';
import About from './pages/About';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CategoryList from './pages/Admin/CategoryList';
import ProductList from './pages/Admin/ProductList';
import AddProduct from './pages/Admin/AddProduct';
import AdminLogin from './pages/Admin/AdminLogin';
import {
  Contact, Blog, Terms, PaymentTerms, GiftCardTerms, ShippingPolicy,
  CreateReturn, GiftCard, TrackReturn, FAQ, PrivacyPolicy, LoyaltyTerms, SBIOffers
} from './pages/FooterPages';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public Routes with Header and Footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:category" element={<Shop />} />
                <Route path="/category/:category/:subcategory" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/stores" element={<ComingSoon />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/payment-terms" element={<PaymentTerms />} />
                <Route path="/gift-card-terms" element={<GiftCardTerms />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/create-return" element={<CreateReturn />} />
                <Route path="/gift-card" element={<GiftCard />} />
                <Route path="/track-return" element={<TrackReturn />} />
                <Route path="/faqs" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/loyalty-terms" element={<LoyaltyTerms />} />
                <Route path="/sbi-offers" element={<SBIOffers />} />
                <Route path="/admin/login" element={<AdminLogin />} />
              </Route>

              {/* Admin Routes without Header and Footer */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/categories" element={<CategoryList />} />
                <Route path="/admin/products" element={<ProductList />} />
                <Route path="/admin/product/add" element={<AddProduct />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}

export default App
