// GuardDrive Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Banner Slider
  const bannerSlides = document.querySelectorAll('.banner-slide');
  let currentSlide = 0;
  
  function showSlide(index) {
    bannerSlides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    bannerSlides[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % bannerSlides.length;
    showSlide(currentSlide);
  }
  
  if (bannerSlides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  
  // Technology Tabs
  const techTabs = document.querySelectorAll('.tech-tab');
  const techContents = document.querySelectorAll('.tech-content');
  
  if (techTabs.length > 0) {
    techTabs.forEach((tab, index) => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and contents
        techTabs.forEach(t => t.classList.remove('active'));
        techContents.forEach(c => c.style.display = 'none');
        
        // Add active class to clicked tab and show corresponding content
        tab.classList.add('active');
        techContents[index].style.display = 'flex';
      });
    });
    
    // Show first tab by default
    techTabs[0].classList.add('active');
    techContents[0].style.display = 'flex';
    techContents.forEach((content, index) => {
      if (index !== 0) {
        content.style.display = 'none';
      }
    });
  }
  
  // Animate ESG Metrics on scroll
  const esgMetrics = document.querySelectorAll('.esg-metric');
  
  function animateMetrics() {
    esgMetrics.forEach(metric => {
      const metricValue = parseInt(metric.getAttribute('data-value'));
      const metricSuffix = metric.getAttribute('data-suffix') || '';
      let currentValue = 0;
      
      const interval = setInterval(() => {
        if (currentValue >= metricValue) {
          clearInterval(interval);
          metric.textContent = metricValue + metricSuffix;
        } else {
          currentValue += Math.ceil(metricValue / 50);
          if (currentValue > metricValue) currentValue = metricValue;
          metric.textContent = currentValue + metricSuffix;
        }
      }, 30);
    });
  }
  
  // Intersection Observer for ESG section
  if (esgMetrics.length > 0) {
    const esgSection = document.querySelector('.esg');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateMetrics();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(esgSection);
  }
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    });
  });
  
  // Form validation
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;
      
      // Simple validation
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = 'red';
        isValid = false;
      } else {
        nameInput.style.borderColor = '#ddd';
      }
      
      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        emailInput.style.borderColor = 'red';
        isValid = false;
      } else {
        emailInput.style.borderColor = '#ddd';
      }
      
      if (!messageInput.value.trim()) {
        messageInput.style.borderColor = 'red';
        isValid = false;
      } else {
        messageInput.style.borderColor = '#ddd';
      }
      
      if (isValid) {
        // In a real implementation, this would send the form data to a server
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
      }
    });
  }
});
