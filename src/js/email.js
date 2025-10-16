//Email validation API module
const emailKey = import.meta.env.VITE_MAILBOX_API_KEY;

// Function to validate email address using MailboxLayer API
export async function validateEmail(email) {
  if (!email) throw new Error('Email is required for validation');
  const emailApiUrl = `https://apilayer.net/api/check?access_key=${emailKey}&email=${encodeURIComponent(email)}`;

  const response = await fetch(emailApiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  const data = await response.json();
  return data;
}
