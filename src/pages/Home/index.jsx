import { Link } from 'react-router-dom';
import products from '../../data/products.json';
import ProductCard from '../../components/shop/ProductCard';

// Helper: pick first product image for a given filter, or null (never empty string)
const img = (pred) => products.find(pred)?.primaryImage ?? null;

const CATEGORIES = [
  {
    href: '/shop',
    img: img((p) => p.category === 'Photography'),
    alt: 'Photography equipment',
    index: '01',
    title: 'Photography',
    subtitle: 'Cameras, gimbals and accessories',
  },
  {
    href: '/shop',
    img: img((p) => p.category === 'Tech & Gadgets'),
    alt: 'Tech gadgets and drones',
    index: '02',
    title: 'Tech & Gadgets',
    subtitle: 'Drones, and cutting-edge devices',
  },
  {
    href: '/shop',
    img: img((p) => p.category === 'Jewelry'),
    alt: 'Luxury jewelry and watches',
    index: '03',
    title: 'Jewelry & Watches',
    subtitle: 'Luxury and fashion jewellery',
  },
  {
    href: '/fashion',
    img: img((p) => p.subcategory === "Women's Apparel"),
    alt: 'Women fashion apparel',
    index: '04',
    title: "Women's Fashion",
    subtitle: 'Dresses, sets and statement pieces',
  },
  {
    href: '/fashion',
    img: img((p) => p.subcategory === "Men's Apparel") ?? img((p) => p.category === 'Fashion'),
    alt: 'Men fashion apparel',
    index: '05',
    title: "Men's Style",
    subtitle: 'Smart casual and streetwear picks',
  },
  {
    href: '/deals',
    img: img((p) => p.badge === 'Best Seller') ?? img((p) => p.category === 'Tech & Gadgets'),
    alt: 'Best seller deals',
    index: '06',
    title: 'Deals & Offers',
    subtitle: 'Best sellers and limited-time offers',
  },
];

const TRENDING = [
  { href: '/2026/09/dji-neo-3-leak', label: 'DJI Neo 3 Leak Shows Retail Packaging and a Pocket-Size RC Mini' },
  { href: '/2026/09/vivo-v80-launch-india', label: 'Vivo V80 Officially Teased in India as Model V2648 Clears Regulators' },
  { href: '/2026/09/fire-tv-sideloading-fix', label: 'Amazon Says Fire TV Sideloading Will Return After Update Bug' },
  { href: '/2026/09/googlebook-preorder', label: 'Googlebook Preorders Begin September 21: Brands, Features and What\'s Still Unknown' },
];

const SPOTLIGHT_LEAD = {
  href: '/2026/09/dji-neo-3-leak',
  img: 'https://freditech.com/wp-content/uploads/2026/09/feature-6-1200x750.webp',
  alt: 'Compact guarded mini drone with a small built-in-screen controller',
  category: 'Drones & Leaks',
  categoryHref: '/category/cameras/drones-leaks',
  title: 'DJI Neo 3 Leak Shows Retail Packaging and a Pocket-Size RC Mini',
  excerpt: 'DJI has not announced a DJI Neo 3, but a September 15 packaging leak attributed to established DJI leaker Igor Bogdanov is the strongest evidence yet that a…',
  date: 'Sep 15, 2026',
  readTime: '13 min read',
  datetime: '2026-09-15T23:51:05+00:00',
};

const SPOTLIGHT_CARDS = [
  {
    href: '/2026/09/vivo-v80-launch-india',
    img: 'https://freditech.com/wp-content/uploads/2026/09/feature-5-720x450.webp',
    alt: 'Orange Vivo V80 style smartphone with ZEISS-branded triple rear cameras',
    category: 'Launch Previews',
    categoryHref: '/category/smartphones/launch-previews',
    title: 'Vivo V80 Officially Teased in India as Model V2648 Clears Regulators',
    date: 'Sep 15, 2026',
    readTime: '13 min read',
    datetime: '2026-09-15T23:51:02+00:00',
  },
  {
    href: '/2026/09/fire-tv-sideloading-fix',
    img: 'https://freditech.com/wp-content/uploads/2026/09/feature-7-720x450.webp',
    alt: 'Amazon Fire TV stick and remote in front of a television settings screen',
    category: 'Software Updates',
    categoryHref: '/category/smart-home-streaming/software-updates-smart-home-streaming',
    title: 'Amazon Says Fire TV Sideloading Will Return After Update Bug',
    date: 'Sep 14, 2026',
    readTime: '6 min read',
    datetime: '2026-09-14T00:00:00+00:00',
  },
  {
    href: '/2026/09/googlebook-preorder',
    img: 'https://freditech.com/wp-content/uploads/2026/09/feature-8-720x450.webp',
    alt: 'Person holding a thin laptop-style device',
    category: 'Launch Previews',
    categoryHref: '/category/laptops-computers/launch-previews-laptops-computers',
    title: 'Googlebook Preorders Begin September 21',
    date: 'Sep 14, 2026',
    readTime: '9 min read',
    datetime: '2026-09-14T00:00:00+00:00',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="ft-hero" aria-labelledby="ft-hero-title">
        <img
          className="ft-hero__image"
          src="/wp-content/themes/freditech-modern-child/assets/images/freditech-hero.webp"
          alt=""
          width="1600"
          height="900"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="ft-hero__wash" aria-hidden="true"></div>
        <div className="ft-shell ft-hero__inner">
          <div className="ft-hero__copy">
            <p className="ft-eyebrow">
              <span aria-hidden="true"></span>Elevate Your Everyday
            </p>
            <h1 id="ft-hero-title">Curated style. Modern living.</h1>
            <p className="ft-hero__lede">
              Discover our handpicked collection of premium technology, effortless fashion, 
              and lifestyle essentials designed for the modern aesthetic.
            </p>
            <div className="ft-button-row">
              <Link className="ft-button ft-button--primary" to="/category/reviews">
                Explore latest reviews <span aria-hidden="true">→</span>
              </Link>
              <Link className="ft-button ft-button--ghost" to="/shop">
                Shop tech picks
              </Link>
            </div>
            <div className="ft-hero__proof" aria-label="What Bridget Kelly covers">
              <span><strong>Style</strong>Timeless pieces</span>
              <span><strong>Tech</strong>Modern essentials</span>
              <span><strong>Living</strong>Curated spaces</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending bar */}
      <section className="ft-trending" aria-label="Trending stories">
        <div className="ft-shell ft-trending__inner">
          <p className="ft-trending__label">
            <span aria-hidden="true">↗</span>Trending
          </p>
          <div className="ft-trending__rail">
            {TRENDING.map((item) => (
              <Link key={item.href} to={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="ft-section ft-category-section" aria-labelledby="ft-category-title">
        <div className="ft-shell">
          <div className="ft-section-heading">
            <div>
              <p className="ft-section-heading__kicker">Discover the collection</p>
              <h2 id="ft-category-title">Explore Bridget Kelly</h2>
            </div>
            <p>Start with the aesthetics—or the technology—that matters most to you.</p>
          </div>
          <div className="ft-category-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.index} className="ft-category-card" to={cat.href}>
                {cat.img && (
                  <img
                    src={cat.img}
                    alt={cat.alt}
                    width="900"
                    height="650"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span className="ft-category-card__shade" aria-hidden="true"></span>
                <span className="ft-category-card__index">{cat.index}</span>
                <span className="ft-category-card__content">
                  <strong>{cat.title}</strong>
                  <small>{cat.subtitle}</small>
                </span>
                <span className="ft-category-card__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's spotlight */}
      <section className="ft-section ft-spotlight" aria-labelledby="ft-spotlight-title">
        <div className="ft-shell">
          <div className="ft-section-heading ft-section-heading--line">
            <div>
              <p className="ft-section-heading__kicker">Worth your attention</p>
              <h2 id="ft-spotlight-title">Editor&apos;s spotlight</h2>
            </div>
            <Link className="ft-text-link" to="/category/reviews">
              All reviews <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="ft-spotlight-grid">
            {/* Lead story */}
            <article className="ft-lead-story">
              <Link className="ft-lead-story__media" to={SPOTLIGHT_LEAD.href}>
                <img
                  src={SPOTLIGHT_LEAD.img}
                  alt={SPOTLIGHT_LEAD.alt}
                  width="1200"
                  height="750"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div className="ft-lead-story__body">
                <Link className="ft-kicker" to={SPOTLIGHT_LEAD.categoryHref}>
                  {SPOTLIGHT_LEAD.category}
                </Link>
                <h3>
                  <Link to={SPOTLIGHT_LEAD.href}>{SPOTLIGHT_LEAD.title}</Link>
                </h3>
                <p>{SPOTLIGHT_LEAD.excerpt}</p>
                <div className="ft-post-meta">
                  <time dateTime={SPOTLIGHT_LEAD.datetime}>{SPOTLIGHT_LEAD.date}</time>
                  <span aria-hidden="true">•</span>
                  <span>{SPOTLIGHT_LEAD.readTime}</span>
                </div>
              </div>
            </article>
            {/* Compact cards */}
            <div className="ft-spotlight-list">
              {SPOTLIGHT_CARDS.map((card) => (
                <article key={card.href} className="ft-post-card ft-post-card--compact">
                  <Link
                    className="ft-post-card__media"
                    to={card.href}
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <img
                      src={card.img}
                      alt={card.alt}
                      width="720"
                      height="450"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                  <div className="ft-post-card__body">
                    <Link className="ft-kicker" to={card.categoryHref}>
                      {card.category}
                    </Link>
                    <h3 className="ft-post-card__title">
                      <Link to={card.href}>{card.title}</Link>
                    </h3>
                    <div className="ft-post-meta">
                      <time dateTime={card.datetime}>{card.date}</time>
                      <span aria-hidden="true">•</span>
                      <span>{card.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="ft-featured-products ft-section" aria-labelledby="ft-featured-title">
        <div className="ft-shell">
          <div className="ft-section-heading ft-section-heading--line">
            <div>
              <p className="ft-section-heading__kicker">Available now</p>
              <h2 id="ft-featured-title">Featured Products</h2>
            </div>
            <Link className="ft-text-link" to="/shop">
              View all products <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="products columns-4">
            {products.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
