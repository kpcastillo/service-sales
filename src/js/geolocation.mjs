  // Geolocation functionality
  document.getElementById("getLocation").addEventListener("click", async () => {
    const output = await document.getElementById("locationDisplay");
    if (!navigator.geolocation) {
      output.innerText = "Geolocation is not supported by this browser.";
      return;
    }
    output.innerText = "Getting your location...";

    navigator.geolocation.getCurrentPosition(showPosition, showError);
  });
;
export function showPosition(position) {
  if (!position || !position.coords) {
    document.getElementById("locationDisplay").innerText = "Unable to retrieve location.";
    return;
  }
  const lat = position.coords.latitude.toFixed(6);
  const lng = position.coords.longitude.toFixed(6);

  document.getElementById("locationDisplay").innerText = `Latitude: ${lat}, Longitude: ${lng}`;

  // Store them for later use
  //localStorage.setItem("userLat", lat);
  //localStorage.setItem("userLng", lng);
}

function showError(error) {
  const output = document.getElementById("locationDisplay");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      output.innerText = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      output.innerText = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      output.innerText = "The request to get user location timed out.";
      break;
    default:
      output.innerText = "An unknown error occurred.";
      break;
  }
}