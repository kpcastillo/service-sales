import {loadHeaderFooter} from './utils.js';
// Load Google Maps API and initialize autocomplete

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const addressInput = document.getElementById('address');
const placeIdInput = document.getElementById('placeId');
const addressDisplay = document.getElementById('addressParts');



loadHeaderFooter();
