// Quote page JavaScript

// Handle print button click
const printBtn = document.getElementById("print");
printBtn.addEventListener("click", () => window.print());
    renderPreview(JSON.parse(localStorage.getItem(STORAGE_KEY)));

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