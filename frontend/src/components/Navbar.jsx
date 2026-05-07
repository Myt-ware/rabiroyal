import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user } = useAuth();
  const cartCount = getCartCount();
  return (
    <>
      <nav className="navv navbar navbar-expand-lg custom-navbar fixed-top">
        <div className="container d-flex align-items-center">
          {/* Left: Mobile Toggler & Desktop Links */}
          <div className="nav-left d-flex align-items-center" style={{ flex: 1 }}>
            <button
              className="navbar-toggler p-0 border-0 shadow-none d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="offcanvas-lg offcanvas-start custom-offcanvas" tabIndex="-1" id="navbarContent" aria-labelledby="navbarContentLabel">
              <div className="offcanvas-header px-4 pt-5 pb-0">
                <Link className="navbar-brand m-0" to="/home">
                  <img src="/RabiRoyal.png" alt="Logo" className="logo" style={{ maxHeight: '80px', width: 'auto' }} />
                </Link>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" data-bs-target="#navbarContent" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body px-4 py-4 p-lg-0">
                <ul className="navbar-nav align-items-center align-items-lg-center menu-links mt-2 mt-lg-0 w-100">
                  <li className="nav-item w-100 w-lg-auto" data-bs-dismiss="offcanvas" data-bs-target="#navbarContent">
                    <Link className="nav-link scroll-link active" to="/home">Home</Link>
                  </li>
                  <li className="nav-item w-100 w-lg-auto" data-bs-dismiss="offcanvas" data-bs-target="#navbarContent">
                    <Link className="nav-link" to="/my-orders">My Orders</Link>
                  </li>
                  <li className="nav-item w-100 w-lg-auto" data-bs-dismiss="offcanvas" data-bs-target="#navbarContent">
                    <Link className="nav-link scroll-link" to="/home">Collections</Link>
                  </li>
                  <li className="nav-item w-100 w-lg-auto" data-bs-dismiss="offcanvas" data-bs-target="#navbarContent">
                    <Link className="nav-link scroll-link" to="/home">About</Link>
                  </li>
                  <li className="nav-item w-100 w-lg-auto" data-bs-dismiss="offcanvas" data-bs-target="#navbarContent">
                    <Link className="nav-link" to="/contact">Contact</Link>
                  </li>
                </ul>
                {/* Mobile Only Footer in Menu */}
                <div className="d-lg-none w-100 mt-5 pt-4 border-top" style={{ borderColor: 'rgba(0,0,0,0.1) !important' }}>
                  <button className="shop-btn w-100 text-uppercase tracking-wide explore-btn" style={{ borderRadius: 0 }}>
                    <span>Explore Collection</span>
                  </button>
                  <div className="mt-4 d-flex gap-4 align-items-center">
                    <a href="#" className="icon-link"><i className="bi bi-instagram fs-4"></i></a>
                    <a href="#" className="icon-link"><i className="bi bi-facebook fs-4"></i></a>
                    <a href="#" className="icon-link"><i className="bi bi-whatsapp fs-4"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="nav-center d-flex justify-content-center" style={{ flex: 1 }}>
            <Link className="navbar-brand m-0" to="/home">
              <img src="/RabiRoyal.png" alt="Logo" className="logo" />
            </Link>
          </div>

          {/* Right: Icons & Buttons */}
          <div className="nav-right d-flex align-items-center justify-content-end gap-3 z-3 nav-right-icons" style={{ flex: 1 }}>
            <a href="#" id="searchToggle" className="icon-link text-dark text-decoration-none d-none d-lg-flex">
              <i className="bi bi-search"></i>
            </a>
            
            {user ? (
              <Link to="/profile" className="icon-link text-dark text-decoration-none">
                <i className="bi bi-person-check-fill text-success" title="Profile"></i>
              </Link>
            ) : (
              <Link to="/login" className="icon-link text-dark text-decoration-none">
                <i className="bi bi-person" title="Login"></i>
              </Link>
            )}

            <Link to="/cart" className="icon-link position-relative text-dark text-decoration-none me-2">
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <div className="d-none d-lg-block">
              <Link to="/home" className="shop-btn explore-btn text-decoration-none">
                <span>Shop Now</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Container */}
      <div className="d-none search-floating-box" id="searchContainer">
        <div className="d-flex align-items-center w-100">
          <i className="bi bi-search search-icon text-muted"></i>
          <input type="text" id="searchInput" className="form-control search-input shadow-none" placeholder="Search for your signature scent..." />
          <button className="btn-close search-close ms-2" id="closeSearch"></button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
