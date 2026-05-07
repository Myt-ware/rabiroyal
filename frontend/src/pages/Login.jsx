import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [step, setStep] = useState(1);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to redirect after login
  const from = location.state?.from?.pathname || '/home';

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!phoneOrEmail) {
      setError('Please enter a valid phone number or email.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneOrEmail })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep(2);
        // SIMULATION ONLY: Show alert so user knows the OTP
        alert(`SIMULATION: Your OTP is ${data.simulatedOtp}\n(Check backend terminal for details)`);
      } else {
        setError(data.message || 'Error requesting OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      setError('Please enter the 4-digit OTP.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneOrEmail, otp })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        login(data.user, data.token);
        navigate(from, { replace: true });
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', backgroundColor: 'var(--light-bg)', paddingTop: '80px' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="bg-white p-5 text-center" style={{ borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)' }}>
              
              <img src="/RabiRoyal.png" alt="Raabi" style={{ maxWidth: '120px', marginBottom: '30px' }} />
              
              <h3 className="mb-2" style={{ fontWeight: 400 }}>Welcome Back</h3>
              <p className="text-muted mb-5" style={{ fontSize: '14px', letterSpacing: '0.5px' }}>
                {step === 1 ? 'Enter your email or phone number to sign in securely.' : `We sent a 4-digit code to ${phoneOrEmail}.`}
              </p>

              {error && (
                <div className="alert alert-danger py-2 px-3 small rounded-3 mb-4" role="alert">
                  {error}
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleRequestOtp}>
                  <div className="mb-4 text-start">
                    <label className="form-label text-muted small text-uppercase tracking-wide">Email or Mobile Number</label>
                    <input 
                      type="text" 
                      className="form-control shadow-none py-3" 
                      style={{ borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}
                      placeholder="e.g. +1234567890 or user@mail.com"
                      value={phoneOrEmail}
                      onChange={(e) => setPhoneOrEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="shop-btn w-100 py-3" disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                    {loading ? 'Sending...' : 'Send Secure Code'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-4 text-start">
                    <label className="form-label text-muted small text-uppercase tracking-wide">4-Digit Security Code</label>
                    <input 
                      type="text" 
                      maxLength="4"
                      className="form-control shadow-none py-3 text-center fs-3 letter-spacing-wide" 
                      style={{ borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', letterSpacing: '10px' }}
                      placeholder="••••"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                      required
                    />
                  </div>
                  <button type="submit" className="shop-btn w-100 py-3 mb-3" disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                    {loading ? 'Verifying...' : 'Verify & Sign In'}
                  </button>
                  <button type="button" className="btn btn-link text-muted small text-decoration-none shadow-none" onClick={() => setStep(1)} disabled={loading}>
                    <i className="bi bi-arrow-left me-1"></i> Use a different number
                  </button>
                </form>
              )}
              
              <div className="mt-5 pt-4 border-top">
                <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
                  By signing in, you agree to our Terms of Service and Privacy Policy. Securely managed by Raabi Perfumes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
