document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Preloader ---------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('is-hidden'), 500);
  });
  // fallback in case 'load' already fired or takes too long
  setTimeout(() => preloader && preloader.classList.add('is-hidden'), 2000);

  /* ---------------- Footer year ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- Navbar scroll + mobile toggle ---------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
    });
  });

  const parallaxEls = document.querySelectorAll('[data-speed]');

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    // navbar background
    navbar.classList.toggle('is-scrolled', y > 60);

    // scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = docHeight > 0 ? `${(y / docHeight) * 100}%` : '0%';

    // back to top button
    backToTop.classList.toggle('is-visible', y > 600);

    // parallax
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.2;
      el.style.transform = `translateY(${y * speed}px)`;
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(el => {
    const delay = el.dataset.delay;
    if (delay) el.style.setProperty('--delay', `${delay}ms`);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- Counters ---------------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  /* ---------------- Collection cards (generated) ---------------- */
  const dresses = [
    { name: 'Vestido Celeste', category: 'quince', tag: 'Quince años', photo: 'assets/img/vestido-quince-azul.png', desc: 'Falda voluminosa en tul bordado con pedrería y aplicaciones florales.' },
    { name: 'Vestido Primavera', category: 'quince', tag: 'Quince años', photo: 'assets/img/vestido-quince-rosa.png', desc: 'Escote y mangas abullonadas con encaje floral en rosa palo.' },
    { name: 'Vestido Valentina', category: 'boda', tag: 'Boda', photo: 'assets/img/vestido-boda-marfil.png', desc: 'Corte sirena asimétrico con abertura, pedrería y encaje francés.' },
    { name: 'Vestido Serenata', category: 'fiesta', tag: 'Fiesta', colorA: '#fdf1de', colorB: '#e8cd9a', desc: 'Brillo sutil, ideal para celebrar.' },
    { name: 'Vestido Medianoche', category: 'noche', tag: 'Noche', colorA: '#f1e2e6', colorB: '#7a2b3d', desc: 'Corte sirena en satín profundo.' },
    { name: 'Vestido Eterna', category: 'boda', tag: 'Boda', colorA: '#fbf7f0', colorB: '#c9a35a', desc: 'Bordado de pedrería a mano.' },
    { name: 'Vestido Ámbar', category: 'noche', tag: 'Noche', colorA: '#fdece0', colorB: '#d98040', desc: 'Escote en V con abertura lateral.' },
    { name: 'Vestido Menta', category: 'casual', tag: 'Casual', colorA: '#eef6ec', colorB: '#9dc3a1', desc: 'Ligero, fresco y muy versátil.' },
    { name: 'Vestido Brisa', category: 'casual', tag: 'Casual', colorA: '#f3f7f7', colorB: '#a7c4c4', desc: 'Perfecto para el día a día con estilo.' },
  ];

  const grid = document.getElementById('collectionGrid');
  const dressSVG = (colorA, colorB) => `
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${colorB.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${colorA}"/>
          <stop offset="100%" stop-color="${colorB}"/>
        </linearGradient>
      </defs>
      <path d="M95,36 Q73,66 87,108 Q99,134 109,150 Q58,196 33,300 L207,300 Q182,196 131,150 Q141,134 153,108 Q167,66 145,36 Q120,54 95,36 Z" fill="url(#grad-${colorB.replace('#','')})"/>
      <path d="M109,150 Q120,160 131,150" stroke="#2b1d22" stroke-width="2" fill="none" opacity="0.3"/>
      <path d="M60,230 Q120,248 180,230" stroke="#2b1d22" stroke-width="2" fill="none" opacity="0.15"/>
    </svg>`;

  dresses.forEach((d, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.category = d.category;
    card.style.setProperty('--delay', `${(i % 3) * 120}ms`);
    const media = d.photo
      ? `<img src="${d.photo}" alt="${d.name}, ${d.tag.toLowerCase()}" loading="lazy">`
      : dressSVG(d.colorA, d.colorB);
    const bg = d.photo
      ? `linear-gradient(160deg, #f7ece4, #ffffff)`
      : `linear-gradient(160deg, ${d.colorA}, #ffffff)`;
    card.innerHTML = `
      <div class="card__media" style="background:${bg}">
        <span class="card__tag">${d.tag}</span>
        ${media}
      </div>
      <div class="card__body">
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <a href="#contacto" class="card__link">Solicitar información <span>→</span></a>
      </div>`;
    grid.appendChild(card);
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.card').forEach(c => cardObserver.observe(c));

  /* ---------------- Filters ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.card').forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------------- Testimonial slider ---------------- */
  const track = document.getElementById('sliderTrack');
  const dotsWrap = document.getElementById('sliderDots');
  const slides = track.children;
  let current = 0;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  }

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  let autoplay = setInterval(() => goToSlide(current + 1), 5000);
  const sliderEl = document.getElementById('slider');
  sliderEl.addEventListener('mouseenter', () => clearInterval(autoplay));
  sliderEl.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goToSlide(current + 1), 5000);
  });

  /* ---------------- Forms (demo only) ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = '¡Gracias! Te contactaremos muy pronto. (Este es un sitio de demostración)';
    contactForm.reset();
  });

  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    input.value = '¡Gracias por suscribirte!';
    setTimeout(() => { input.value = ''; }, 2500);
  });

});
