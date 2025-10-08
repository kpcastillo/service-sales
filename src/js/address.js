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
