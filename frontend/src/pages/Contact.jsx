const Contact = () => {
  return (
    <>
      {/* Contact Hero Section */}
      <section className="contact-hero d-flex align-items-center justify-content-center text-center pt-5" style={{ minHeight: '40vh', backgroundColor: 'var(--light-bg)' }}>
        <div className="container pt-5 mt-4">
          <span className="text-uppercase tracking-wide mb-3 d-block" style={{ color: 'var(--primary-gold)', letterSpacing: '2px', fontSize: '14px', fontWeight: 500 }}>Get in Touch</span>
          <h1 className="display-3 mb-4" style={{ fontWeight: 300 }}>Contact Us</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '600px', fontWeight: 300 }}>We would love to hear from you. Reach out to us for any inquiries, assistance, or feedback regarding our exclusive collections.</p>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="contact-section py-5" style={{ backgroundColor: 'var(--light-bg)' }}>
        <div className="container pb-lg-5">
          <div className="row g-5">
            
            {/* Contact Info */}
            <div className="col-12 col-lg-5">
              <div className="contact-info-box p-4 p-md-5 bg-white" style={{ borderRadius: '24px', height: '100%', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
                <h3 className="mb-5" style={{ fontWeight: 300 }}>Our Showroom</h3>
                
                <div className="d-flex mb-4 align-items-start">
                  <i className="bi bi-geo-alt fs-3 me-4 mt-1" style={{ color: 'var(--primary-gold)' }}></i>
                  <div>
                    <h5 className="mb-2" style={{ fontWeight: 400 }}>Address</h5>
                    <p className="text-muted mb-0" style={{ fontWeight: 300, lineHeight: 1.6 }}>123 Luxury Avenue, Suite 400<br />Dubai, United Arab Emirates</p>
                  </div>
                </div>

                <div className="d-flex mb-4 align-items-start">
                  <i className="bi bi-telephone fs-3 me-4 mt-1" style={{ color: 'var(--primary-gold)' }}></i>
                  <div>
                    <h5 className="mb-2" style={{ fontWeight: 400 }}>Phone</h5>
                    <p className="text-muted mb-0" style={{ fontWeight: 300, lineHeight: 1.6 }}>+971 4 123 4567<br />+971 50 987 6543</p>
                  </div>
                </div>

                <div className="d-flex mb-5 align-items-start">
                  <i className="bi bi-envelope fs-3 me-4 mt-1" style={{ color: 'var(--primary-gold)' }}></i>
                  <div>
                    <h5 className="mb-2" style={{ fontWeight: 400 }}>Email</h5>
                    <p className="text-muted mb-0" style={{ fontWeight: 300, lineHeight: 1.6 }}>info@raabiperfumes.com<br />support@raabiperfumes.com</p>
                  </div>
                </div>
                
                <h5 className="mb-4 mt-5" style={{ fontWeight: 400 }}>Follow Us</h5>
                <div className="footer-social d-flex gap-3">
                  <a href="#" style={{ background: 'var(--light-bg)', color: 'var(--text-dark)', border: '1px solid rgba(0,0,0,0.05)' }}><i className="bi bi-instagram"></i></a>
                  <a href="#" style={{ background: 'var(--light-bg)', color: 'var(--text-dark)', border: '1px solid rgba(0,0,0,0.05)' }}><i className="bi bi-facebook"></i></a>
                  <a href="#" style={{ background: 'var(--light-bg)', color: 'var(--text-dark)', border: '1px solid rgba(0,0,0,0.05)' }}><i className="bi bi-whatsapp"></i></a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-12 col-lg-7">
              <div className="contact-form-box p-4 p-md-5 bg-white" style={{ borderRadius: '24px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
                <h3 className="mb-5" style={{ fontWeight: 300 }}>Send a Message</h3>
                <form>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label text-muted" style={{ fontSize: '0.9rem' }}>First Name</label>
                      <input type="text" className="form-control form-control-lg shadow-none border-0 bg-light" style={{ borderRadius: '12px', fontSize: '1rem', padding: '15px 20px' }} placeholder="John" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted" style={{ fontSize: '0.9rem' }}>Last Name</label>
                      <input type="text" className="form-control form-control-lg shadow-none border-0 bg-light" style={{ borderRadius: '12px', fontSize: '1rem', padding: '15px 20px' }} placeholder="Doe" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted" style={{ fontSize: '0.9rem' }}>Email Address</label>
                      <input type="email" className="form-control form-control-lg shadow-none border-0 bg-light" style={{ borderRadius: '12px', fontSize: '1rem', padding: '15px 20px' }} placeholder="john@example.com" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted" style={{ fontSize: '0.9rem' }}>Message</label>
                      <textarea className="form-control form-control-lg shadow-none border-0 bg-light" rows="6" style={{ borderRadius: '12px', fontSize: '1rem', padding: '15px 20px' }} placeholder="How can we help you?" required></textarea>
                    </div>
                    <div className="col-12 mt-5">
                      <button type="submit" className="shop-btn w-100 py-3 d-flex justify-content-center" style={{ borderRadius: '50px' }}>
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
