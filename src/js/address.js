export function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve(window.google); // already loaded
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function createAutocomplete(inputEl, onPlace) {
  const ac = new google.maps.places.Autocomplete(inputEl, {
    fields: ['place_id','formatted_address','address_components','geometry'],
    types: ['address']
  });
  ac.addListener('place_changed', () => onPlace(ac.getPlace()));
  return ac; // keep ref if you want to setBounds later
}
