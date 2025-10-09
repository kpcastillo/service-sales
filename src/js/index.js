
import { showPosition, loadHeaderFooter, showSlides } from './utils.js';

// Show user position
showPosition();

//Header and footer loading
 window.addEventListener('DOMContentLoaded', () => loadHeaderFooter().catch(console.error));

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

