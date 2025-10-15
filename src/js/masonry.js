import {loadHeaderFooter} from "./utils.js";
import {calculateMasonry} from "./calculations.js";
import { validateEmail } from "./email.js"; 


//Header and footer loading
document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  document.dispatchEvent(new Event("partials:loaded"));
  console.log("Header and footer loaded");
});

//email validation
const emailInput = document.getElementById("email-input");
const emailFeedback = document.getElementById("email-feedback");


emailInput.addEventListener("input", async (e) => {
    const email = emailInput.value.trim();
    if (!email) return (emailFeedback.textContent = 'Please enter an email.');
    try {
        const data = await validateEmail(email);
        if (data.format_valid) {
            emailFeedback.textContent = "Valid email address.";
            emailFeedback.style.color = "green";
        } else {
            emailFeedback.textContent = "Invalid email address.";
            emailFeedback.style.color = "red";
        }
    } catch (error) {
        console.error("Error validating email:", error);
    }
    console.log(email);

});

//estimate rendering function
function renderPreview(fname, phone, email, notes, address, result) {
  const preview = document.getElementById('preview');
  preview.innerHTML = `
    <h2>Estimate Preview</h2>
    <p>Customer: ${fname || 'N/A'}</p>
    <p>Phone: ${phone || 'N/A'}</p>
    <p>Email: ${email || 'N/A'}</p>
    <p>Notes: ${notes || 'N/A'}</p>
    <h3>Address</h3>
    <p>${address || 'N/A'}</p>
    <h3>Job Details</h3>
    <p>Linear Feet: ${result.linearFeet}</p>
    <p>Height: ${result.height}</p>
    <p>Area: ${result.area.toFixed(2)} sq ft</p>
    <p>Total Bricks: ${result.totalBricks}</p>
    <p>Brick Cost: $${result.totalBrickCost.toFixed(2)}</p>
    <p>Labor Cost: $${result.totalLaborCost.toFixed(2)}</p>
    <p>Permit Cost: $${result.permitCost.toFixed(2)}</p>
    <h3>Total Cost: $${result.totalCost.toFixed(2)}</h3>
    <p>Date: ${new Date().toLocaleDateString()}</p>
    <p>Notes: ${result.notes || 'N/A'}</p>
    <p>(This is a preview only. Final estimates will be provided in a formal document.)</p>
    <p>Please contact us to finalize your estimate and schedule the job.</p>
  `;
}

const STORAGE_KEY = "masonryEstimate";

// Handle form submission
const form = document.getElementById("masonry-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Form submitted");

// Extract form data
const fullName = new FormData("fullName");
const email = new FormData("email");
const phone = new FormData("phone");
const notes = new FormData("notes");
const address = new FormData("address");
const linearFeet = parseFloat(new FormData("linearFeet"));
const height = parseFloat(new FormData("height"));
const permit = new FormData("permit") === "on";

const calcResults = calculateMasonry(linearFeet, height, permit);

const previewResults = renderPreview(fullName, phone, email, notes, address, calcResults);

// Show the estimate section
document.getElementById("estimateSection").style.display = "block";

// Save to local storage
localStorage.setItem(STORAGE_KEY, JSON.stringify(previewResults));
console.log("Estimate saved to local storage");
});

// Load from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedEstimate = localStorage.getItem(STORAGE_KEY);
  if (savedEstimate) {
    const { fullName, phone, email, notes, address, calcResults } = JSON.parse(savedEstimate);
    renderPreview(fullName, phone, email, notes, address, calcResults);
    document.getElementById("estimateSection").style.display = "block";
    console.log("Loaded estimate from local storage");
  }
});