
import { showPosition, loadHeaderFooter, showSlides, getNextIndex, getPrevIndex } from "./utils.js";

// Show user position
showPosition();

//Header and footer loading
window.addEventListener('DOMContentLoaded', async() => {
  try {
    await loadHeaderFooter().catch(console.error()); // ensure header/footer load first
  } catch (error) {
    console.warn('Error loading header or footer:', error);
  }
});



//slideshow controls
document.addEventListener('DOMContentLoaded',() => {
  
  //slideshow setup
  const slides = document.querySelectorAll('.mySlides');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  const totalSlides = slides.length;
  let currentIndex = 0;
  let slideInterval;

  function startSlideShow() {
    slideInterval = setInterval(() => {
      currentIndex = getNextIndex(currentIndex, totalSlides);
      showSlides(currentIndex, slides, dots);
    }, 3000);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  prevButton.addEventListener('click', () => {
    stopSlideShow();
    currentIndex = getPrevIndex(currentIndex, totalSlides);
    showSlides(currentIndex, slides, dots);
    startSlideShow();
  });

  nextButton.addEventListener('click', () => {
    stopSlideShow();
    currentIndex = getNextIndex(currentIndex, totalSlides);
    showSlides(currentIndex, slides, dots);
    startSlideShow();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      stopSlideShow();
      const slideIndex = parseInt(e.target.dataset.slideTo, 10);
      currentIndex = slideIndex;
      showSlides(currentIndex, slides, dots);
      startSlideShow();
    });
  });
  //slideshow initialization
  //Initialize AFTER everything is wired
  showSlides(currentIndex, slides, dots);
  startSlideShow();
});


