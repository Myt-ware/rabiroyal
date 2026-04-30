// --- Intro Splash Screen Logic ---
window.addEventListener('load', () => {
  const splash = document.getElementById('intro-splash');
  if (splash) {
    // Hide exactly after 1.2 seconds
    setTimeout(() => {
      splash.classList.add('hidden');
      setTimeout(() => splash.remove(), 500); // Remove from DOM after CSS transition
    }, 1200);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Scrolling and Active Nav Link
  const scrollLinks = document.querySelectorAll('.scroll-link');
  const sections = document.querySelectorAll('section');

  // Smooth scroll
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        // Close offcanvas if open on mobile
        const offcanvasEl = document.getElementById('navbarContent');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) offcanvas.hide();

        window.scrollTo({
          top: targetSection.offsetTop - 80, // adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });

  // Active nav link on scroll
  const navbar = document.querySelector('.custom-navbar');
  
  window.addEventListener('scroll', () => {
    // Navbar scrolled state
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link state
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    scrollLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Explore Collection Buttons
  const exploreBtns = document.querySelectorAll('.explore-btn');
  exploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        // Close offcanvas if open
        const offcanvasEl = document.getElementById('navbarContent');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) offcanvas.hide();

        window.scrollTo({
          top: shopSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Search Functionality
  const searchToggle = document.getElementById('searchToggle');
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const closeSearch = document.getElementById('closeSearch');
  const productCards = document.querySelectorAll('.col-12.col-md-6.col-lg-4'); // Container of each product

  if (searchToggle && searchContainer) {
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      searchContainer.classList.toggle('d-none');
      if (!searchContainer.classList.contains('d-none')) {
        searchInput.focus();
        // Scroll to shop section when search is opened so they see results filtering
        const shopSection = document.getElementById('shop');
        if (shopSection) {
          // Add a small delay to ensure focus doesn't interrupt scroll on mobile
          setTimeout(() => {
            window.scrollTo({
              top: shopSection.offsetTop - 80, // Perfectly align with navbar
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });

    closeSearch.addEventListener('click', () => {
      searchContainer.classList.add('d-none');
      searchInput.value = '';
      filterProducts(''); // Reset filter
    });

    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      filterProducts(term);
    });
  }

  function filterProducts(term) {
    let hasResults = false;
    productCards.forEach(card => {
      const titleEl = card.querySelector('.product-title');
      if (titleEl) {
        const title = titleEl.textContent.toLowerCase();
        if (title.includes(term)) {
          card.style.display = 'block';
          hasResults = true;
        } else {
          card.style.display = 'none';
        }
      }
    });

    // Handle no results message
    const noResultsMsg = document.getElementById('noResultsMsg');
    if (!hasResults) {
      if (!noResultsMsg) {
        const msg = document.createElement('div');
        msg.id = 'noResultsMsg';
        msg.className = 'col-12 text-center py-5';
        msg.innerHTML = '<h4 class="text-muted">No fragrances found matching your search.</h4>';
        document.querySelector('#shop .row').appendChild(msg);
      } else {
        noResultsMsg.style.display = 'block';
      }
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Cart Functionality ---
  
  function getCart() {
    return JSON.parse(localStorage.getItem('raabi_cart')) || [];
  }

  function saveCart(cart) {
    localStorage.setItem('raabi_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
  }

  function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
  }

  function addToCart(product) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += product.quantity;
    } else {
      cart.push(product);
    }
    saveCart(cart);
    
    // Show feedback and redirect
    const originalText = product.sourceBtn ? product.sourceBtn.innerHTML : '';
    if (product.sourceBtn) {
       product.sourceBtn.innerHTML = '<i class="bi bi-check2 me-1"></i> Added';
       product.sourceBtn.classList.add('bg-success', 'border-success');
       setTimeout(() => {
         product.sourceBtn.innerHTML = originalText;
         product.sourceBtn.classList.remove('bg-success', 'border-success');
         window.location.href = 'cart.html';
       }, 800);
    } else {
       alert(`${product.name} added to cart!`);
       window.location.href = 'cart.html';
    }
  }

  // Initial badge update
  updateCartBadge();

  // Add to cart buttons on shop page
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      const img = btn.getAttribute('data-img');
      const size = btn.getAttribute('data-size') || '100 ML';
      
      addToCart({
        id, name, price, img, size, quantity: 1, sourceBtn: btn
      });
    });
  });

  // Add to cart button on product detail page
  const productAddToCartBtn = document.getElementById('productAddToCart');
  if (productAddToCartBtn) {
    productAddToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = "Oud Royal"; 
      const price = 145.00;
      const img = "hero-1.png";
      const id = "p1";
      
      const qtyInput = document.getElementById('qty');
      const quantity = parseInt(qtyInput.value) || 1;
      
      const size = "100 ML";

      addToCart({
        id, name, price, img, size, quantity, sourceBtn: productAddToCartBtn
      });
    });
  }

  // Render cart on cart page
  function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items-container');
    if (!cartItemsContainer) return;

    const cartCountEl = document.getElementById('cart-count-text');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    
    const cart = getCart();
    
    if (cartCountEl) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountEl.textContent = `${totalItems} Item${totalItems !== 1 ? 's' : ''}`;
    }

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-cart-x text-muted" style="font-size: 3rem;"></i>
          <h4 class="mt-3 text-muted">Your cart is empty</h4>
          <a href="index.html#shop" class="btn btn-outline-dark mt-4 px-4 py-2" style="border-radius: 50px;">Continue Shopping</a>
        </div>`;
      if(subtotalEl) subtotalEl.textContent = '$0.00';
      if(taxEl) taxEl.textContent = '$0.00';
      if(totalEl) totalEl.textContent = '$0.00';
      return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      html += `
        <div class="cart-item d-flex align-items-center flex-wrap flex-md-nowrap border-bottom pb-4 mb-4">
          <div class="cart-item-img me-4 mb-3 mb-md-0" style="width: 100px; height: 120px; border-radius: 12px; overflow: hidden; background: #f8f8f8;">
            <img src="${item.img}" class="w-100 h-100" style="object-fit: cover;" alt="${item.name}">
          </div>
          <div class="cart-item-details flex-grow-1">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h5 class="mb-1" style="font-weight: 400;">${item.name}</h5>
                <p class="text-muted mb-0" style="font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Eau De Parfum - ${item.size}</p>
              </div>
              <button class="btn btn-link text-muted p-0 text-decoration-none shadow-none remove-item-btn" data-index="${index}"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-4">
              <div class="quantity-selector d-flex align-items-center border rounded-pill px-3 py-1">
                <button class="btn btn-sm shadow-none p-0 text-muted qty-btn" data-index="${index}" data-action="decrease"><i class="bi bi-dash"></i></button>
                <span class="mx-3 fw-medium">${item.quantity}</span>
                <button class="btn btn-sm shadow-none p-0 text-muted qty-btn" data-index="${index}" data-action="increase"><i class="bi bi-plus"></i></button>
              </div>
              <span class="fs-5" style="font-weight: 500;">$${itemTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = html;

    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    if(subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if(taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if(totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    
    attachCartEvents();
  }

  function attachCartEvents() {
    const removeBtns = document.querySelectorAll('.remove-item-btn');
    const qtyBtns = document.querySelectorAll('.qty-btn');
    
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = btn.getAttribute('data-index');
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
      });
    });

    qtyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = btn.getAttribute('data-index');
        const action = btn.getAttribute('data-action');
        const cart = getCart();
        
        if (action === 'increase') {
          cart[index].quantity += 1;
        } else if (action === 'decrease') {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          }
        }
        saveCart(cart);
      });
    });
  }

  // Call render on load
  renderCart();

});
