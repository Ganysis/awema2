(function(){(function() {
      const carousel = document.querySelector('.testimonials-carousel');
      if (!carousel) return;

      const track = carousel.querySelector('.carousel-track');
      const slides = carousel.querySelectorAll('.testimonial-slide');
      const dots = carousel.querySelectorAll('.carousel-dot');
      const prevBtn = carousel.querySelector('.carousel-prev');
      const nextBtn = carousel.querySelector('.carousel-next');
      
      let currentIndex = 0;
      const totalSlides = slides.length;
      const autoplay = carousel.dataset.autoplay === 'true';
      const speed = parseInt(carousel.dataset.speed) || 5000;
      
      function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
      
      function nextSlide() {
        goToSlide((currentIndex + 1) % totalSlides);
      }
      
      function prevSlide() {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
      }
      
      // Event listeners
      prevBtn?.addEventListener('click', prevSlide);
      nextBtn?.addEventListener('click', nextSlide);
      
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
      });
      
      // Autoplay
      if (autoplay) {
        let interval = setInterval(nextSlide, speed);
        
        carousel.addEventListener('mouseenter', () => clearInterval(interval));
        carousel.addEventListener('mouseleave', () => {
          interval = setInterval(nextSlide, speed);
        });
      }
      
      // Touch support
      let touchStartX = 0;
      let touchEndX = 0;
      
      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      
      function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
      }
    })();})();