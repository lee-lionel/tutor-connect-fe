import * as usersAPI from './api';

/* JWT segments are base64url (- and _ instead of + and /) with the padding
   stripped, and the payload can contain multi-byte UTF-8. atob() handles
   neither, which is why some tokens failed to decode and silently signed the
   user back out. */
function decodeSegment(segment) {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padding = (4 - (base64.length % 4)) % 4;
  const binary = atob(base64 + '='.repeat(padding));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function readPayload(token) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    return JSON.parse(decodeSegment(parts[1]));
  } catch (error) {
    return null;
  }
}

export function getToken() {
  const token = localStorage.getItem('token');
  const payload = readPayload(token);

  if (!payload) {
    if (token) localStorage.removeItem('token');
    return null;
  }

  if (payload.exp && payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }

  return token;
}

export function getUser() {
  const token = getToken();
  const payload = token ? readPayload(token) : null;
  return payload ? payload.user : null;
}

/* Role comes from the signed token rather than localStorage, so editing it
   in devtools no longer changes what the app or the API will allow. */
export function getRole() {
  const user = getUser();
  return user ? user.role : null;
}

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('role'); // legacy key, from when role was stored separately
}

export async function signUp(userData) {
  const { token } = await usersAPI.signUp(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const { token } = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}
