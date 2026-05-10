document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
  });

  // Project Showcase Carousel
  const slides = document.querySelectorAll('.showcase-slide');
  const bgText = document.querySelector('.showcase-bg-text');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const dotsContainer = document.querySelector('.showcase-dots');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let autoPlayInterval;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('showcase-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateShowcase();
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.showcase-dot');

    const updateShowcase = () => {
      // Update slides
      slides.forEach(slide => slide.classList.remove('active'));
      slides[currentSlide].classList.add('active');
      
      // Update bg text
      const title = slides[currentSlide].getAttribute('data-title');
      if (bgText) {
        bgText.style.opacity = '0';
        setTimeout(() => {
          bgText.textContent = title;
          bgText.style.opacity = '1';
        }, 300);
      }
      
      // Update dots
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateShowcase();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateShowcase();
    };

    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });

    // Auto play
    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 5000);
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    };

    startAutoPlay();

    // Pause on hover
    const showcase = document.querySelector('.project-showcase');
    if (showcase) {
      showcase.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      showcase.addEventListener('mouseleave', startAutoPlay);
    }
  }


  // Handle Form Submit (Prevent default behavior for demo)
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.style.opacity = '0.7';
      
      // Simulate API call
      setTimeout(() => {
        btn.innerHTML = 'Message Sent! ✓';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = 'white';
        btn.style.opacity = '1';
        contactForm.reset();
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    });
  }

  // WhatsApp Widget Logic
  const waPopup = document.getElementById('waPopup');
  const waBtn = document.getElementById('waBtn');
  const waClose = document.getElementById('waClose');

  if (waPopup && waBtn && waClose) {
    // Show automatically after 3 seconds
    setTimeout(() => {
      waPopup.classList.add('show');
    }, 3000);

    // Toggle on button click
    waBtn.addEventListener('click', () => {
      if (waPopup.classList.contains('show')) {
        window.open('https://wa.me/96170256769', '_blank');
      } else {
        waPopup.classList.add('show');
      }
    });

    // Close on X click
    waClose.addEventListener('click', () => {
      waPopup.classList.remove('show');
    });
  }
});
