import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const product = {
  id: 'p1',
  name: 'Oud Royal',
  category: 'Eau De Parfum',
  price: 145,
  img: '/hero-1.png',
  description: 'A majestic blend of rich oud, warm spices, and delicate florals. Oud Royal embodies the essence of luxury, leaving a trail of sophistication and timeless elegance wherever you go. Perfectly crafted for unforgettable evenings.',
  notes: { top: 'Saffron, Rose', heart: 'Sandalwood, Patchouli', base: 'Agarwood (Oud), Amber' },
  size: '100 ML',
  images: ['/hero-1.png', '/hero-2.png', '/hero-3.png'],
};

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    navigate('/cart');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/product', { state: { product } });
  };

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        if (revealTop < windowHeight - 50) {
          reveals[i].classList.add('active');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section Start */}
      <section className="hero-section position-relative" id="home">
        <div id="heroCarousel" className="carousel slide carousel-fade h-100" data-bs-ride="carousel" data-bs-pause="false" data-bs-interval="4000">
          <div className="carousel-inner h-100">
            <div className="carousel-item active h-100">
              <img src="/hero-1.png" className="d-block w-100 h-100 hero-img" alt="Luxury Perfume" />
            </div>
            <div className="carousel-item h-100">
              <img src="/hero-2.png" className="d-block w-100 h-100 hero-img" alt="Premium Fragrance" />
            </div>
            <div className="carousel-item h-100">
              <img src="/hero-3.png" className="d-block w-100 h-100 hero-img" alt="Signature Scent" />
            </div>
          </div>
        </div>

        {/* Overlay Content */}
        <div className="hero-overlay d-flex align-items-center">
          <div className="container">
            <div className="hero-content text-start">
              <span className="hero-tag text-white text-uppercase tracking-wide mb-3 d-block">Premium Collection</span>
              <h1 className="hero-title text-white">Discover Your<br />Signature Scent</h1>
              <p className="hero-subtitle text-white mt-4 mb-5">Experience the essence of luxury and timeless elegance crafted for the modern individual.</p>
              <button
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="shop-btn hero-shop-btn explore-btn text-decoration-none"
              >
                <span>Explore Collection</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}

      {/* Products Section Start */}
      <section className="products-section py-5" id="shop">
        <div className="container py-5">
          <div className="text-center mb-5 reveal">
            <span className="text-uppercase tracking-wide" style={{ color: 'var(--primary-gold)', letterSpacing: '2px', fontSize: '14px', fontWeight: 500 }}>Our Collection</span>
            <h2 className="display-5 mt-2" style={{ fontWeight: 300 }}>Featured Fragrances</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Product Card */}
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="product-card d-flex flex-column reveal"
                onClick={handleBuyNow}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-img-wrapper">
                  <img src={product.img} alt={product.name} className="product-img" />
                  <div className="product-actions">
                    <button
                      className="btn btn-cart shadow-none text-white add-to-cart-btn"
                      onClick={handleAddToCart}
                    >
                      <i className="bi bi-cart-plus me-1"></i> Add to Cart
                    </button>
                  </div>
                </div>
                <div className="product-info text-center mt-4 d-flex flex-column flex-grow-1">
                  <h5 className="product-title">{product.name}</h5>
                  <p className="product-category text-muted mb-2">{product.category}</p>
                  <div className="product-price mb-3">
                    <span className="current-price">${product.price}.00</span>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    className="btn btn-buy w-100 shadow-none mt-auto text-decoration-none d-flex justify-content-center align-items-center"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section End */}

      {/* About Section Start */}
      <section className="about-section py-5 position-relative" id="about">
        <div className="container py-lg-5 my-4">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 reveal">
              <div className="position-relative">
                <div className="about-img-wrapper">
                  <img src="/hero-2.png" alt="About Raabi Perfumes" className="w-100 about-img" />
                </div>
                <div className="about-experience">
                  <i className="bi bi-stars text-white mb-0" style={{ fontSize: '3rem', lineHeight: 1 }}></i>
                  <span className="text-white ms-3 text-uppercase" style={{ fontSize: '11px', letterSpacing: '2px', lineHeight: 1.5 }}>Premium<br />Quality</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 ps-lg-5 mt-5 mt-lg-0">
              <span className="text-uppercase tracking-wide mb-3 d-block reveal" style={{ color: 'var(--primary-gold)', letterSpacing: '2px', fontSize: '14px', fontWeight: 500 }}>The Art of Perfumery</span>
              <h2 className="display-4 mb-4 reveal reveal-delay-1" style={{ fontWeight: 300 }}>A Legacy of <br />Timeless Elegance</h2>
              <p className="text-muted mb-4 lead px-3 px-md-0 reveal reveal-delay-2" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                At Raabi Perfumes, we believe that a fragrance is more than just a scent; it is a signature, an invisible garment that dresses the soul. Our journey began with a passion for uncovering the finest ingredients from around the world.
              </p>
              <p className="text-muted mb-5 px-3 px-md-0 reveal reveal-delay-3" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Each bottle is meticulously crafted by master perfumers to capture the essence of luxury, heritage, and modern sophistication. We invite you to discover a collection where every drop tells a story of passion and prestige.
              </p>
              <div className="reveal reveal-delay-4">
                <button
                  onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                  className="shop-btn px-5 py-3 explore-btn"
                  style={{ borderRadius: '50px' }}
                >
                  <span>Discover More</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section End */}
    </>
  );
};

export default Home;
