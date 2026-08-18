# Tutors Connect

A tutor portal that puts parents and tutors in touch directly, without an
agency in between.

▶︎ **[Open it](https://capstone-project-fe-two.vercel.app/)** ·
**[API](https://github.com/lee-lionel/tutor-connect-be)**

React and React Router on the front, Express and MongoDB behind it, JWT auth
across the middle.

> **First load is slow.** The API sleeps on Render's free tier and takes
> around twenty seconds to wake. The app pings it as soon as it loads and
> says so while you wait, so the sign-in form isn't a dead button.

## What it does

You sign up as a **parent** or a **tutor**, and the app is a different thing
depending on which:

**As a parent** — post a request with the subjects, the level and your part of
Singapore. Browse tutor profiles. See who applied to your post, and mark it
closed once you've found someone.

**As a tutor** — browse open requests, filter them, and apply. Fill in your
profile with your subjects, levels and experience, and choose whether it's
visible to parents at all.

The split runs all the way down. `View` renders open posts for a tutor and
tutor profiles for a parent, from the role in the signed token — and the API
enforces the same thing, so a tutor calling the create-post route gets a 403
whatever the client does.

Phone numbers are for signing in only; they're never shown to another user.
Parents and tutors contact each other by email.

## Running it

```bash
npm install
npm start          # http://localhost:3000
```

It talks to the deployed API by default. To point it at a local backend, edit
`BASE_URL` in `src/utilities/api.js` — the local URL is already there,
commented out.

`npm run build` produces `build/`.

## How it's put together

```
src/
├── pages/
│   ├── AuthPage/       sign in / sign up
│   ├── Home/           what the app is, for each role
│   ├── CreatePost/     a parent posts a request
│   ├── EditProfile/    subjects, levels, experience, visibility
│   ├── Profile/        your own profile
│   └── View.jsx        posts for a tutor, tutors for a parent
├── components/
│   ├── Login, SignUp   with pending states and inline errors
│   ├── SearchPage      the filtered list, either kind
│   ├── PostCard        one request, with its applicants
│   ├── ProfileCard     one tutor
│   ├── Stalking        somebody else's profile, viewed from a card
│   └── Navbar
└── utilities/
    ├── api.js          every backend call in one place
    ├── send-request.js fetch, the bearer token, and 401 handling
    ├── users-service.js the token, and reading the role out of it
    └── subject.js      the subject list, shared by the forms
```

`send-request.js` attaches the token and, on a 401 for an authenticated
request, clears it and returns you to sign-in. Sign-in and sign-up are
excluded from that, or a wrong password would reload the page instead of
showing its error.

`users-service.js` reads the role out of the token rather than from
localStorage, so editing localStorage doesn't change what you can see.

## Still to do

- OTP through Twilio
- chat, so parents and tutors don't have to move to email
- richer filtering on the tutor list
