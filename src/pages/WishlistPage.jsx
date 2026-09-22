import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page" style={{ background: '#111827' }}>
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true">♡</span>&nbsp;Your Wishlist
          </p>
          <h1>Saved Items</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.4rem' }}>
            {wishlist.length === 0
              ? 'Your wishlist is empty.'
              : `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} saved`}
          </p>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.3 }}>♡</div>
            <h2 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#111827' }}>Nothing saved yet</h2>
            <p style={{ color: '#667085', marginBottom: '2rem' }}>
              Browse the shop and tap the heart icon to save items here.
            </p>
            <Link
              to="/shop"
              style={{
                display: 'inline-block',
                padding: '12px 28px',
                background: '#111827',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                letterSpacing: '0.03em',
              }}
            >
              Explore the Shop
            </Link>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.75rem',
                marginBottom: '3rem',
              }}
            >
              {wishlist.map((item) => (
                <article
                  key={item.id}
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <Link to={`/shop/${item.slug}`} style={{ display: 'block', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </Link>
                  <div style={{ padding: '1rem 1.1rem 1.2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af' }}>
                      {item.category}
                    </span>
                    <Link
                      to={`/shop/${item.slug}`}
                      style={{ fontWeight: 600, color: '#111827', textDecoration: 'none', fontSize: '0.95rem', lineHeight: 1.4 }}
                    >
                      {item.name}
                    </Link>
                    <p
                      style={{ color: '#1d4ed8', fontWeight: 700, fontSize: '1rem', marginTop: 'auto', paddingTop: '0.5rem' }}
                      dangerouslySetInnerHTML={{ __html: item.priceHtml }}
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label={`Remove ${item.name} from wishlist`}
                      style={{
                        marginTop: '0.5rem',
                        padding: '9px',
                        background: 'transparent',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        color: '#6b7280',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, color 0.2s',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280'; }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <Link
                to="/shop"
                style={{ color: '#111827', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.02em' }}
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearWishlist}
                style={{
                  padding: '10px 22px',
                  background: 'transparent',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  color: '#6b7280',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Clear Wishlist
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
