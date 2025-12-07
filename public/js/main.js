document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const faqQuestions = document.querySelectorAll('.faq-question');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }

        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
 
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const icon = faqItem.querySelector('.faq-icon');

      if (!answer) return;

      const isOpen = !answer.classList.contains('hidden');

      document.querySelectorAll('.faq-item').forEach(item => {
        const otherAnswer = item.querySelector('.faq-answer');
        const otherIcon = item.querySelector('.faq-icon');

        if (otherAnswer) otherAnswer.classList.add('hidden');
        if (otherIcon) otherIcon.classList.remove('rotate-180');
      });

      if (isOpen) {
        answer.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        answer.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
});

// ================= HERO SLIDER =================
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");
  const dotsContainer = document.getElementById("hero-dots");

  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let autoPlayInterval = null;

  // bikin dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className =
      "hero-dot w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white transition";
    dot.setAttribute("data-index", index);
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".hero-dot");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove("hidden");
        slide.classList.add("block");
      } else {
        slide.classList.remove("block");
        slide.classList.add("hidden");
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === index);
      dot.classList.toggle("bg-white/40", i !== index);
    });

    current = index;
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  // event tombol
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoPlay();
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoPlay();
    });
  }

  // event dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"), 10);
      showSlide(index);
      restartAutoPlay();
    });
  });

  // auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000); // 6 detik
  }

  function restartAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // inisialisasi
  showSlide(0);
  startAutoPlay();
});
