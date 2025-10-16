//Phone validation API module
const phoneKey = import.meta.env.VITE_NUMVERIFY_API_KEY;

// Function to validate phone number using NumVerify API
export async function validatePhone(phone) {
  if (!phone) throw new Error('Phone number is required for validation');
  const phoneApiUrl = `https://apilayer.net/api/validate?access_key=${phoneKey}&number=${encodeURIComponent(phone)}&country_code=US&format=1`;

  const response = await fetch(phoneApiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  const data = await response.json();
  return data;
}