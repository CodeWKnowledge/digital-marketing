import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/fashion', label: 'Fashion' },
  { to: '/deals', label: 'The Edit' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const { wishlistCount } = useWishlist();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('ft-menu-open', menuOpen);
    return () => document.body.classList.remove('ft-menu-open');
  }, [menuOpen]);

  return (
    <header className="ft-site-header" data-ft-header="">
      {/* Top bar */}
      <div className="ft-topbar">
        <div className="ft-shell ft-topbar__inner">
          <p className="ft-topbar__promise">
            <span className="ft-live-dot" aria-hidden="true"></span>
            Curated fashion &bull; Modern tech &bull; Elevated lifestyle
          </p>
          <nav className="ft-utility-nav" aria-label="Utility navigation">
            <ul className="ft-utility-menu">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main header bar */}
      <div className="ft-header-main">
        <div className="ft-shell ft-header-main__inner">

          {/* Brand / Logo */}
          <div className="ft-brand">
            <Link
              className="ft-wordmark"
              to="/"
              rel="home"
              aria-label="Bridget Kelly"
            >
              <span className="ft-wordmark__mark" aria-hidden="true">
                <svg viewBox="0 0 42 42" role="img">
                  <path d="M7 8.5h28v7H15v5h17v7H15v6H7z" />
                  <path
                    className="ft-wordmark__spark"
                    d="M29 4l2.2 4.8L36 11l-4.8 2.2L29 18l-2.2-4.8L22 11l4.8-2.2z"
                  />
                </svg>
              </span>
              <span className="ft-wordmark__text">
                <span>Bridget</span><strong> Kelly</strong>
              </span>
            </Link>
            <span className="ft-brand__edition">Modern Collective</span>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="ft-menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="ft-site-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="ft-menu-toggle__bars" aria-hidden="true">
              <span></span><span></span><span></span>
            </span>
            <span className="ft-menu-toggle__label">{menuOpen ? 'Close' : 'Menu'}</span>
          </button>

          {/* Primary nav */}
          <nav
            id="ft-site-navigation"
            ref={menuRef}
            className={`ft-primary-nav${menuOpen ? ' ft-primary-nav--open' : ''}`}
            aria-label="Primary navigation"
          >
            <ul id="primary-menu" className="ft-primary-menu">
              {NAV_LINKS.map(({ to, label }) => {
                const isCurrent = location.pathname === to;
                return (
                  <li
                    key={to}
                    className={`menu-item${isCurrent ? ' current-menu-item current_page_item' : ''}`}
                  >
                    <Link to={to} aria-current={isCurrent ? 'page' : undefined}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header actions — wishlist */}
          <div className="ft-header-actions">
            <Link className="ft-cart-link" to="/wishlist" aria-label="View wishlist">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="ft-cart-count" aria-label={`${wishlistCount} items in wishlist`}>{wishlistCount}</span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
