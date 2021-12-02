// Base endpoint to our server
const BASE_URL = '/api/users';

export async function signUp(userData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData)
  });
  // Check if the request was successful
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Invalid Sign Up');
  }
}



