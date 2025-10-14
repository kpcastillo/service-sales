const {AddressValidation} = await google.maps.importLibrary('addressValidation');
// Service endpoint to load Google Maps API and initialize autocomplete
//https://addressvalidation.googleapis.com
//POST /v1:validateAddress
//Validates an address.
//POST https://addressvalidation.googleapis.com/v1:validateAddress


// Wait for the gmpx-place-picker custom element to be defined
await customElements.whenDefined('gmpx-place-picker');

  const placePicker = document.getElementById("place-picker");
  const placeNameSpan = document.getElementById("place-name");
  const placeAddressSpan = document.getElementById("place-address");

  // Listen for the 'gmpx-placechange' event when a place is selected
  placePicker.addEventListener('gmpx-placechange', () => {
    const place = placePicker.value; // The selected place object

    if (place && place.location) {
      // Display the place details
      placeNameSpan.textContent = place.displayName;
      placeAddressSpan.textContent = place.formattedAddress;
    } else {
      // Clear display if no valid place is selected
      placeNameSpan.textContent = "No details available";
      placeAddressSpan.textContent = "";
    }
  });



// Initialize the autocomplete form once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initAutocompleteForm);