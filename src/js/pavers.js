import {loadHeaderFooter} from './utils.js';
import { calculatePavers } from './calculations.js';
import { validateEmail } from "./email.js";
import { validatePhone } from "./phone.js";

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

//phone validation
const phoneInput = document.getElementById("phone-input");
const phoneFeedback = document.getElementById("phone-feedback");

phoneInput.addEventListener("input", async (e) => {
    const phone = phoneInput.value.trim();
    if (!phone) return (phoneFeedback.textContent = 'Please enter a phone number.');
    try {
        const data = await validatePhone(phone);
        if (data.valid) {
            phoneFeedback.textContent = "Valid phone number.";
            phoneFeedback.style.color = "green";
        } else {
            phoneFeedback.textContent = "Invalid phone number.";
            phoneFeedback.style.color = "red";
        }
    } catch (error) {
        console.error("Error validating phone:", error);
    }
    console.log(phone);

});

const STORAGE_KEY = "estimate";

// Handle form submission
const form = document.getElementById("pavers-form");
const placePicker = document.getElementById("place-picker");
const addressInput = document.getElementById("address");        
const addressDisplay = document.getElementById("address-display");

function pullFormattedAddress(p) {
  if (!p) return "";
  return (
    p.formattedAddress || p.formatted_address ||
    p.displayName || p.name || p.address || ""
  );
}

function syncAddress() {
  const place = placePicker?.value;
  const formatted = pullFormattedAddress(place);
  addressInput.value = formatted;             
  if (addressDisplay) addressDisplay.textContent = formatted;
}

// keep the hidden input in sync with the picker
["gmpx-placechange", "placechange", "change", "input"].forEach(evt => {
  placePicker?.addEventListener(evt, syncAddress);
});

//form.addEventListener("submit", (e) => {
  //e.preventDefault();
  //syncAddress(); 
//});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");
  syncAddress();
  //Build form data from the form element
  const formData = new FormData(form);

  // Read individual fields from FormData
  const fullName = (formData.get("fullName") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const phone = (formData.get("phone-input") || "").toString().trim();
  const notes = (formData.get("notes") || "").toString().trim();
  const address = (formData.get("address") || "").toString().trim();

  //numbers and booleans
  const width = parseFloat(formData.get("width")) || 0;
  const length = parseFloat(formData.get("length")) || 0;
  const permit = (formData.get("permit") === "on");

  const calcResults = calculatePavers(length, width, permit);

  // Save to local storage
  localStorage.setItem(
    STORAGE_KEY, JSON.stringify({fullName, phone, email, notes, address, width, length, permit, calcResults})
  );
  console.log("Estimate saved to local storage");
  

  // Navigate to the quote page to display the estimate
  const nextUrl = new URL("./quote.html", window.location.href);
  window.location.assign(nextUrl); // or window.open(nextUrl, "_blank");
});

