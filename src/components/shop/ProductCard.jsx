import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import LazyImage from '../ui/LazyImage';

export default function ProductCard({ product, priority = false }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();

  const href = `/shop/${product.slug}`;
  const img = product.primaryImage;
  const title = product.name;
  const price = product.priceHtml;
  const badge = product.badge;
  const rating = product.rating;
  const wishlisted = isWishlisted(product.id);

  const starPercent = rating ? `${(rating / 5) * 100}%` : '0%';

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    if (!wishlisted) {
      addToast(`${title} saved to wishlist`, 'wishlist');
    } else {
      addToast(`${title} removed from wishlist`, 'success');
    }
  };

  return (
    <li className="product type-product post status-publish">
      {badge && <span className="onsale">{badge}</span>}

      <Link
        to={href}
        className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
      >
        <LazyImage
          src={img}
          alt={title}
          width={250}
          height={250}
          priority={priority}
          objectFit="cover"
          style={{ borderRadius: '4px', width: '100%', aspectRatio: '4/3' }}
        />
        <div className="total-product-title-wrap">
          <h2 className="woocommerce-loop-product__title">{title}</h2>
        </div>
      </Link>

      {rating !== undefined && (
        <Link to={`${href}#respond`}>
          <div className="star-rating ehi-star-rating">
            <span style={{ width: starPercent }}></span>
          </div>
          <span style={{ fontSize: '0.857em' }}>
            <em><strong>Rate this product:</strong></em>
          </span>
        </Link>
      )}

      {price && (
        <span
          className="price"
          dangerouslySetInnerHTML={{ __html: price }}
        />
      )}

      <button
        onClick={handleWishlist}
        className="button product_type_simple add_to_cart_button"
        aria-label={wishlisted ? `Remove "${title}" from wishlist` : `Save "${title}" to wishlist`}
        style={{ cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
      >
        <span style={{ fontSize: '1rem' }}>{wishlisted ? '♥' : '♡'}</span>
        {wishlisted ? 'Saved' : 'Save to Wishlist'}
      </button>
    </li>
  );
}
