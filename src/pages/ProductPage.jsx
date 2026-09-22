import { useParams, Link } from 'react-router-dom';
import products from '../data/products.json';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import NotFoundPage from './NotFoundPage';

export default function ProductPage() {
  const { slug } = useParams();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <NotFoundPage />;

  const wishlisted = isWishlisted(product.id);

  const handleWishlist = () => {
    toggleWishlist(product);
    if (!isWishlisted(product.id)) {
      addToast(`${product.name} saved to wishlist`, 'wishlist');
    } else {
      addToast(`${product.name} removed from wishlist`, 'success');
    }
  };

  return (
    <main id="primary-content" className="ft-page-main">
      <div className="ft-shell ft-page-wrap" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.85rem', color: '#9ca3af' }}>
          <Link to="/shop" style={{ color: '#6b7280', textDecoration: 'none' }}>Shop</Link>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span style={{ color: '#111827' }}>{product.name}</span>
        </nav>

        <div
          className="product type-product"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}
        >
          {/* Gallery */}
          <div className="woocommerce-product-gallery">
            <figure style={{ margin: 0, borderRadius: '12px', overflow: 'hidden', background: '#f3f4f6' }}>
              <img
                src={product.primaryImage}
                alt={product.name}
                style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }}
              />
            </figure>
          </div>

          {/* Summary */}
          <div className="summary entry-summary">
            {product.badge && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  background: '#1d4ed8',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                {product.badge}
              </span>
            )}

            <h1
              className="product_title entry-title"
              style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: '#111827', fontWeight: 700 }}
            >
              {product.name}
            </h1>

            {product.rating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                <span style={{ color: '#f97316' }}>
                  {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>({product.rating}/5)</span>
              </div>
            )}

            <p
              className="price"
              style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1d4ed8', marginBottom: '1.5rem' }}
              dangerouslySetInnerHTML={{ __html: product.priceHtml }}
            />

            <div
              style={{ marginBottom: '2rem', color: '#475467', lineHeight: 1.7, fontSize: '0.97rem' }}
              dangerouslySetInnerHTML={{ __html: product.fullDescription }}
            />

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: wishlisted ? '#111827' : 'transparent',
                color: wishlisted ? '#fff' : '#111827',
                border: '2px solid #111827',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                transition: 'background 0.2s, color 0.2s',
                letterSpacing: '0.02em',
              }}
              aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            >
              <span style={{ fontSize: '1.2rem' }}>{wishlisted ? '♥' : '♡'}</span>
              {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>

            <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#9ca3af', textAlign: 'center' }}>
              Category: <Link to={`/shop?category=${product.category}`} style={{ color: '#1d4ed8', textDecoration: 'none' }}>{product.category}</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
