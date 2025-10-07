
import { showPosition, loadHeaderFooter } from './utils.js';  
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

showPosition();
const helloNode = document.createElement("h1");

document.getElementById('content').appendChild(helloNode);
helloNode.textContent = "Hello from JavaScript!";

//Header and footer loading
 window.addEventListener('DOMContentLoaded', () => loadHeaderFooter());