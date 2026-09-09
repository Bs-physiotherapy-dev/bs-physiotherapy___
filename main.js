document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. Sticky Navigation Header & Scroll State
  // =========================================================================
  const header = document.getElementById('header');
  const scrollThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check immediately on load


  // =========================================================================
  // 2. Mobile Navigation Burger Menu Drawer
  // =========================================================================
  const burgerMenu = document.getElementById('burger-menu');
  const navLinksContainer = document.getElementById('nav-links');
  const navItems = navLinksContainer.querySelectorAll('a');

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      burgerMenu.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });


  // =========================================================================
  // 3. Scroll Spy (Highlight active nav link on scroll)
  // =========================================================================
  const sections = document.querySelectorAll('section, header');
  
  const scrollSpy = () => {
    let currentActiveId = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = sectionId;
      }
    });

    // Fallback if at the very top of the page
    if (window.scrollY < 10) {
      currentActiveId = 'top';
    }

    navItems.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentActiveId}` || (href === '#top' && currentActiveId === 'top')) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Initial call


  // =========================================================================
  // 4. Interactive Treatment / Services Tabs
  // =========================================================================
  const serviceButtons = document.querySelectorAll('.service-btn');
  const servicePanels = document.querySelectorAll('.service-content-wrapper');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate current active button
      serviceButtons.forEach(b => b.classList.remove('active'));
      // Activate clicked button
      btn.classList.add('active');

      // Get target panel ID
      const targetPanelId = btn.getAttribute('data-service');

      // Hide all panels
      servicePanels.forEach(panel => {
        panel.classList.remove('active');
      });

      // Show target panel
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });


  // =========================================================================
  // 6. Interactive Form submission -> WhatsApp redirect
  // =========================================================================
  const bookingForm = document.getElementById('booking-form');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Fetch form fields
    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const condition = document.getElementById('form-condition').value;
    const message = document.getElementById('form-message').value.trim();

    // Verify fields
    if (!name || !phone || !condition) {
      alert('Please fill out all required fields.');
      return;
    }

    // Build the WhatsApp message
    let whatsappText = `Hello Benobin Mathew, MPT. I would like to enquire about a home physiotherapy consultation.\n\n`;
    whatsappText += `*Name:* ${name}\n`;
    whatsappText += `*Phone:* ${phone}\n`;
    whatsappText += `*Condition/Enquiry:* ${condition}\n`;
    
    if (message) {
      whatsappText += `*Brief Details:* ${message}\n`;
    }

    // WhatsApp base URL for Dr. Benobin Mathew: +91 76670 30141
    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/917667030141?text=${encodedText}`;

    // Redirect user to WhatsApp API
    window.open(whatsappUrl, '_blank', 'noopener');
  });


  // =========================================================================
  // 7. Scroll Reveal Animations (Intersection Observer)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animated to avoid recalculating
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // trigger when 15% of element is in view
    rootMargin: '0px 0px -50px 0px' // adjust triggers slightly above viewport bottom
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

});
