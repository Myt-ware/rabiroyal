import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyOrders();
  }, [token]);

  const fetchMyOrders = async () => {
    if (!token) { setLoading(false); return; }
    try {
      const res = await fetch('http://localhost:5000/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setOrders(await res.json());
    } catch (e) {
      console.error('Error fetching orders:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancellingId(orderId);
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        // Refresh orders list
        await fetchMyOrders();
      } else {
        const data = await res.json();
        alert(data.message || 'Could not cancel order.');
      }
    } catch (e) {
      alert('Network error. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending:    { bg: 'rgba(255, 193, 7, 0.12)',   color: '#d4a017' },
      Processing: { bg: 'rgba(197, 157, 95, 0.12)',  color: 'var(--primary-gold)' },
      Shipped:    { bg: 'rgba(13, 110, 253, 0.12)',  color: '#0d6efd' },
      Delivered:  { bg: 'rgba(25, 135, 84, 0.12)',   color: '#198754' },
      Cancelled:  { bg: 'rgba(220, 53, 69, 0.12)',   color: '#dc3545' },
    };
    const s = styles[status] || { bg: 'rgba(108,117,125,0.1)', color: '#6c757d' };
    return (
      <span style={{ backgroundColor: s.bg, color: s.color, padding: '8px 18px', borderRadius: '50px', fontWeight: 500, fontSize: '12px', letterSpacing: '1px' }}>
        {status}
      </span>
    );
  };

  return (
    <section className="orders-section pt-5 pb-5" style={{ backgroundColor: 'var(--light-bg)', minHeight: '100vh' }}>
      <div className="container pt-4 pb-5 mt-4">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 border-bottom pb-4">
          <div>
            <h1 className="display-5 mb-2" style={{ fontWeight: 300 }}>My Orders</h1>
            <p className="text-muted text-uppercase mb-0" style={{ letterSpacing: '2px', fontSize: '13px' }}>
              Account: <strong>{user?.phoneOrEmail}</strong>
            </p>
          </div>
          <div className="mt-4 mt-md-0">
            <button onClick={() => navigate('/home')} className="btn btn-outline-dark shadow-none" style={{ borderRadius: '50px', padding: '10px 25px', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 500 }}>
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-dark" role="status"></div>
              <p className="mt-3 text-muted">Loading your orders...</p>
            </div>

          ) : orders.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="bi bi-bag-x mb-3 text-muted" style={{ fontSize: '4rem' }}></i>
              <h4 className="fw-normal mb-3">No Orders Yet</h4>
              <p className="text-muted mb-4">You haven't placed any orders yet. Explore our collection!</p>
              <button onClick={() => navigate('/home')} className="shop-btn px-4 py-2" style={{ borderRadius: '50px' }}>
                Discover Fragrances
              </button>
            </div>

          ) : (
            orders.map((order) => (
              <div className="col-12" key={order._id}>
                <div className="bg-white p-4 p-lg-5" style={{ borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>

                  {/* ✅ Order Confirmation Notice for Pending Orders */}
                  {order.status === 'Pending' && (
                    <div className="d-flex align-items-start gap-3 p-4 mb-4 rounded-3" style={{ backgroundColor: 'rgba(197, 157, 95, 0.08)', border: '1px solid rgba(197, 157, 95, 0.25)' }}>
                      <i className="bi bi-telephone-outbound-fill mt-1" style={{ color: 'var(--primary-gold)', fontSize: '1.3rem', flexShrink: 0 }}></i>
                      <div>
                        <p className="fw-medium mb-1" style={{ color: 'var(--text-dark)' }}>
                          Order Received — Our team will call you shortly to confirm!
                        </p>
                        <p className="text-muted mb-0 small">
                          A Raabi Perfumes staff member will reach you at <strong>{order.customerInfo.phone}</strong> to confirm your order details and delivery. You can cancel this order below before it is processed.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Order Header */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-4 border-bottom">
                    <div className="d-flex flex-wrap gap-4 gap-md-5">
                      <div>
                        <p className="text-muted text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1.5px' }}>Order Placed</p>
                        <h6 className="mb-0" style={{ fontWeight: 500 }}>
                          {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </h6>
                      </div>
                      <div>
                        <p className="text-muted text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1.5px' }}>Total Amount</p>
                        <h6 className="mb-0" style={{ fontWeight: 500 }}>${order.totalAmount.toFixed(2)}</h6>
                      </div>
                      <div>
                        <p className="text-muted text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1.5px' }}>Order ID</p>
                        <h6 className="mb-0" style={{ fontWeight: 500 }}>#{order._id.substring(order._id.length - 6).toUpperCase()}</h6>
                      </div>
                    </div>
                    <div className="mt-3 mt-md-0">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    {order.items.map((item, index) => (
                      <div key={index} className="d-flex align-items-center flex-wrap flex-md-nowrap mb-4">
                        <div className="me-4 mb-3 mb-md-0" style={{ width: '80px', height: '100px', borderRadius: '12px', overflow: 'hidden', background: '#f8f8f8', flexShrink: 0 }}>
                          <img src={item.img} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={item.name} />
                        </div>
                        <div className="flex-grow-1">
                          <div className="row align-items-center">
                            <div className="col-12 col-md-5 mb-2 mb-md-0">
                              <h5 className="mb-1" style={{ fontWeight: 400, fontSize: '1.1rem' }}>{item.name}</h5>
                              <p className="text-muted mb-0" style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                Eau De Parfum — {item.size || '100ml'}
                              </p>
                            </div>
                            <div className="col-6 col-md-3">
                              <p className="text-muted mb-0" style={{ fontSize: '14px' }}>Qty: {item.quantity}</p>
                            </div>
                            <div className="col-6 col-md-4 text-md-end">
                              <span className="fw-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4 pt-3 border-top">
                    <div className="text-muted small">
                      {order.status === 'Pending' && (
                        <span><i className="bi bi-clock me-1"></i> Awaiting confirmation call from our team.</span>
                      )}
                      {order.status === 'Processing' && (
                        <span><i className="bi bi-arrow-repeat me-1"></i> Your order is being prepared.</span>
                      )}
                      {order.status === 'Shipped' && (
                        <span><i className="bi bi-truck me-1"></i> Your order is on the way!</span>
                      )}
                      {order.status === 'Delivered' && (
                        <span><i className="bi bi-check-circle me-1 text-success"></i> Delivered successfully. Thank you!</span>
                      )}
                      {order.status === 'Cancelled' && (
                        <span><i className="bi bi-x-circle me-1 text-danger"></i> This order was cancelled.</span>
                      )}
                    </div>

                    <div className="d-flex gap-2">
                      {/* Cancel button — only for Pending orders */}
                      {order.status === 'Pending' && (
                        <button
                          className="btn btn-outline-danger shadow-none"
                          style={{ borderRadius: '50px', padding: '8px 20px', fontSize: '13px', fontWeight: 500 }}
                          onClick={() => handleCancel(order._id)}
                          disabled={cancellingId === order._id}
                        >
                          {cancellingId === order._id
                            ? <><span className="spinner-border spinner-border-sm me-2"></span>Cancelling...</>
                            : <><i className="bi bi-x-circle me-1"></i>Cancel Order</>
                          }
                        </button>
                      )}
                      {order.status === 'Delivered' && (
                        <button className="shop-btn shadow-none" style={{ padding: '8px 20px', borderRadius: '50px' }}>
                          <i className="bi bi-arrow-repeat me-1"></i> Buy Again
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
