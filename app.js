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

  // build a gallery from graphics and brand images so we can navigate
  const galleryImgs = Array.from(document.querySelectorAll('.graphics-card img, .brand-card img'));
  let currentIndex = -1;

  function openLightboxAt(index) {
    if (!galleryImgs.length) return;
    currentIndex = (index + galleryImgs.length) % galleryImgs.length;
    const srcImg = galleryImgs[currentIndex];
    lightboxImg.src = srcImg.src;
    lightboxImg.alt = srcImg.alt || '';
    lightbox.classList.add('active');
  }

  galleryImgs.forEach((img, i) => {
    const card = img.closest('.graphics-card') || img.closest('.brand-card');
    if (card) card.style.cursor = 'pointer';
    img.style.cursor = 'pointer';
    const handler = (e) => {
      openLightboxAt(i);
    };
    // attach to both card and image so clicks register reliably
    if (card) card.addEventListener('click', handler);
    img.addEventListener('click', handler);
  });

  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  function showPrev() { openLightboxAt(currentIndex - 1); }
  function showNext() { openLightboxAt(currentIndex + 1); }

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
    if (e.key === 'ArrowLeft') {
      showPrev();
    }
    if (e.key === 'ArrowRight') {
      showNext();
    }
  });
});

// ================= IMAGE PARALLAX =================


const parallaxImages =
document.querySelectorAll(".graphics-card img");


window.addEventListener("scroll",()=>{


parallaxImages.forEach(img=>{


const card =
img.closest(".graphics-card");


const rect =
card.getBoundingClientRect();


const speed =
(rect.top - window.innerHeight/2) * 0.03;


img.style.transform =
`scale(1.08) translateY(${speed}px)`;


});


});

// ================= SCROLL REVEAL =================

document.addEventListener("DOMContentLoaded",()=>{

const reveals = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("in");

revealObserver.unobserve(entry.target);

}

});

},
{
threshold:0.1
});


reveals.forEach(el=>{

revealObserver.observe(el);

});


});

// MASONRY: compute grid row spans based on image heights
function updateMasonry() {
  const container = document.querySelector('.graphics-masonry');
  if (!container) return;
  const style = getComputedStyle(container);
  // if layout isn't grid (we're using column masonry), skip JS span calculations
  if (style.display !== 'grid') return;
  const gap = parseFloat(style.gap) || parseFloat(style.columnGap) || 24;
  const rowHeight = parseFloat(style.gridAutoRows) || 8; // px

  container.querySelectorAll('.graphics-card').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;
    // ensure image has been laid out
    const height = img.getBoundingClientRect().height;
    const span = Math.ceil((height + gap) / rowHeight);
    card.style.gridRow = `span ${span}`;
  });
}

// run on load, resize, and whenever gallery images load
window.addEventListener('load', updateMasonry);
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateMasonry, 150);
});

document.querySelectorAll('.graphics-masonry img').forEach(img => {
  if (img.complete) return;
  img.addEventListener('load', updateMasonry);
});

// initial call in case DOMContentLoaded already fired
setTimeout(updateMasonry, 100);