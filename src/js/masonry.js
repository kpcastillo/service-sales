import {loadHeaderFooter} from "./utils.js";
import {calculateMasonry} from "./calculations.js";
import { validateEmail } from "./email.js"; 


// Handle form submission
const form = document.getElementById("job-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const linearFeet = parseFloat(formData.get("linearFeet"));
  const height = parseFloat(formData.get("height"));
  const permit = formData.get("permit") === "on";

  const result = calculateMasonry(linearFeet, height, permit);
  //renderPreview(result);
  //save to local storage
  localStorage.setItem("masonryEstimate", JSON.stringify(result));
});

// Handle print button click
const printBtn = document.getElementById("print");
printBtn.addEventListener("click", () => window.print());

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
