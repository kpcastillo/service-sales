import { loadGoogleMaps, initAutocomplete } from './address.js';

// Load Google Maps API and initialize autocomplete

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const form = document.getElementById('job-form');
const addressInput = document.getElementById('address');
const placeIdInput = document.getElementById('placeId');
const partsDiv = document.getElementById('addressParts');
const preview = document.getElementById('preview');
const printBtn = document.getElementById('print');

let selectedPlace = null;

(async function boot() {
  const google = await loadGoogleMaps(apiKey);
  initAutocomplete(addressInput, (place) => {
    selectedPlace = place;
    placeIdInput.value = place.place_id || '';
    partsDiv.textContent = place.formatted_address || '(No formatted address)';
  });
})();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic validations
  if (!selectedPlace?.place_id) {
    alert('Please select a valid address from the dropdown.');
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  const payload = {
    customer: {
      name: data.name,
      phone: data.phone,
      email: data.email
    },
    address: {
      placeId: selectedPlace.place_id,
      formatted: selectedPlace.formatted_address,
      components: selectedPlace.address_components || [],
      location: selectedPlace.geometry?.location
        ? { lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }
        : null
    },
    job: {
      linearFeet: parseFloat(data.linearFeet),
      height: parseFloat(data.height),
      notes: data.notes || ''
    },
    createdAt: new Date().toISOString()
  };

  // Save locally
  saveLocal(payload);

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
});

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
let slideIndex = 1;
showSlides(slideIndex);

export function plusSlides(n) {
  showSlides(slideIndex += n);
}

export function currentSlide(n) {
  showSlides(slideIndex = n);
}

export function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = 'block';  
  dots[slideIndex-1].className += ' active';
}