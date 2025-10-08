
import { showPosition, loadHeaderFooter, showSlides, plusSlides, currentSlide } from './utils.js';
import {loadGoogleMaps, initAutocomplete} from './address.js';

// Load Google Maps API and initialize autocomplete
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
loadGoogleMaps(apiKey).then(() => {
  const addressInput = document.getElementById('address');
  initAutocomplete(addressInput, (place) => {
    console.log('Selected place:', place);
  });
});

// Show user position
showPosition();

//Header and footer loading
 window.addEventListener('DOMContentLoaded', () => loadHeaderFooter());

 //slideshow controls
let slideIndex = 1;
showSlides(slideIndex);

// Load an HTML template from a file
//async function loadTemplate(url) {
  //const response = await fetch(url);
  //if (!response.ok) {
    //console.error(`Failed to load template from ${url}: ${response.statusText}`);
    //return '';
  //}
  //return await response.text();

