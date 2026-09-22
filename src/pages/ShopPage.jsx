import { useState, useMemo } from 'react';
import products from '../data/products.json';
import ProductCard from '../components/shop/ProductCard';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = activeCategory === 'All'
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

    if (sortBy === 'price-asc') list.sort((a, b) => a.priceVal - b.priceVal);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.priceVal - a.priceVal);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, sortBy]);

  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page">
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>Store
          </p>
          <h1>Shop All Products</h1>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Filter bar */}
        <div className="shop-filters">
          <ul className="shop-filters__category-list">
            {ALL_CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  className={activeCategory === cat ? 'active' : ''}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="shop-sort" style={{ fontSize: '0.85rem', color: '#667085', fontWeight: 500 }}>Sort by:</label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #d1d9e6', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <p style={{ color: '#667085', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Showing {filtered.length} products
        </p>

        <ul className="products columns-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </main>
  );
}
