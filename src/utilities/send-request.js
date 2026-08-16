import { getToken, logOut } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  if (res.ok) return res.json();

  /* A 401 on a request we authenticated means the token is no longer good,
     so drop it and return to the sign-in screen. Requests sent without a
     token — signing in, signing up — are excluded, or a wrong password would
     reload the page instead of showing its error. */
  if (res.status === 401 && token) {
    logOut();
    window.location.reload();
  }

  const error = await res.json().catch(() => ({}));
  throw new Error(error.message || `Request failed (${res.status})`);
}
