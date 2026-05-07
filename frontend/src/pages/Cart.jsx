import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;
  const count = getCartCount();
  return (
    <>
      {/* Cart Section */}
      <section className="cart-section pt-5" style={{ backgroundColor: 'var(--light-bg)' }}>
        <div className="container pt-4 pb-5 mt-4">
          <div className="text-center mb-5">
            <h1 className="display-4" style={{ fontWeight: 300 }}>Your Cart</h1>
            <p id="cart-count-text" className="text-muted tracking-wide text-uppercase" style={{ letterSpacing: '2px', fontSize: '13px' }}>{count} {count === 1 ? 'Item' : 'Items'}</p>
          </div>

          <div className="row g-5">
            {/* Cart Items */}
            <div className="col-12 col-lg-8">
              <div className="cart-items-container bg-white p-4 p-md-5" style={{ borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-cart-x text-muted" style={{ fontSize: '3rem' }}></i>
                    <h4 className="mt-3 text-muted">Your cart is empty</h4>
                    <button onClick={() => navigate('/home')} className="btn btn-outline-dark mt-4 px-4 py-2" style={{ borderRadius: '50px' }}>Continue Shopping</button>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className={`cart-item d-flex align-items-center flex-wrap flex-md-nowrap pb-4 mb-4 ${index !== cartItems.length - 1 ? 'border-bottom' : ''}`}>
                      <div className="cart-item-img me-4 mb-3 mb-md-0" style={{ width: '100px', height: '120px', borderRadius: '12px', overflow: 'hidden', background: '#f8f8f8' }}>
                        <img src={item.img} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={item.name} />
                      </div>
                      <div className="cart-item-details flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="mb-1" style={{ fontWeight: 400 }}>{item.name}</h5>
                            <p className="text-muted mb-0" style={{ fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Eau De Parfum - {item.size}</p>
                          </div>
                          <button onClick={() => removeFromCart(index)} className="btn btn-link text-muted p-0 text-decoration-none shadow-none"><i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                          <div className="quantity-selector d-flex align-items-center border rounded-pill px-3 py-1">
                            <button onClick={() => updateQuantity(index, item.quantity - 1)} className="btn btn-sm shadow-none p-0 text-muted"><i className="bi bi-dash"></i></button>
                            <span className="mx-3 fw-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(index, item.quantity + 1)} className="btn btn-sm shadow-none p-0 text-muted"><i className="bi bi-plus"></i></button>
                          </div>
                          <span className="fs-5" style={{ fontWeight: 500 }}>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

              </div>
            </div>

            {/* Order Summary */}
            <div className="col-12 col-lg-4">
              <div className="order-summary bg-white p-4 p-md-5" style={{ borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)', position: 'sticky', top: '120px' }}>
                <h4 className="mb-4" style={{ fontWeight: 300 }}>Order Summary</h4>
                
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Subtotal</span>
                  <span id="cart-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="d-flex justify-content-between mb-4 text-muted">
                  <span>Tax</span>
                  <span id="cart-tax">${tax.toFixed(2)}</span>
                </div>
                
                <hr className="mb-4" style={{ opacity: 0.1 }} />
                
                <div className="d-flex justify-content-between mb-5">
                  <span className="fs-5" style={{ fontWeight: 500 }}>Total</span>
                  <span id="cart-total" className="fs-4" style={{ fontWeight: 500, color: 'var(--primary-gold)' }}>${total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => cartItems.length > 0 && navigate('/checkout')}
                  className="shop-btn w-100 py-3 d-flex justify-content-center align-items-center" 
                  style={{ borderRadius: '50px', opacity: cartItems.length === 0 ? 0.5 : 1 }}
                  disabled={cartItems.length === 0}
                >
                  <span>Proceed to Checkout</span> <i className="bi bi-lock-fill ms-2"></i>
                </button>
                
                <p className="text-center text-muted mt-4 mb-0" style={{ fontSize: '12px' }}>Secure checkout powered by Stripe.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
