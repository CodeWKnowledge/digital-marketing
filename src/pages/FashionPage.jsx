import products from '../data/products.json';
import ProductCard from '../components/shop/ProductCard';

const fashionProducts = products.filter((p) => p.category === 'Fashion');

const STYLE_CATEGORIES = ['All', "Women's Apparel", "Men's Apparel"];

import { useState } from 'react';

export default function FashionPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? fashionProducts
    : fashionProducts.filter((p) => p.subcategory === active);

  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page" style={{ background: '#111827' }}>
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>The Style Edit
          </p>
          <h1>Effortless Aesthetics</h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '480px', marginTop: '0.5rem', lineHeight: 1.6 }}>
            A meticulously curated collection of womenswear, menswear, and modern lifestyle essentials.
          </p>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="shop-filters" style={{ marginBottom: '2rem' }}>
          <ul className="shop-filters__category-list">
            {STYLE_CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  className={active === cat ? 'active' : ''}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <span style={{ fontSize: '0.85rem', color: '#667085' }}>{filtered.length} items</span>
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#667085', textAlign: 'center', padding: '3rem 0' }}>No items found in this category.</p>
        ) : (
          <ul className="products columns-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
