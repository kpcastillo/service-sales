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
//function renderPreview(fname, phone, email, notes, address, result) {
  //const preview = document.getElementById('quoteDisplay');
  //preview.innerHTML = `
    //<h2>Estimate Preview</h2>
    //<p>Customer: ${fname || 'N/A'}</p>
    //<p>Phone: ${phone || 'N/A'}</p>
    //<p>Email: ${email || 'N/A'}</p>
    //<p>Notes: ${notes || 'N/A'}</p>
    //<h3>Address</h3>
    //<p>${address || 'N/A'}</p>
    
    //<h3>Calculation Results</h3>

    //<p>Total Bricks: ${result.totalBricks}</p>
    //<p>Brick Cost: $${result.totalBrickCost.toFixed(2)}</p>
    //<p>Labor Cost: $${result.totalLaborCost.toFixed(2)}</p>
    //<p>Permit Cost: $${result.permitCost.toFixed(2)}</p>
    //<h3>Total Cost: $${result.totalCost.toFixed(2)}</h3>
    //<p>Date: ${new Date().toLocaleDateString()}</p>
    //<p>Notes: ${result.notes || 'N/A'}</p>
    //<p>(This is a preview only. Final estimates will be provided in a formal document.)</p>
    //<p>Please contact us to finalize your estimate and schedule the job.</p>
  //`;
//}

const STORAGE_KEY = "masonryEstimate";

// Handle form submission
const form = document.getElementById("masonry-form")
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");
  //Build form data from the form element
  const formData = new FormData(form);

  // Read individual fields from FormData
  const fullName = (formData.get("fullName") || "").toString().trim();

  console.log(fullName);
  console.log(typeof fullName);
  console.log(document.getElementById("fullName").value);
  const email = (formData.get("email") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const notes = (formData.get("notes") || "").toString().trim();
  const address = (formData.get("address") || "").toString().trim();

  //numbers and booleans
  const linearFt = parseFloat(formData.get("linearFeet")) || 0;
  const height = parseFloat(formData.get("height")) || 0;
  const permit = (formData.get("permit") === "on");

  const calcResults = calculateMasonry(linearFt, height, permit);

  //const previewResults = renderPreview(fullName, phone, email, notes, address, calcResults);

  // Show the estimate section
  //document.getElementById("quotedDisplay").style.display = "block";

  // Save to local storage
  localStorage.setItem(
    STORAGE_KEY, JSON.stringify({fullName, phone, email, notes, address, calcResults})
  );
  console.log("Estimate saved to local storage");
  });

  // Navigate to the quote page to display the estimate
  const nextUrl = new URL("./quote.html", window.location.href);
  window.location.assign(nextUrl); // or window.open(nextUrl, "_blank");


