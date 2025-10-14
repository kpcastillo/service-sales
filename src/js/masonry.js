import {loadHeaderFooter} from './utils.js';
import {calculateMasonry} from './calculations.js';


// Handle form submission
const form = document.getElementById('job-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const linearFeet = parseFloat(formData.get('linearFeet'));
  const height = parseFloat(formData.get('height'));
  const permit = formData.get('permit') === 'on';

  const result = calculateMasonry(linearFeet, height, permit);
  renderPreview(result);
  //save to local storage
  localStorage.setItem('masonryEstimate', JSON.stringify(result));
});

// Handle print button click
const printBtn = document.getElementById('print');
printBtn.addEventListener('click', () => window.print());

//Header and footer loading
document.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();                 
  document.dispatchEvent(new Event('partials:loaded'));
  console.log('Header and footer loaded');
});
