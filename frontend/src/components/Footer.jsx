import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3">
      <div className="container pt-4">
        <div className="row g-4 mb-5">
          {/* Column 1: Brand */}
          <div className="col-12 col-md-6 col-lg-4 pe-lg-5">
            <Link to="/" className="footer-brand d-inline-block mb-4">
              <img src="/RabiRoyal.png" alt="Raabi Logo" className="footer-logo" />
            </Link>
            <p className="footer-text mb-4">
              Experience the essence of luxury and timeless elegance. Crafted for the modern individual who seeks perfection in every scent.
            </p>
            <div className="footer-social d-flex gap-3">
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-6 col-md-6 col-lg-3">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/home">Shop</Link></li>
              <li><Link to="/home">Collections</Link></li>
              <li><Link to="/home">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="col-6 col-md-6 col-lg-2">
            <h5 className="footer-title">Customer Care</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/profile">My Account</Link></li>
              <li><Link to="/my-orders">Track Order</Link></li>
              <li><Link to="/contact">Shipping & Returns</Link></li>
              <li><Link to="/contact">FAQs</Link></li>
              <li><Link to="/contact">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="footer-title">Newsletter</h5>
            <p className="footer-text mb-3">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="footer-newsletter d-flex mt-3">
              <input type="email" className="form-control shadow-none" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-subscribe shadow-none">
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom pt-4 border-top text-center text-md-start d-md-flex justify-content-between align-items-center">
          <p className="mb-0 footer-copy">&copy; 2026 Raabi Perfumes. All rights reserved.</p>
          <div className="footer-payment mt-3 mt-md-0 d-flex gap-2 justify-content-center">
            <i className="bi bi-credit-card fs-4"></i>
            <i className="bi bi-paypal fs-4"></i>
            <i className="bi bi-wallet2 fs-4"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
