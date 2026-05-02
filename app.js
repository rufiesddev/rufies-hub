// Navbar shadow on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.07)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    const target = this.getAttribute('href');
    if (target.startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(target);
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Lightbox
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.graphics-card img').forEach(function(img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
});