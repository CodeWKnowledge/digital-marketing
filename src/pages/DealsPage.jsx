import products from '../data/products.json';
import ProductCard from '../components/shop/ProductCard';

// Pick "deals" products: badge === 'Best Seller' OR randomized discount subset
// We'll seed a deterministic discount selection based on product id
const dealsProducts = products.filter((p, idx) => {
  return p.badge === 'Best Seller' || idx % 4 === 0;
}).slice(0, 24);

export default function DealsPage() {
  return (
    <main id="primary-content" className="ft-page-main">
      {/* Deals hero banner */}
      <div className="ft-deals-banner">
        <div className="ft-shell">
          <span className="ft-deal-tag">Limited Time</span>
          <h2>The Curated Edit &amp; Offers</h2>
          <p>Hand-picked seasonal discounts across tech, timeless fashion, and home essentials. Updated daily.</p>
        </div>
      </div>

      <div className="ft-shell ft-page-wrap" style={{ paddingBottom: '4rem' }}>
        {/* Category quick-links */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {['All Deals', 'Photography', 'Fashion', 'Jewelry', 'Tech & Gadgets'].map((label) => (
            <span key={label} style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '4px',
              background: 'transparent',
              border: '1px solid #d1d9e6',
              color: '#111827',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              {label}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#0f1f40' }}>Today&apos;s Picks</h2>
          <span style={{ fontSize: '0.85rem', color: '#667085' }}>{dealsProducts.length} deals available</span>
        </div>

        <ul className="products columns-4">
          {dealsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </main>
  );
}
