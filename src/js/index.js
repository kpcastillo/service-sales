
import { showPosition, loadHeaderFooter, showSlides, plusSlides, currentSlide } from './utils.js';  
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

showPosition();
const helloNode = document.createElement("h1");

document.getElementById('content').appendChild(helloNode);
helloNode.textContent = "Hello from JavaScript!";

//Header and footer loading
 window.addEventListener('DOMContentLoaded', () => loadHeaderFooter());

 //slideshow controls
let slideIndex = 1;
showSlides(slideIndex);
 document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
 document.querySelector('.next').addEventListener('click', () => plusSlides(1));
 const dots = document.getElementsByClassName('dot');
 for (let i = 0; i < dots.length; i++) {
   dots[i].addEventListener('click', () => currentSlide(i + 1));
 }

// Load an HTML template from a file
//async function loadTemplate(url) {
  //const response = await fetch(url);
  //if (!response.ok) {
    //console.error(`Failed to load template from ${url}: ${response.statusText}`);
    //return '';
  //}
  //return await response.text();

