// Utility functions for form handling, local storage, and templates

  // Geolocation functionality
  document.getElementById("getLocation").addEventListener("click", () => {
    const output = document.getElementById("locationDisplay");
    if (!navigator.geolocation) {
      output.innerText = "Geolocation is not supported by this browser.";
      return;
    }
    output.innerText = "Getting your location...";

    navigator.geolocation.getCurrentPosition(showPosition, showError);
  });
;

export function showPosition(position) {
  const lat = position.coords.latitude.toFixed(6);
  const lng = position.coords.longitude.toFixed(6);

  document.getElementById("locationDisplay").innerText = `Latitude: ${lat}, Longitude: ${lng}`;

  // Optional: store them for later use
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
//Render one template into a parent
export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return('No parent Element'); // avoid null errors if the element is missing
  parentElement.innerHTML = template;
  if (callback) callback(data);
}
//Load an HTML template from a file
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

//Load header and footer dynamically
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');

  const headerElement = document.querySelector('#mainHeader');
  const footerElement = document.querySelector('#mainFooter');

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  if (!headerElement || !footerElement) {
    console.error('Header or footer element not found in the DOM.');
  }
  headerElement.innerHTML = headerTemplate;
  footerElement.innerHTML = footerTemplate;

  document.dispatchEvent(new Event('headerFooterLoaded'));
};

//Slideshow
export function showSlides(index, slides, dots) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  // Optional chaining  prevents hard crashes if lengths mismatch
  slides[index]?.classList.add('active');
  dots[index]?.classList.add('active');
}

export function getNextIndex(currentIndex, totalSlides) {
  return (currentIndex + 1) % totalSlides;
}

export function getPrevIndex(currentIndex, totalSlides) {
  return (currentIndex - 1 + totalSlides) % totalSlides;
}