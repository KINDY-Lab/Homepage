/**
 * KINDY Lab Website — Main JavaScript
 * Handles: i18n, scroll reveal, navbar, counter animation, pub tabs, mobile menu
 */

(function () {
  'use strict';

  // ===== LANGUAGE TOGGLE =====
  const STORAGE_KEY = 'kindy-lang';

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang && browserLang.startsWith('zh') ? 'zh' : 'en';
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text) el.textContent = text;
    });

    // Update toggle button text
    var toggleBtns = document.querySelectorAll('#lang-toggle, .mobile-overlay .nav-lang');
    toggleBtns.forEach(function (btn) {
      btn.textContent = lang === 'en' ? '中文' : 'EN';
    });

    // Adjust Chinese typography
    if (lang === 'zh') {
      document.body.style.letterSpacing = '0.05em';
    } else {
      document.body.style.letterSpacing = '';
    }
  }

  // Initialize language
  var currentLang = getLang();
  setLang(currentLang);

  // Language toggle buttons
  document.addEventListener('click', function (e) {
    if (e.target.id === 'lang-toggle' || e.target.classList.contains('nav-lang')) {
      var newLang = document.documentElement.lang === 'en' ? 'zh' : 'en';
      setLang(newLang);
    }
  });

  // ===== NAVBAR SCROLL EFFECT =====
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ===== MOBILE MENU =====
  var hamburger = document.getElementById('nav-hamburger');
  var overlay = document.getElementById('mobile-overlay');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== SCROLL REVEAL =====
  var reveals = document.querySelectorAll('.reveal, .reveal-img');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ===== IMPACT COUNTER ANIMATION =====
  function animateCounter(el, target, duration) {
    duration = duration || 1800;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = Math.floor(eased * target);

      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';

      if (target >= 1000) {
        el.innerHTML = prefix + current.toLocaleString() + '<span>' + suffix + '</span>';
      } else {
        el.innerHTML = prefix + current + '<span>' + suffix + '</span>';
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  var impactSection = document.getElementById('impact');
  if (impactSection && 'IntersectionObserver' in window) {
    var counted = false;
    var impactObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        var nums = impactSection.querySelectorAll('.impact-num');
        nums.forEach(function (el, i) {
          var target = parseInt(el.getAttribute('data-target'), 10);
          if (target) {
            setTimeout(function () {
              animateCounter(el, target, 1800);
            }, i * 150);
          }
        });
      }
    }, { threshold: 0.3 });

    impactObserver.observe(impactSection);
  }

  // ===== PUBLICATION TABS =====
  var pubTabs = document.querySelectorAll('.pub-tab');
  var pubItems = document.querySelectorAll('.pub-item');

  pubTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Update active tab
      pubTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var filter = tab.textContent.trim().toLowerCase();
      var lang = document.documentElement.lang;

      // Get the EN text for filtering
      var filterText = tab.getAttribute('data-en') || tab.textContent;

      pubItems.forEach(function (item) {
        if (filterText === 'All' || filterText === '全部') {
          item.style.display = '';
        } else if (filterText === '2024–2025') {
          var year = parseInt(item.getAttribute('data-year'), 10);
          item.style.display = (year >= 2024) ? '' : 'none';
        } else if (filterText === 'RCT Studies' || filterText === 'RCT研究') {
          var cats = item.getAttribute('data-category') || '';
          item.style.display = cats.includes('rct') ? '' : 'none';
        } else if (filterText === 'Child Development' || filterText === '儿童发展') {
          var cats2 = item.getAttribute('data-category') || '';
          item.style.display = (cats2.includes('childdev') || cats2.includes('selfregulation')) ? '' : 'none';
        } else {
          item.style.display = '';
        }
      });
    });
  });

  // ===== HIGHLIGHT PI NAME IN PUBLICATIONS =====
  document.querySelectorAll('.pub-authors').forEach(function (el) {
    var html = el.innerHTML;
    html = html.replace(/Huang, R\.\*?/g, '<strong>$&</strong>');
    // Avoid double-wrapping
    html = html.replace(/<strong><strong>/g, '<strong>');
    html = html.replace(/<\/strong><\/strong>/g, '</strong>');
    el.innerHTML = html;
  });

  // ===== NEWS CAROUSEL =====
  var carousel = document.querySelector('.news-carousel');
  if (carousel) {
    var track = carousel.querySelector('.news-carousel-track');
    var imgs = carousel.querySelectorAll('.news-carousel-track img');
    var prevBtn = carousel.querySelector('.news-carousel-prev');
    var nextBtn = carousel.querySelector('.news-carousel-next');
    var dotsContainer = carousel.querySelector('.news-carousel-dots');
    var currentSlide = 0;
    var slideCount = imgs.length;
    var autoInterval;

    // Create dots
    for (var i = 0; i < slideCount; i++) {
      var dot = document.createElement('button');
      dot.className = 'news-carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('data-index', i);
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dotsContainer.appendChild(dot);
    }
    var dots = dotsContainer.querySelectorAll('.news-carousel-dot');

    function goToSlide(idx) {
      currentSlide = ((idx % slideCount) + slideCount) % slideCount;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dots.forEach(function(d, j) {
        d.classList.toggle('active', j === currentSlide);
      });
    }

    function startAuto() {
      autoInterval = setInterval(function() {
        goToSlide(currentSlide + 1);
      }, 4000);
    }
    function stopAuto() { clearInterval(autoInterval); }

    prevBtn.addEventListener('click', function() { stopAuto(); goToSlide(currentSlide - 1); startAuto(); });
    nextBtn.addEventListener('click', function() { stopAuto(); goToSlide(currentSlide + 1); startAuto(); });
    dotsContainer.addEventListener('click', function(e) {
      if (e.target.classList.contains('news-carousel-dot')) {
        stopAuto();
        goToSlide(parseInt(e.target.getAttribute('data-index'), 10));
        startAuto();
      }
    });
    startAuto();
  }

  // ===== CHARITY PHOTO LIGHTBOX =====
  var lightbox = document.getElementById('charity-lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.charity-lightbox-close') : null;

  document.querySelectorAll('.charity-track img').forEach(function(img) {
    img.addEventListener('click', function() {
      if (lightbox && lightboxImg) {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 72; // navbar height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
