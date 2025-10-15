// Quote page JavaScript

// Load from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedEstimate = localStorage.getItem(STORAGE_KEY);
  //check if data exists
  if (savedEstimate) {
    //Parse the JSON string back into a JavaScript object
    //const { fullName, phone, email, notes, address, calcResults } = JSON.parse(savedEstimate);
    console.log("Loaded estimate from local storage");
    const display=document.getElementById("quoteDisplay");
    const formData = JSON.parse(savedEstimate);
    //for (const key in formData) {
      //  if (formData.hasOwnProperty(key)) {
        //    display.innerHTML += `<p><strong>${key}:</strong> ${formData[key]}</p>`;
       // }
    display.innerHTML=formData;
  }
});
    
// Handle print button click
const printBtn = document.getElementById("print");
printBtn.addEventListener("click", () => window.print());

//get email for follow up
//const email = document.getElementById("email").value;
//if (email) {
  //  console.log(`Follow-up email will be sent to: ${email}`);
//} else {
  //  console.log("No email provided for follow-up.");