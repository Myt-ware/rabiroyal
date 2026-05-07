import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.phoneOrEmail || '',
    phone: user?.phoneOrEmail || '',
    address: user?.savedAddress?.address || '',
    city: user?.savedAddress?.city || '',
    pincode: user?.savedAddress?.pincode || ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customerInfo: formData,
      items: cartItems,
      subtotal,
      tax,
      totalAmount: total
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setSuccess(true);
        clearCart();
        localStorage.setItem('userEmail', formData.email);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => navigate('/home'), 3000);
      } else {
        alert('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !success) {
    return (
      <div className="container py-5 text-center mt-5" style={{ minHeight: '60vh' }}>
        <h2 className="display-4 mb-4 mt-5">Checkout</h2>
        <p className="text-muted">Your cart is empty. Please add items to checkout.</p>
        <Link to="/#shop" className="btn btn-outline-dark mt-3 px-4 rounded-pill">Shop Now</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container py-5 text-center mt-5" style={{ minHeight: '60vh' }}>
        <i className="bi bi-check-circle-fill text-success mb-4" style={{ fontSize: '4rem' }}></i>
        <h2 className="display-4 mb-3" style={{ fontWeight: 300 }}>Order Placed!</h2>
        <p className="text-muted lead">Thank you for shopping with Raabi Perfumes. Your signature scent is on its way.</p>
        <p className="text-muted small">Redirecting you back to home...</p>
      </div>
    );
  }

  return (
    <section className="checkout-section py-5 mt-4" style={{ backgroundColor: 'var(--light-bg)' }}>
      <div className="container py-lg-4">
        <h1 className="display-4 text-center mb-5" style={{ fontWeight: 300 }}>Checkout</h1>
        
        <div className="row g-5">
          {/* Shipping Details */}
          <div className="col-12 col-lg-7">
            <div className="bg-white p-4 p-md-5" style={{ borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
              <h4 className="mb-4" style={{ fontWeight: 400 }}>Shipping Information</h4>
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-12">
                    <label htmlFor="fullName" className="form-label text-muted small text-uppercase tracking-wide">Full Name</label>
                    <input type="text" className="form-control shadow-none py-2" id="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label text-muted small text-uppercase tracking-wide">Email Address</label>
                    <input type="email" className="form-control shadow-none py-2" id="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label text-muted small text-uppercase tracking-wide">Phone Number</label>
                    <input type="tel" className="form-control shadow-none py-2" id="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="address" className="form-label text-muted small text-uppercase tracking-wide">Street Address</label>
                    <input type="text" className="form-control shadow-none py-2" id="address" value={formData.address} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label text-muted small text-uppercase tracking-wide">City</label>
                    <input type="text" className="form-control shadow-none py-2" id="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pincode" className="form-label text-muted small text-uppercase tracking-wide">Postal Code</label>
                    <input type="text" className="form-control shadow-none py-2" id="pincode" value={formData.pincode} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mt-5 border-top pt-4">
                  <button type="submit" className="shop-btn w-100 py-3" disabled={loading} style={{ borderRadius: '50px' }}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    {loading ? 'Processing...' : 'Place Secure Order'}
                  </button>
                  <div className="text-center mt-3 text-muted small">
                    <i className="bi bi-shield-lock-fill me-1"></i> Your data is securely encrypted.
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-lg-5">
            <div className="bg-white p-4 p-md-5" style={{ borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)', position: 'sticky', top: '120px' }}>
              <h4 className="mb-4" style={{ fontWeight: 400 }}>Order Summary</h4>
              
              <div className="mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cartItems.map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f8f8f8' }}>
                      <img src={item.img} alt={item.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-0 fw-normal">{item.name}</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <div>
                      <span className="fw-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2 text-muted">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 text-muted">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <span className="fs-5" style={{ fontWeight: 500 }}>Total</span>
                  <span className="fs-4" style={{ fontWeight: 500, color: 'var(--primary-gold)' }}>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
