import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, token, login, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: user?.savedAddress?.address || '',
    city: user?.savedAddress?.city || '',
    pincode: user?.savedAddress?.pincode || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          savedAddress: {
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Update context with new user data
        login(data.user, token);
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Error updating profile.');
      }
    } catch (error) {
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <section className="profile-section py-5 mt-4" style={{ backgroundColor: 'var(--light-bg)', minHeight: '80vh' }}>
      <div className="container py-lg-4">
        
        <div className="row g-5">
          {/* Sidebar */}
          <div className="col-12 col-md-4 col-lg-3">
            <div className="bg-white p-4 text-center" style={{ borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
              <div className="mb-4 mx-auto d-flex align-items-center justify-content-center bg-dark text-white" style={{ width: '80px', height: '80px', borderRadius: '50%', fontSize: '2rem' }}>
                <i className="bi bi-person"></i>
              </div>
              <h5 className="mb-1" style={{ fontWeight: 400 }}>{user.name || 'User'}</h5>
              <p className="text-muted small mb-4">{user.phoneOrEmail}</p>
              
              <div className="d-flex flex-column gap-2 text-start">
                <Link to="/profile" className="btn text-start shadow-none py-2 px-3 fw-medium" style={{ backgroundColor: 'rgba(197, 157, 95, 0.1)', color: 'var(--primary-gold)', borderRadius: '12px' }}>
                  <i className="bi bi-person-badge me-2"></i> My Details
                </Link>
                <Link to="/my-orders" className="btn text-start text-muted shadow-none py-2 px-3 fw-medium border-0" style={{ borderRadius: '12px' }}>
                  <i className="bi bi-box-seam me-2"></i> My Orders
                </Link>
                <button onClick={handleLogout} className="btn text-start text-danger shadow-none py-2 px-3 fw-medium border-0 mt-3" style={{ borderRadius: '12px' }}>
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-8 col-lg-9">
            <div className="bg-white p-4 p-md-5" style={{ borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
              <h4 className="mb-4" style={{ fontWeight: 400 }}>Personal Details</h4>
              
              {message && (
                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} py-2 px-3 small rounded-3 mb-4`} role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleSave}>
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small text-uppercase tracking-wide">Full Name</label>
                    <input type="text" className="form-control shadow-none py-2" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small text-uppercase tracking-wide">Phone or Email</label>
                    <input type="text" className="form-control shadow-none py-2 bg-light text-muted" value={user.phoneOrEmail} disabled />
                  </div>
                  
                  <div className="col-12 mt-5">
                    <h5 className="mb-3" style={{ fontWeight: 400 }}>Default Shipping Address</h5>
                  </div>
                  
                  <div className="col-12">
                    <label className="form-label text-muted small text-uppercase tracking-wide">Street Address</label>
                    <input type="text" className="form-control shadow-none py-2" id="address" value={formData.address} onChange={handleChange} placeholder="123 Perfume Avenue" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small text-uppercase tracking-wide">City</label>
                    <input type="text" className="form-control shadow-none py-2" id="city" value={formData.city} onChange={handleChange} placeholder="City Name" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small text-uppercase tracking-wide">Postal Code</label>
                    <input type="text" className="form-control shadow-none py-2" id="pincode" value={formData.pincode} onChange={handleChange} placeholder="Postal / Zip Code" />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-top d-flex justify-content-end">
                  <button type="submit" className="shop-btn px-5 py-2" disabled={loading} style={{ borderRadius: '50px' }}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Profile;
