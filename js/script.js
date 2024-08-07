// Слайдер этапы

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.section-stage__content');
  const slides = document.querySelectorAll('.section-stage__slide');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const paginationContainer = document.querySelector('.section-stage__pagination');
  const totalSlides = slides.length;
  let currentIndex = 0;

  function createPagination() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => goToSlide(i));
      paginationContainer.appendChild(dot);
    }
  }

  function updatePagination() {
    const dots = paginationContainer.children;
    Array.from(dots).forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    container.style.transform = `translateX(-${currentIndex * 106}%)`;
    updatePagination();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
  }

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  createPagination();
  updatePagination();
});


// Слайдер участники

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.section-member__slider');
  const slides = document.querySelectorAll('.section-member__slide');
  const prevButton = document.getElementById('section-member__prev');
  const nextButton = document.getElementById('section-member__next');
  const paginationContainer = document.getElementById('section-member__pagination');
  let currentIndex = 3;
  let slidesToShow = window.innerWidth >= 769 ? 3 : 1;
  let totalSlides = slides.length;
  let totalPages = Math.ceil(totalSlides / slidesToShow);
  let autoPlayInterval;

  // Clone first and last slides for infinite effect
  for (let i = 0; i < slidesToShow; i++) {
    const firstClone = slides[i].cloneNode(true);
    const lastClone = slides[totalSlides - 1 - i].cloneNode(true);
    container.appendChild(firstClone);
    container.insertBefore(lastClone, slides[0]);
  }

  function createPagination() {
    paginationContainer.innerHTML = '';
    const paginationText = document.createElement('span');
    paginationText.id = 'paginationText';
    paginationContainer.appendChild(paginationText);
    updatePagination();
  }

  function updatePagination() {
    const currentSlideEnd = (currentIndex % totalSlides) + slidesToShow;
    const paginationText = document.getElementById('paginationText');
    paginationText.textContent = `${currentSlideEnd}/${totalSlides}`;
  }

  function updateNavigation() {
    prevButton.classList.toggle('disable', false);
    nextButton.classList.toggle('disable', false);
  }

  function goToPage(page) {
    currentIndex = page * slidesToShow;
    updateSlider();
  }

  function updateSlider() {
    const slideWidth = container.clientWidth / slidesToShow;
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = `translateX(-${(currentIndex + slidesToShow) * slideWidth}px)`;
    updatePagination();
    updateNavigation()
  }

  function nextSlide() {
    if (currentIndex + slidesToShow < totalSlides) {
      currentIndex += slidesToShow;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentIndex - slidesToShow >= 0) {
      currentIndex -= slidesToShow;
    } else {
      currentIndex = (totalPages - 1) * slidesToShow;
    }
    updateSlider();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);
  window.addEventListener('resize', () => {
    slidesToShow = window.innerWidth >= 769 ? 3 : 1;
    totalPages = Math.ceil(slides.length / slidesToShow);
    createPagination();
    updateSlider();
  });

  // Position the slider correctly with cloned slides
  setTimeout(() => {
    container.style.transition = 'none';
    container.style.transform = `translateX(-${slidesToShow * container.clientWidth / slidesToShow}px)`;
  });

  container.addEventListener('transitionend', () => {
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
      container.style.transition = 'none';
      container.style.transform = `translateX(-${slidesToShow * container.clientWidth / slidesToShow}px)`;
    } else if (currentIndex < 0) {
      currentIndex = totalSlides - slidesToShow;
      container.style.transition = 'none';
      container.style.transform = `translateX(-${(totalSlides - slidesToShow) * container.clientWidth / slidesToShow}px)`;
    }
  });

  createPagination();
  updatePagination();
  updateNavigation();
  startAutoPlay();
});

 
// Заголовок Лекции

document.addEventListener('DOMContentLoaded', function () {
  const lectureContainer = document.querySelector('.section-event__lecture');
  const headingPart1 = document.querySelector('.section-event__heading-part1');
  const headingPart2 = document.querySelector('.section-event__heading-part2');
  const image = document.querySelector('.section-event__image');

  function rearrangeElements() {
    if (window.innerWidth <= 1200) {
      // Перемещаем изображение между частями заголовка
      headingPart1.insertAdjacentElement('afterend', image);
    } else {
      // Возвращаем изображение на исходную позицию
      lectureContainer.appendChild(image);
    }
  }

  // Вызываем функцию при загрузке страницы
  rearrangeElements();

  // Добавляем обработчик события resize
  window.addEventListener('resize', rearrangeElements);
});