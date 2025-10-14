//Email validation API module
const emailKey = import.meta.env.VITE_MAILBOX_API_KEY;
const emailAddressInput = document.getElementById('email-input');
const emailApiUrl = `https://apilayer.net/api/check?access_key=${emailKey}&email=${encodeURIComponent(emailAddressInput.value)}`;
//const res = await fetch(url);

// Function to validate email address using MailboxLayer API
export async function validateEmail() {

  const response = await fetch(emailApiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  const data = await response.json();
  return data;
}
console.log(await validateEmail(emailAddressInput.value));
console.log(emailAddressInput.value);