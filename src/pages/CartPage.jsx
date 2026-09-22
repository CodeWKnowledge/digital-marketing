import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page">
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>Shopping Cart
          </p>
          <h1>Your Cart</h1>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.2rem', color: '#667085', marginBottom: '2rem' }}>Your cart is currently empty.</p>
            <Link to="/shop" className="button" style={{ padding: '12px 24px', backgroundColor: '#071a3d', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>
              Return to shop
            </Link>
          </div>
        ) : (
          <div className="woocommerce" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
            <div className="cart-items">
              <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #dfe4ea', textAlign: 'left' }}>
                    <th className="product-remove">&nbsp;</th>
                    <th className="product-thumbnail">&nbsp;</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-subtotal">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="woocommerce-cart-form__cart-item cart_item" style={{ borderBottom: '1px solid #dfe4ea' }}>
                      <td className="product-remove" style={{ padding: '1rem 0' }}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="remove"
                          aria-label={`Remove ${item.name} from cart`}
                          style={{ color: '#d9534f', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          &times;
                        </button>
                      </td>
                      <td className="product-thumbnail" style={{ padding: '1rem' }}>
                        <Link to={`/shop/${item.slug}`}>
                          <img src={item.primaryImage} alt={item.name} width="80" style={{ borderRadius: '8px' }} />
                        </Link>
                      </td>
                      <td className="product-name" data-title="Product" style={{ padding: '1rem' }}>
                        <Link to={`/shop/${item.slug}`} style={{ color: '#071a3d', fontWeight: 'bold', textDecoration: 'none' }}>{item.name}</Link>
                      </td>
                      <td className="product-price" data-title="Price" style={{ padding: '1rem' }}>
                        <span className="woocommerce-Price-amount amount">
                          <bdi><span className="woocommerce-Price-currencySymbol">$</span>{item.priceVal.toFixed(2)}</bdi>
                        </span>
                      </td>
                      <td className="product-quantity" data-title="Quantity" style={{ padding: '1rem' }}>
                        <div className="quantity">
                          <input
                            type="number"
                            className="input-text qty text"
                            step="1"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            title="Qty"
                            size="4"
                            style={{ padding: '8px', border: '1px solid #dfe4ea', borderRadius: '4px', width: '60px' }}
                          />
                        </div>
                      </td>
                      <td className="product-subtotal" data-title="Subtotal" style={{ padding: '1rem', fontWeight: 'bold' }}>
                        <span className="woocommerce-Price-amount amount">
                          <bdi><span className="woocommerce-Price-currencySymbol">$</span>{(item.priceVal * item.quantity).toFixed(2)}</bdi>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-collaterals">
              <div className="cart_totals" style={{ padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>Cart totals</h2>
                <table className="shop_table shop_table_responsive" style={{ width: '100%', marginBottom: '2rem' }}>
                  <tbody>
                    <tr className="cart-subtotal" style={{ borderBottom: '1px solid #dfe4ea' }}>
                      <th style={{ textAlign: 'left', padding: '1rem 0' }}>Subtotal</th>
                      <td data-title="Subtotal" style={{ textAlign: 'right', padding: '1rem 0' }}>
                        <span className="woocommerce-Price-amount amount">
                          <bdi><span className="woocommerce-Price-currencySymbol">$</span>{cartTotal.toFixed(2)}</bdi>
                        </span>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <th style={{ textAlign: 'left', padding: '1rem 0', fontSize: '1.2rem' }}>Total</th>
                      <td data-title="Total" style={{ textAlign: 'right', padding: '1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <strong>
                          <span className="woocommerce-Price-amount amount">
                            <bdi><span className="woocommerce-Price-currencySymbol">$</span>{cartTotal.toFixed(2)}</bdi>
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="wc-proceed-to-checkout">
                  <button
                    onClick={() => alert("Thank you for your order! Checkout functionality will be added in a future phase.")}
                    className="checkout-button button alt wc-forward"
                    style={{ width: '100%', padding: '16px', backgroundColor: '#071a3d', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
