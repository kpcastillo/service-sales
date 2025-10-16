// Quote page JavaScript

const STORAGE_KEY = "masonryEstimate";

// Load from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedEstimate = localStorage.getItem(STORAGE_KEY);
  const display = document.getElementById("quoteDisplay");
  //check if data exists
  if (!savedEstimate) {
    display.innerHTML = "<p>No estimate data found. Please submit the form first.</p>";
    return;
  }
  let data;
  try {
    data = JSON.parse(savedEstimate);
  } catch (e) {
    display.innerHTML = "<p>Error parsing estimate data. Please resubmit the form.</p>";
    return;
  }
  if (data) {
    console.log("Loaded estimate from local storage");
  
    document.getElementById("q-name").textContent = data.fullName || "";
    document.getElementById("q-phone").textContent = data.phone || "";
    document.getElementById("q-email").textContent = data.email || "";
    document.getElementById("q-address").textContent = data.address || "";
    document.getElementById("q-notes").textContent = data.notes || "";


    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        display.innerHTML += `<p><strong>${key}:</strong> ${data[key]}</p>`;
      }
    }

  }
});


// Handle print button click
const printBtn = document.getElementById("print");
printBtn.addEventListener("click", () => window.print());

