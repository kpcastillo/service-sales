import {loadHeaderFooter} from './utils.js';
import {loadGoogleMaps, createAutocomplete,} from './address.js';

// Load Google Maps API and initialize autocomplete

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const addressInput = document.getElementById('address');
const placeIdInput = document.getElementById('placeId');
const addressDisplay = document.getElementById('addressParts');

let selectedPlace = null;

window.addEventListener('DOMContentLoaded', async () => {
  const google = await loadGoogleMaps(API_KEY);
  createAutocomplete(addressInput, (place) => {
    selectedPlace = place;
    placeIdInput.value = place.place_id || '';
    addressDisplay.textContent = place.formatted_address || '';
  });
});


loadHeaderFooter();
