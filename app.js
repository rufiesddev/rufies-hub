// Navbar shadow on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
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