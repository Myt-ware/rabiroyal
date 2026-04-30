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
});
