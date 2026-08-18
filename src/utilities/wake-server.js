/**
 * The API sleeps.
 *
 * It runs on a free Render instance, which spins down after about fifteen
 * minutes idle. The first request then takes twenty seconds or more while
 * the instance boots — measured at 21.7s cold against 0.6s warm. To someone
 * filling in the sign-in form, that reads as a broken site.
 *
 * Calling this as soon as the app mounts starts the wake-up while the user
 * is still typing, so by the time they submit the server is usually up. It
 * is fire-and-forget: a failure here means nothing, because the real request
 * will report its own error.
 */
const BASE_URL = 'https://capstone-project-be-n4tu.onrender.com/api';

let started = false;

export function wakeServer() {
  if (started) return;
  started = true;
  // A route that needs no auth and no body. A 404 is a perfectly good
  // answer — it still means the instance is awake.
  fetch(`${BASE_URL}/users/list-tutors`, { method: 'GET' }).catch(() => {});
}
