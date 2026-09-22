import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="ft-site-footer">
      <div className="ft-shell">
        <div className="ft-footer-lead">
          <div className="ft-footer-brand">
            <Link
              className="ft-wordmark ft-wordmark--footer"
              to="/"
              rel="home"
            >
              <span className="ft-wordmark__mark" aria-hidden="true">
                <svg viewBox="0 0 42 42">
                  <path d="M7 8.5h28v7H15v5h17v7H15v6H7z" />
                  <path
                    className="ft-wordmark__spark"
                    d="M29 4l2.2 4.8L36 11l-4.8 2.2L29 18l-2.2-4.8L22 11l4.8-2.2z"
                  />
                </svg>
              </span>
              <span className="ft-wordmark__text">
                <span>Bridget</span><strong>Kelly</strong>
              </span>
            </Link>
            <p>
              Curated fashion, modern tech, and elevated lifestyle inspiration.
            </p>
          </div>
          <Link className="ft-footer-cta" to="/shop">
            <span>Discover the collection</span>
            <strong>
              Shop the Edit <span aria-hidden="true">→</span>
            </strong>
          </Link>
        </div>
        <div className="ft-footer-grid">
          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link to="/fashion">Women's Fashion</Link></li>
              <li><Link to="/fashion">Men's Fashion</Link></li>
              <li><Link to="/fashion">Accessories</Link></li>
              <li><Link to="/shop">Tech Essentials</Link></li>
            </ul>
          </div>
          <div>
            <h2>Shop</h2>
            <ul>
              <li><Link to="/shop">All products</Link></li>
              <li><Link to="/deals">The Edit</Link></li>
              <li><Link to="/cart">View cart</Link></li>
            </ul>
          </div>
          <div>
            <h2>Bridget Kelly</h2>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy policy</Link></li>
              <li>
                <Link to="/terms-and-conditions">Terms &amp; conditions</Link>
              </li>
              <li>
                <Link to="/affiliate-disclosure">Affiliate disclosure</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="ft-footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Bridget Kelly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
