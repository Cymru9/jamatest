// ---- Rok v patičce ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Mobilní menu ----
const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');
navToggle.addEventListener('click', () => {
  mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
});

// ---- Rotující obrázky v hero sekci ----
const slides = document.querySelectorAll('.hero-slide');
const dotsWrap = document.getElementById('heroDots');
let current = 0;
let heroTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = document.querySelectorAll('.hero-dot');

function goToSlide(index) {
  slides[current].classList.remove('is-active');
  dots[current].classList.remove('is-active');
  current = index;
  slides[current].classList.add('is-active');
  dots[current].classList.add('is-active');
}

function nextSlide() {
  goToSlide((current + 1) % slides.length);
}

function startHeroRotation() {
  heroTimer = setInterval(nextSlide, 5000);
}
if (slides.length > 1) startHeroRotation();

// ---- Galerie: filtrování podle kategorie ----
const catButtons = document.querySelectorAll('.cat-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

catButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    catButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const cat = btn.dataset.cat;

    galleryItems.forEach(item => {
      const matches = cat === 'all' || item.dataset.cat === cat;
      item.classList.toggle('is-hidden', !matches);
    });
  });
});

// ---- Galerie: lightbox po rozkliknutí obrázku ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img').alt;
    lightbox.classList.add('is-open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ---- Kontaktní formulář ----
// Zatím jen ukázkové zpracování v prohlížeči (bez odeslání na server).
// Až budeš mít vybraný způsob ukládání poptávek (např. Netlify Forms,
// Formspree nebo Supabase), tady se doplní skutečné odeslání dat.
const kontaktForm = document.getElementById('kontaktForm');
const formNote = document.getElementById('formNote');

kontaktForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Formulář zatím neodesílá data nikam – doplnit napojení na e-mail/databázi.';
});
