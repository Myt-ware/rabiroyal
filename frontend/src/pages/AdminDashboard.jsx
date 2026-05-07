import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Admin Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('adminAuth') === 'true');
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchOrders(); // Refresh orders
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-warning text-dark';
      case 'Processing': return 'bg-info text-dark';
      case 'Shipped': return 'bg-primary';
      case 'Delivered': return 'bg-success';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const totalOrders = orders.length;

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminId === 'admin' && adminPass === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid Admin ID or Password');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  if (!isAuthenticated) {
    return (
      <section className="admin-login d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#fff' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-5 text-center" style={{ background: '#111111', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <i className="bi bi-shield-lock-fill mb-4 d-block" style={{ fontSize: '3rem', color: 'var(--primary-gold)' }}></i>
                <h3 className="mb-4 fw-light">Admin Access</h3>
                
                {authError && <div className="alert alert-danger py-2 small">{authError}</div>}
                
                <form onSubmit={handleAdminLogin}>
                  <div className="mb-4 text-start">
                    <label className="text-secondary small mb-2 text-uppercase tracking-wide">Admin ID</label>
                    <input 
                      type="text" 
                      className="form-control bg-dark text-white border-secondary shadow-none py-2" 
                      value={adminId} 
                      onChange={(e) => setAdminId(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="mb-5 text-start">
                    <label className="text-secondary small mb-2 text-uppercase tracking-wide">Password</label>
                    <input 
                      type="password" 
                      className="form-control bg-dark text-white border-secondary shadow-none py-2" 
                      value={adminPass} 
                      onChange={(e) => setAdminPass(e.target.value)} 
                      required 
                    />
                  </div>
                  <button type="submit" className="shop-btn w-100 py-3" style={{ borderRadius: '50px' }}>
                    Access Dashboard
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section py-5 mt-4" style={{ backgroundColor: '#111111', minHeight: '100vh', color: '#f8f8f8' }}>
      <div className="container py-lg-4">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary pb-4">
          <div>
            <h1 className="display-5 mb-1" style={{ fontWeight: 300, color: 'var(--primary-gold)' }}>Raabi Admin</h1>
            <p className="text-secondary mb-0">Manage orders and store performance</p>
          </div>
          <div className="text-end d-flex align-items-center gap-4">
            <div>
              <span className="text-secondary small text-uppercase tracking-wide d-block">Total Revenue</span>
              <span className="fs-3" style={{ color: 'var(--primary-gold)', fontWeight: 500 }}>${totalRevenue.toFixed(2)}</span>
            </div>
            <button onClick={handleAdminLogout} className="btn btn-outline-danger btn-sm shadow-none ms-3" style={{ borderRadius: '12px' }}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <i className="bi bi-box-seam fs-1 mb-3" style={{ color: 'var(--primary-gold)' }}></i>
              <h5 className="fw-normal mb-1">Total Orders</h5>
              <h2 className="mb-0 fw-light">{totalOrders}</h2>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <i className="bi bi-hourglass-split fs-1 mb-3 text-warning"></i>
              <h5 className="fw-normal mb-1">Pending</h5>
              <h2 className="mb-0 fw-light">{orders.filter(o => o.status === 'Pending').length}</h2>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <i className="bi bi-check-circle fs-1 mb-3 text-success"></i>
              <h5 className="fw-normal mb-1">Delivered</h5>
              <h2 className="mb-0 fw-light">{orders.filter(o => o.status === 'Delivered').length}</h2>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="p-4 p-md-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
          <h4 className="mb-4 fw-normal text-white">Recent Orders</h4>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-light" role="status"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-5 text-secondary">
              <i className="bi bi-inbox fs-1 mb-3"></i>
              <p>No orders received yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-hover border-secondary text-light align-middle" style={{ backgroundColor: 'transparent' }}>
                <thead>
                  <tr>
                    <th className="fw-normal text-secondary border-bottom border-secondary pb-3">Order ID</th>
                    <th className="fw-normal text-secondary border-bottom border-secondary pb-3">Customer</th>
                    <th className="fw-normal text-secondary border-bottom border-secondary pb-3">Date</th>
                    <th className="fw-normal text-secondary border-bottom border-secondary pb-3">Amount</th>
                    <th className="fw-normal text-secondary border-bottom border-secondary pb-3">Status</th>
                    <th className="fw-normal text-secondary border-bottom border-secondary pb-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="py-3 border-secondary text-secondary small">{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                      <td className="py-3 border-secondary">
                        <div className="fw-medium">{order.customerInfo.fullName}</div>
                        <div className="small text-secondary">{order.customerInfo.email}</div>
                        <div className="small text-secondary"><i className="bi bi-telephone-fill me-1" style={{fontSize: '10px'}}></i>{order.customerInfo.phone}</div>
                      </td>
                      <td className="py-3 border-secondary text-secondary">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 border-secondary fw-medium text-white">${order.totalAmount.toFixed(2)}</td>
                      <td className="py-3 border-secondary">
                        <span className={`badge rounded-pill px-3 py-2 fw-normal ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 border-secondary">
                        <select 
                          className="form-select form-select-sm bg-dark text-light border-secondary shadow-none" 
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          style={{ minWidth: '120px' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;
