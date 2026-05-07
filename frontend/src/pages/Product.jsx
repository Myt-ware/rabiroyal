import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Fallback product if accessed directly
const fallbackProduct = {
  id: 'p1',
  name: 'Oud Royal',
  category: 'Eau De Parfum',
  price: 145,
  img: '/hero-1.png',
  description: 'A majestic blend of rich oud, warm spices, and delicate florals.',
  notes: { top: 'Saffron, Rose', heart: 'Sandalwood, Patchouli', base: 'Agarwood (Oud), Amber' },
  size: '100 ML',
  images: ['/hero-1.png', '/hero-2.png', '/hero-3.png'],
};

const Product = () => {
  const location = useLocation();
  const product = location.state?.product || fallbackProduct;

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, size: product.size || '100 ML' });
    navigate('/cart');
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity, size: product.size || '100 ML' });
    navigate('/checkout');
  };

  return (
    <>
      <section className="product-detail-section py-4" style={{ backgroundColor: 'var(--light-bg)', minHeight: '80vh' }}>
        <div className="container py-lg-5">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/home" className="text-muted text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item">
                <button onClick={() => { navigate('/home'); setTimeout(() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="btn btn-link p-0 text-muted text-decoration-none shadow-none">Shop</button>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: 'var(--primary-gold)' }}>{product.name}</li>
            </ol>
          </nav>

          <div className="row g-5 align-items-center">
            {/* Product Image Gallery */}
            <div className="col-12 col-lg-6">
              <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner d-flex align-items-center" style={{ minHeight: '450px' }}>
                  {(product.images || [product.img]).map((img, i) => (
                    <div key={i} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                      <img src={img} className="d-block w-100" alt={`${product.name} view ${i + 1}`} style={{ maxHeight: '450px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                    </div>
                  ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev" style={{ filter: 'invert(1)' }}>
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next" style={{ filter: 'invert(1)' }}>
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>

                <div className="carousel-indicators position-relative mt-4 mb-0" style={{ bottom: 0, gap: '10px' }}>
                  {(product.images || [product.img]).map((img, i) => (
                    <button key={i} type="button" data-bs-target="#productCarousel" data-bs-slide-to={i} className={i === 0 ? 'active' : ''} aria-current={i === 0 ? 'true' : undefined} style={{ width: '70px', height: '70px', textIndent: 0, backgroundColor: 'transparent', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', padding: '5px' }}>
                      <img src={img} className="d-block w-100 h-100" style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} alt="thumb" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-12 col-lg-6 ps-lg-5">
              <span className="text-uppercase tracking-wide mb-2 d-block" style={{ color: 'var(--primary-gold)', letterSpacing: '2px', fontSize: '13px', fontWeight: 500 }}>{product.category}</span>
              <h1 className="display-4 mb-3" style={{ fontWeight: 300, fontFamily: "'Outfit', sans-serif" }}>{product.name}</h1>

              <div className="d-flex align-items-center mb-4">
                <div className="text-warning me-2">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i>
                </div>
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>(128 Reviews)</span>
              </div>

              <div className="price-block mb-4">
                <span className="fs-2" style={{ fontWeight: 400, color: 'var(--text-dark)' }}>${product.price}.00</span>
              </div>

              <p className="text-muted mb-4" style={{ lineHeight: 1.8, fontWeight: 300 }}>{product.description}</p>

              <div className="size-selector mb-4">
                <p className="mb-2" style={{ fontWeight: 500 }}>Size</p>
                <div className="d-flex gap-3">
                  <input type="radio" className="btn-check" name="sizeOptions" id="size100" autoComplete="off" defaultChecked />
                  <label className="btn btn-outline-dark px-4 py-2" htmlFor="size100" style={{ borderRadius: '50px' }}>{product.size || '100 ML'}</label>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4 mt-4">
                <div className="quantity-selector d-flex align-items-center bg-white" style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '50px', padding: '5px 15px' }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="btn border-0 shadow-none p-0"><i className="bi bi-dash fs-5"></i></button>
                  <span className="mx-3 fw-medium" style={{ width: '30px', textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="btn border-0 shadow-none p-0"><i className="bi bi-plus fs-5"></i></button>
                </div>
                <button onClick={handleAddToCart} className="shop-btn flex-grow-1 py-3 d-flex justify-content-center text-uppercase" style={{ borderRadius: '50px', letterSpacing: '1.5px' }}>
                  <i className="bi bi-cart-plus me-2"></i> Add to Cart
                </button>
              </div>

              <button onClick={handleBuyNow} className="btn btn-dark w-100 py-3 mb-4 text-uppercase" style={{ borderRadius: '50px', letterSpacing: '1.5px', fontWeight: 500 }}>
                Buy Now — Proceed to Checkout
              </button>

              {product.notes && (
                <div className="accordion accordion-flush" id="productAccordion">
                  <div className="accordion-item bg-transparent border-bottom">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-transparent shadow-none px-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" style={{ fontWeight: 500 }}>
                        Fragrance Notes
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#productAccordion">
                      <div className="accordion-body px-0 text-muted" style={{ fontWeight: 300 }}>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2"><strong>Top:</strong> {product.notes.top}</li>
                          <li className="mb-2"><strong>Heart:</strong> {product.notes.heart}</li>
                          <li className="mb-0"><strong>Base:</strong> {product.notes.base}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item bg-transparent border-bottom border-top-0">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed bg-transparent shadow-none px-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" style={{ fontWeight: 500 }}>
                        Shipping & Returns
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
                      <div className="accordion-body px-0 text-muted" style={{ fontWeight: 300 }}>
                        Free standard shipping on all orders over $100. Returns accepted within 30 days of purchase for unused items in original packaging.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
