export function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    const script = document.getElementById('gmaps');
    const url = new URL(script.src);
    url.searchParams.set('key', apiKey);
    script.src = url.toString();
    script.addEventListener('load', () => resolve(window.google));
    script.addEventListener('error', reject);
  });
}

export function initAutocomplete(inputEl, onPlace) {
  const ac = new google.maps.places.Autocomplete(inputEl, {
    fields: ['place_id','address_components','formatted_address','geometry'],
    types: ['address']
  });
  ac.addListener('place_changed', () => {
    const place = ac.getPlace();
    onPlace(place);
  });
}

export function saveLocal(job) {
  const key = 'service-sales-jobs';
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  list.push(job);
  localStorage.setItem(key, JSON.stringify(list));
}

export function renderPreview(job) {
  preview.innerHTML = `
    <h2>Job Sheet</h2>
    <p><strong>Customer:</strong> ${job.customer.name} — ${job.customer.phone} — ${job.customer.email}</p>
    <p><strong>Address:</strong> ${job.address.formatted}</p>
    <p><strong>Measurements:</strong> ${job.job.linearFeet} LF × ${job.job.height} ft</p>
    <p><strong>Notes:</strong> ${job.job.notes || '—'}</p>
    <p><small>Created: ${new Date(job.createdAt).toLocaleString()}</small></p>
  `;
}