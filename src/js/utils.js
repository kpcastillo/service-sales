// Utility functions for form handling, local storage, and templates

  // Geolocation functionality
  document.getElementById("getLocation").addEventListener("click", () => {
    const output = document.getElementById("locationDisplay");
    if (!navigator.geolocation) {
      output.innerText = "Geolocation is not supported by this browser.";
      return;
    }
    output.innerText = "Getting your location...";

    navigator.geolocation.getCurrentPosition(showPosition, showError);
  });
;

export function showPosition(position) {
  const lat = position.coords.latitude.toFixed(6);
  const lng = position.coords.longitude.toFixed(6);

  document.getElementById("locationDisplay").innerText = `Latitude: ${lat}, Longitude: ${lng}`;

  // Optional: store them for later use
  //localStorage.setItem("userLat", lat);
  //localStorage.setItem("userLng", lng);
}

function showError(error) {
  const output = document.getElementById("locationDisplay");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      output.innerText = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      output.innerText = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      output.innerText = "The request to get user location timed out.";
      break;
    default:
      output.innerText = "An unknown error occurred.";
      break;
  }
}

// Load template from public folder (served from site root in Vite)
//export async function loadTemplate(path) {
  //const res = await fetch(path, { cache: 'no-cache' });
  //if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status} ${res.statusText}`);
  //return await res.text();
//}

// Render one template into a parent
//export function renderWithTemplate(template, parentElement, data, callback) {
  //if (!parentElement) return; // avoid null errors if the element is missing
  //parentElement.innerHTML = template;
  //if (callback) callback(data);
//}

// Load header and footer dynamically
//export async function loadHeaderFooter() {
  //const [headerTemplate, footerTemplate] = await Promise.all([
    //loadTemplate('partials/header.html'),
    //loadTemplate('partials/footer.html'),
  //]);

  //const headerElement = document.querySelector('#mainHeader');
  //const footerElement = document.querySelector('#mainFooter');

  //renderWithTemplate(headerTemplate, headerElement);
  //renderWithTemplate(footerTemplate, footerElement);
//}

// importing partials as raw strings
import headerTemplate from '../partials/header.html?raw';
import footerTemplate from '../partials/footer.html?raw';

export function loadHeaderFooter() {
  const headerElement = document.getElementById('mainHeader');
  const footerElement = document.getElementById('mainFooter');
  try {
  if (headerElement) headerElement.innerHTML = headerTemplate;
  if (footerElement) footerElement.innerHTML = footerTemplate;
  } catch (error) {
    console.error('Error loading header or footer:', error);
  }
}
//Slideshow
export function showSlides(index, slides, dots) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  // Optional chaining prevents hard crashes if lengths mismatch
  slides[index]?.classList.add('active');
  dots[index]?.classList.add('active');
}

export function getNextIndex(currentIndex, totalSlides) {
  return (currentIndex + 1) % totalSlides;
}

export function getPrevIndex(currentIndex, totalSlides) {
  return (currentIndex - 1 + totalSlides) % totalSlides;
}