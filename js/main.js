document.addEventListener('DOMContentLoaded', function() {

  /* ===== LOADING SCREEN ===== */
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(function() {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1400);
    document.body.style.overflow = 'hidden';
  }

  /* ===== FLOATING PARTICLES ===== */
  function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const container = document.createElement('div');
    container.className = 'particles';
    hero.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.width = (Math.random() * 2 + 1) + 'px';
      p.style.height = p.style.width;
      p.style.animationDuration = (Math.random() * 10 + 8) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = Math.random() * 0.4 + 0.1;
      container.appendChild(p);
    }
  }
  createParticles();

  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  /* ===== MOBILE MENU ===== */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== INTERSECTION OBSERVER — REVEAL ===== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  var revealObserver;

  if (revealElements.length > 0) {
    revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('about-image')) {
            entry.target.classList.add('revealed');
          }
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  /* ===== PARALLAX ON SCROLL ===== */
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      const scrollY = window.pageYOffset;
      parallaxElements.forEach(function(el) {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
        }
      });
    }, { passive: true });
  }

  /* ===== HERO PARALLAX (MOUSE) ===== */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && window.innerWidth > 768) {
    document.querySelector('.hero').addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroContent.style.transform = 'translate(' + (x * 20) + 'px, ' + (y * 20) + 'px)';
      heroContent.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    document.querySelector('.hero').addEventListener('mouseleave', function() {
      heroContent.style.transform = 'translate(0, 0)';
      heroContent.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
  }

  /* ===== SMOOTH ANCHOR SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ===== GALLERY LIGHTBOX ===== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<div class="lightbox-content"></div>';
    document.body.appendChild(lightbox);
    const lightboxContent = lightbox.querySelector('.lightbox-content');

    galleryItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const label = this.querySelector('.gallery-label');
        lightboxContent.textContent = label ? label.textContent : '✂';
        lightboxContent.style.fontSize = '48px';
        lightboxContent.style.color = 'var(--gold)';
        lightboxContent.style.letterSpacing = '4px';
        lightboxContent.style.textTransform = 'uppercase';
        lightbox.classList.add('open');
      });
    });

    lightbox.addEventListener('click', function() {
      this.classList.remove('open');
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* ===== SERVICE CARDS STAGGER HOVER ===== */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function(card, index) {
    card.style.setProperty('--card-index', index);
    card.addEventListener('mouseenter', function() {
      serviceCards.forEach(function(c) {
        if (c !== card) {
          c.style.opacity = '0.5';
          c.style.transform = 'scale(0.98)';
        }
      });
    });
    card.addEventListener('mouseleave', function() {
      serviceCards.forEach(function(c) {
        c.style.opacity = '1';
        c.style.transform = '';
      });
    });
  });

  /* ===== NUMBER COUNTER ANIMATION ===== */
  function animateCounter(element, target, suffix, duration) {
    duration = duration || 2000;
    let current = 0;
    const steps = Math.min(60, Math.ceil(duration / 16));
    const increment = target / steps;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(eased * target);
      element.textContent = current + (suffix || '');
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + (suffix || '');
      }
    }
    requestAnimationFrame(updateCounter);
  }

  /* Price counters */
  const priceElements = document.querySelectorAll('.service-price');
  priceElements.forEach(function(el) {
    const text = el.textContent.trim();
    const match = text.match(/(\d+)/);
    if (match) {
      const target = parseInt(match[1]);
      el.textContent = '0 ₽';
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter(el, target, ' ₽');
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(el);
    }
  });

  /* Stats counters — immediate with delay */
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    setTimeout(function() {
      statNumbers.forEach(function(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        if (target) {
          animateCounter(el, target, suffix, target >= 1000 ? 2000 : 1200);
        }
      });
    }, 600);
  }

  /* Animated glitch effect on stat hover */
  document.querySelectorAll('.stat-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      const num = this.querySelector('.stat-number');
      if (num) {
        num.style.transform = 'scale(1.1)';
        num.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }
    });
    item.addEventListener('mouseleave', function() {
      const num = this.querySelector('.stat-number');
      if (num) {
        num.style.transform = 'scale(1)';
      }
    });
  });

  /* ===== SMOOTH LINK TRANSITION ===== */
  document.querySelectorAll('a[href$=".html"]').forEach(function(link) {
    if (link.hostname === window.location.hostname || link.hostname === '') {
      if (link.target !== '_blank') {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          document.body.style.opacity = '0';
          document.body.style.transform = 'translateY(20px)';
          document.body.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          setTimeout(function() {
            window.location.href = href;
          }, 400);
        });
      }
    }
  });

  /* ===== BODY PARALLAX ON SCROLL ===== */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroBg = heroSection.querySelector('.hero-bg');
      if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
      }
    }, { passive: true });
  }

  console.log('✂ Харизма | Барбершоп — все анимации загружены');

  /* ===== REVIEW FORM ===== */
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('reviewName').value.trim();
      const rating = document.getElementById('reviewRating').value;
      const text = document.getElementById('reviewText').value.trim();
      if (!name || !text) return;

      const stars = { '5': '★★★★★', '4': '★★★★☆', '3': '★★★☆☆', '2': '★★☆☆☆', '1': '★☆☆☆☆' };
      const msg = encodeURIComponent(`✂ Новый отзыв с сайта!\n\nИмя: ${name}\nОценка: ${stars[rating]}\n\n${text}`);
      const token = '8779477894:AAGQo4bkEv1s0Cknh4a5IVzHCVncQhRBwAM';
      const chatId = '7003014161';

      fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}&parse_mode=HTML`);

      document.getElementById('reviewSuccess').classList.add('show');
      reviewForm.reset();
    });
  }

  /* ===== GENERATE REVIEWS ===== */
  var reviewsGrid = document.getElementById('reviewsGrid');
  if (reviewsGrid) {
    var reviews = [
      {name: 'Алексей А.', date: '21 января 2026', text: 'Пользуюсь услугами не первый раз и каждый раз выхожу новым человеком. Стрижка на высоком уровне, стильно, так как идет именно мне. Атмосфера отличная — спокойно, легко, без лишнего официоза, можно сказать дружеская. Внутри всегда чисто. На рабочем месте порядок. Сам Баха — мастер своего дела, выполняет свою работу с душой, всегда слушает пожелания, при необходимости переспрашивает. В общем, хочется возвращаться снова и снова.'},
      {name: 'Отабек Йигиталиев', date: '15 февраля 2026', text: 'Посетил Харизму и остался в полном восторге! Мастер внимательно выслушал все мои пожелания, предложил несколько удачных вариантов и подробно объяснил, почему тот или иной стиль подойдёт мне лучше. Процесс стрижки был комфортным, а результат — именно таким, как я мечтал. Спасибо за чуткость и мастерство!'},
      {name: 'Евгений М.', date: '11 декабря 2025', text: 'Был вчера и остался доволен. Располагающая атмосфера, доброжелательный и общительный мастер, отличная музыка. Чисто и с душой. Скидка — реально круто) Развития и процветания! Жена сказала, что стрижка отличная — пять баллов заведению.'},
      {name: 'Андрей Логинов', date: '8 января 2026', text: 'Был сегодня здесь в первый раз. Порадовала чистота и приятная атмосфера. Бахтиер — мастер своего дела, стрижет быстро и аккуратно, приветливый и тактичный. Обязательно порекомендую знакомым.'},
      {name: 'Павел Федюшин', date: '26 декабря 2025', text: 'Мастер максимально вежливый, приятный человек! Профессионал своего дела! Раньше просто ходил постричься, теперь только в Харизму, от посещения, процесса и качества получаешь только удовольствие и положительные эмоции! Однозначно рекомендую.'},
      {name: 'Глеб Рогожин', date: '25 апреля 2026', text: 'Отличное место, отличный барбер! Очень классно и аккуратно выполнил свою работу! Подсказал какая стрижка более подходит под строение головы. Весь процесс поддерживалась приятная беседа! Однозначно вернусь сюда ещё!'},
      {name: 'Dmitry Afonin', date: '1 июня 2026', text: 'Отличный мастер! Знает своё дело на все 100%. Стрижка была выполнена быстро и качественно. Очень приятный в общении человек, атмосфера в салоне была комфортной. Спасибо за отличную работу!'},
      {name: 'Anton', date: '17 января 2026', text: '100000% ставлю 5 звезд. Этот парнишка просто мастер своего дела, руки золотые. Очень ответственно подходит к своему делу, всегда интересуется все ли устраивает, проконсультирует как лучше сделать. Однозначно советую посетить этот БАРБЕРШОП!'},
      {name: 'Ринат Юлуев', date: '14 декабря 2025', text: 'Харизма — отличное место для стрижки!!! Чисто, уютно, комфортно! Бахтиёр — мастер своего дела! Делает причёски любого стиля и посоветует что подойдёт! Рекомендую!'},
      {name: 'Андрей Иващенко', date: '12 декабря 2025', text: 'Мастер знает своё дело. Клиентоориентированность на высоком уровне. Радует то, что могут подстричь как взрослого так и ребёнка. Рекомендую.'},
      {name: 'Вера Горбатенко', date: '24 января 2026', text: 'Шикарно. Просто бомба. Постригли сына идеально. Спасибо большое мастеру. Теперь только сюда. И советую всем.'},
      {name: 'Андрей Л.', date: '16 декабря 2025', text: 'Отличный мастер, прическа суперская, помещение чистое с новым ремонтом.'},
      {name: 'Rouch Saz', date: '23 января 2026', text: 'Прекрасно постригли, приятная музыка, хороший мастер, вернусь еще, отличная цена.'},
      {name: 'Николай', date: '21 февраля 2026', text: 'Стрижка понравилась, мастер красавчик, спрашивает как лучше сделать, добро.'},
      {name: 'Динар Гареев', date: '29 ноября 2025', text: 'Хороший барбер, классно постриг, рассказал как ухаживать за прической, приятный в общении.'},
      {name: 'Никита Гаевой', date: '25 ноября 2025', text: 'Барбер знает своё дело, стригусь постоянно у него, всё нравится, стрижки огонь, атмосфера кайф, спасибо.'},
      {name: 'Danya G.', date: '13 февраля 2026', text: 'Отличная парикмахерская, отзывчивые и общительные сотрудники, в общем парикмахерская топ!'},
      {name: 'Мурад Ахмедов', date: '2 декабря 2025', text: 'Хорошее место, понравилось как работает мастер, заинтересованы чтобы клиент остался доволен. Предложили на свой взгляд как лучше, вышло здорово, за что отдельное спасибо мастеру. Рекомендую всем!'},
      {name: 'Татьяна Астанина', date: '5 декабря 2025', text: 'Всё понравилось! Барбер внимательный и старательный. Постригли сына хорошо.'},
      {name: 'Дмитрий Заваруев', date: '26 ноября 2025', text: 'Отличный барбер шоп, высокое качество, работают одни профессионалы.'},
      {name: 'Максим Мещангин', date: '14 апреля 2026', text: 'Кайфовое место, очень классно подстригли, помыли и очень дёшево.'},
      {name: 'Паша З.', date: '19 февраля 2026', text: 'Уже больше 2 лет доверяю свою голову только Бахе. Лучший в своём деле.'},
      {name: 'Давлат Курбонов', date: '8 мая 2026', text: 'Очень добрый парикмахер, мастер своего дела! Рекомендую.'},
      {name: 'Евгений Шабалов', date: '6 декабря 2025', text: 'Хороший мастер, общительный, приятная атмосфера и приятная музыка.'},
      {name: 'ravilka sueta', date: '29 января 2026', text: 'Хорошая парикмахерская, отлично стригут, советую.'},
      {name: 'Баходиржон Мамасидиков', date: '7 мая 2026', text: 'Мастер очень хороший и красиво делает свое дело, еще по цене самый подходящий. Ребята приходите.'},
      {name: 'МК', date: '26 декабря 2025', text: 'Посетил парикмахерскую пару недель назад — стрижкой доволен, мастер профессионал!'},
      {name: 'Nik ARU', date: '24 февраля 2026', text: 'Душевные разговоры и классная стрижка — это сюда.'},
      {name: 'Вячеслав Ф.', date: '20 ноября 2025', text: 'Хорошее место, нужно было срочно постричься после 9 вечера. Сделали всё быстро и качественно.'},
      {name: 'Сергей Самара', date: '31 января 2026', text: 'Отличный мастер, постриг замечательно.'},
      {name: 'Денис Савельев', date: '27 января 2026', text: 'Стригусь давно у него, отличное заведение.'},
      {name: 'ислам мухтаров', date: '15 февраля 2026', text: 'Всё супер: и стрижка, и сервис. Рекомендую!'},
      {name: 'Гайназаров Бекжон', date: '22 января 2026', text: 'Мастера очень хорошие топ! Именно Bahtiyor barber!'},
      {name: 'хамид исО', date: '23 января 2026', text: 'Профессионал своего дела. Стрижка понравилась.'},
      {name: 'Олег Турмий', date: '26 ноября 2025', text: 'Мастер знает свое дело, сделал все быстро и четко.'},
      {name: 'Мухаммад яхё Мамадалиев', date: '3 июня 2026', text: 'Просто супер сервис, нет слов, советую. Минусов нет, хорошая работа, рекомендую.'},
      {name: 'Максим С.', date: '9 декабря 2025', text: 'Приятное место, отличные стрижки.'},
      {name: 'Зафаржон Куймуродов', date: '15 декабря 2025', text: 'Хорошее место, новое уютное, стрижка на 5+.'},
      {name: 'Разим Абдуллаев', date: '7 декабря 2025', text: 'Супер барбер, стрижка.'},
      {name: 'Рамис', date: '24 ноября 2025', text: 'Отличный барбер, стрижка огонь, рекомендую.'},
      {name: 'Рахимов Мирмахмад', date: '11 ноября 2025', text: 'Хороший салон, стригут круто.'},
      {name: 'Константин Тремасов', date: '21 января 2026', text: 'Отличная атмосфера и барбер круто стрижёт в Харизме.'},
      {name: 'Захиджан Абдувахитов', date: '10 января 2026', text: 'Все отлично! Мастер своего дела, всем советую!!!'},
      {name: 'Артур Ауф', date: '3 июня 2026', text: 'Мастер лучший!'},
      {name: 'Хасанов Абдулло', date: '28 ноября 2025', text: 'Красавчик, стрижку мне очень понравилось, спасибо.'},
      {name: 'Некруз Мадмуротов', date: '14 декабря 2025', text: 'Молодцы ребята, чисто и быстро.'},
      {name: 'Шероз Рахимов', date: '30 мая 2026', text: 'Крутой парикмахер! 1'},
      {name: 'Инкогнито 7783', date: '15 декабря 2025', text: 'Всё круто, рекомендую.'},
      {name: 'Инкогнито 2514', date: '12 ноября 2025', text: 'Спасибо большое брат, стрижка мне очень понравилась.'},
      {name: 'Аааа Ккк', date: '30 мая 2026', text: 'Хорошая атмосфера, хорошие стрижки.'}
    ];

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < reviews.length; i++) {
      var r = reviews[i];
      var card = document.createElement('div');
      card.className = 'review-card reveal';

      var starsDiv = document.createElement('div');
      starsDiv.className = 'review-stars';
      starsDiv.textContent = '★★★★★';

      var textP = document.createElement('p');
      textP.className = 'review-text';
      textP.textContent = r.text;

      var authorDiv = document.createElement('div');
      authorDiv.className = 'review-author';

      var nameSpan = document.createElement('span');
      nameSpan.className = 'review-name';
      nameSpan.textContent = r.name;

      var dateSpan = document.createElement('span');
      dateSpan.className = 'review-date';
      dateSpan.textContent = r.date;

      authorDiv.appendChild(nameSpan);
      authorDiv.appendChild(dateSpan);
      card.appendChild(starsDiv);
      card.appendChild(textP);
      card.appendChild(authorDiv);
      fragment.appendChild(card);
    }

    reviewsGrid.appendChild(fragment);

    /* observe new reveal elements */
    var newReveals = reviewsGrid.querySelectorAll('.reveal');
    newReveals.forEach(function(el) {
      revealObserver.observe(el);
    });
  }
});
