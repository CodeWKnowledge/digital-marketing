import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import LegalPage from './pages/LegalPage';
import BlogPage from './pages/BlogPage';
import ShopPage from './pages/ShopPage';
import WishlistPage from './pages/WishlistPage';
import CategoryPage from './pages/CategoryPage';
import PostPage from './pages/PostPage';
import ProductPage from './pages/ProductPage';
import FashionPage from './pages/FashionPage';
import DealsPage from './pages/DealsPage';
import ReviewsPage from './pages/ReviewsPage';
import NotFoundPage from './pages/NotFoundPage';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import './App.css';

/* ─── Placeholder page helper ─────────────────────────────────────────────── */
function PlaceholderPage({ title, note }) {
  return (
    <main id="primary-content" className="ft-page-main">
      <div className="ft-shell ft-page-wrap" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h1>{title}</h1>
        <p style={{ color: '#667085', marginTop: '0.5rem' }}>{note}</p>
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      {/* Body-level class names mirror the original WordPress page classes for CSS compatibility */}
      <div className="wp-embed-responsive wp-theme-luxury-interior-pro wp-child-theme-freditech-modern-child theme-luxury-interior-pro freditech-modern freditech-has-shop ht_right_sidebar sticky-header columns-3">
        <ToastProvider>
        <WishlistProvider>
          <a className="ft-skip-link" href="#primary-content">Skip to content</a>

          <Header />

          <Routes>
            {/* ── Primary pages ── */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* ── Planned pages (Phase 8 — data extraction) ── */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/page/:page" element={<PlaceholderPage title="My Blog" note="Blog pagination — Phase 8 migration in progress." />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/fashion" element={<FashionPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/my-account" element={<PlaceholderPage title="My Account" note="Account page — requires e-commerce backend integration." />} />
            <Route path="/advertise" element={<PlaceholderPage title="Advertise" note="Advertise page coming soon." />} />

            {/* ── Static legal pages ── */}
            <Route path="/privacy-policy" element={<LegalPage pageId="privacy-policy" />} />
            <Route path="/terms-and-conditions" element={<LegalPage pageId="terms-and-conditions" />} />
            <Route path="/affiliate-disclosure" element={<LegalPage pageId="affiliate-disclosure" />} />
            <Route path="/sitemap" element={<PlaceholderPage title="Sitemap" note="Full sitemap — content migration in progress." />} />

            {/* ── Category / tag archives ── */}
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/category/:parent/:slug" element={<CategoryPage />} />
            <Route path="/tag/:slug" element={<CategoryPage />} />

            {/* ── Blog post routes (year/month/slug) ── */}
            <Route path="/:year/:month/:slug" element={<PostPage />} />

            {/* ── Shop product routes ── */}
            <Route path="/shop/:slug" element={<ProductPage />} />

            {/* ── Fallback / 404 ── */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>

          <Footer />
          <BackToTop />
        </WishlistProvider>
        </ToastProvider>
      </div>
    </Router>
  );
}

export default App;
