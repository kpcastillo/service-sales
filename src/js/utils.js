// Utility functions for form handling, local storage, and templates

//Render one template into a parent
export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return("No parent Element"); // avoid null errors if the element is missing
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
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#mainHeader");
  const footerElement = document.querySelector("#mainFooter");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  if (!headerElement || !footerElement) {
    console.error("Header or footer element not found in the DOM.");
  }
  headerElement.innerHTML = headerTemplate;
  footerElement.innerHTML = footerTemplate;

  document.dispatchEvent(new Event("headerFooterLoaded"));
};

//Slideshow
export function showSlides(index, slides, dots) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  // Chaining  prevents hard crashes if lengths mismatch
  slides[index]?.classList.add("active");
  dots[index]?.classList.add("active");
}

export function getNextIndex(currentIndex, totalSlides) {
  return (currentIndex + 1) % totalSlides;
}

export function getPrevIndex(currentIndex, totalSlides) {
  return (currentIndex - 1 + totalSlides) % totalSlides;
}

//Open and close Nav bar
export async function openNav() {
    document.getElementById("navbar").style.width = "100%";
}

export async function closeNav() {
    document.getElementById("navbar").style.width = "0%";
}