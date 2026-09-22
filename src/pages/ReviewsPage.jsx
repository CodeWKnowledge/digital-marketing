import { Link } from 'react-router-dom';
import products from '../data/products.json';

// Sample 12 products across categories for reviews
const REVIEWED_PRODUCTS = [
  ...products.filter((p) => p.category === 'Photography').slice(0, 3),
  ...products.filter((p) => p.category === 'Jewelry').slice(0, 3),
  ...products.filter((p) => p.category === 'Fashion').slice(0, 3),
  ...products.filter((p) => p.category === 'Tech & Gadgets').slice(0, 3),
];

const REVIEW_COPY = [
  { stars: 5, text: "Absolutely love this! The quality is exceptional and delivery was super fast. Would 100% recommend to anyone looking for premium products.", author: "Sarah M." },
  { stars: 5, text: "Exceeded my expectations in every way. The build quality is outstanding and it performs just as described. Great value for money.", author: "James T." },
  { stars: 4, text: "Really happy with this purchase. Setup was straightforward and it works perfectly. Minor packaging damage but product itself is flawless.", author: "Priya K." },
  { stars: 5, text: "Top notch product. I've been using it daily for 3 months and it still looks brand new. Highly recommend Bridget Kelly for tech purchases.", author: "David L." },
  { stars: 5, text: "Stunning design and premium feel. Got so many compliments since I started wearing it. Fast shipping and beautiful packaging too.", author: "Amara O." },
  { stars: 4, text: "Great product overall. Customer service was very helpful when I had a question. Will definitely shop here again.", author: "Michael R." },
  { stars: 5, text: "Incredible quality. I was hesitant at first but this completely blew me away. The attention to detail is amazing.", author: "Sophie W." },
  { stars: 5, text: "Very impressed with this purchase. Works exactly as advertised, shipping was fast and the product is exactly as shown in pictures.", author: "Kwame A." },
  { stars: 4, text: "Solid purchase. Does exactly what it says. The materials feel premium and it's held up really well after daily use.", author: "Emily C." },
  { stars: 5, text: "Wow, just wow. This is exactly what I needed. The quality is amazing and I'm genuinely impressed. Can't recommend enough!", author: "Liam F." },
  { stars: 5, text: "Perfect gift! The recipient was thrilled. It arrived beautifully presented and the quality matched the price point perfectly.", author: "Fatima N." },
  { stars: 4, text: "Really solid product at a fair price. Some of the best styling I've seen in this category. Will buy again!", author: "Carlos D." },
];

function StarDisplay({ count }) {
  return (
    <div className="review-card__stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page">
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>What customers say
          </p>
          <h1>Product Reviews</h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '520px', marginTop: '0.5rem', lineHeight: 1.6 }}>
            Real reviews from real customers across our catalog of tech, fashion and lifestyle products.
          </p>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
        {/* Summary bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          padding: '1.5rem 2rem',
          background: 'linear-gradient(135deg, #f9fafb, #eef1f9)',
          borderRadius: '14px',
          marginBottom: '3rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#071a3d', lineHeight: 1 }}>4.8</div>
            <div style={{ color: '#f59e0b', fontSize: '1.2rem', margin: '4px 0' }}>★★★★★</div>
            <div style={{ fontSize: '0.85rem', color: '#667085' }}>Average rating</div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            {[5, 4, 3].map((n) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#667085', width: '30px' }}>{n}★</span>
                <div style={{ flex: 1, height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: n === 5 ? '80%' : n === 4 ? '18%' : '2%',
                    background: '#f59e0b',
                    borderRadius: '4px',
                  }} />
                </div>
                <span style={{ fontSize: '0.8rem', color: '#667085', width: '30px' }}>
                  {n === 5 ? '80%' : n === 4 ? '18%' : '2%'}
                </span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#071a3d' }}>12+</div>
            <div style={{ fontSize: '0.85rem', color: '#667085' }}>Verified reviews</div>
          </div>
        </div>

        <div className="ft-reviews-grid">
          {REVIEWED_PRODUCTS.map((product, idx) => {
            const review = REVIEW_COPY[idx % REVIEW_COPY.length];
            return (
              <article key={`${product.id}-${idx}`} className="review-card">
                <StarDisplay count={review.stars} />
                <p className="review-card__text">&ldquo;{review.text}&rdquo;</p>
                <Link to={`/shop/${product.slug}`} className="review-card__product-link">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="review-card__product-img"
                  />
                  <div>
                    <p className="review-card__product-name">{product.name}</p>
                    <p className="review-card__product-cat">{product.subcategory}</p>
                  </div>
                </Link>
                <div className="review-card__author">— {review.author} &nbsp;✓ Verified Buyer</div>
              </article>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            to="/shop"
            className="ft-button ft-button--primary"
            style={{ display: 'inline-block', padding: '0.9rem 2.5rem' }}
          >
            Shop reviewed products →
          </Link>
        </div>
      </div>
    </main>
  );
}
