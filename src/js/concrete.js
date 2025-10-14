import {loadHeaderFooter} from './utils.js';


// Load Google Maps API and initialize autocomplete
//const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//loadGoogleMaps(apiKey).then(() => {
  //const addressInput = document.getElementById('address');
  //initAutocomplete(addressInput, (place) => {
    //console.log('Selected place:', place);
  //});
//});
//renderPreview(payload);

//alert('Saved!');

//printBtn.addEventListener('click', () => window.print());

//Header and footer loading
document.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();                 // injects header/footer
  document.dispatchEvent(new Event('partials:loaded'));
  console.log('Header and footer loaded');
});