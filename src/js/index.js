
import { showPosition, loadHeaderFooter } from './utils.js';  

showPosition();
const helloNode = document.createElement("h1");

document.getElementById('content').appendChild(helloNode);
helloNode.textContent = "Hello from JavaScript!";

//Header and footer loading

 window.addEventListener('DOMContentLoaded', () => loadHeaderFooter());