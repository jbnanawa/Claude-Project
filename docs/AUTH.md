# Authentication setup (Google + Apple via Firebase)

Everiora uses **Firebase Authentication** for Google and Apple sign-in.

## Quick start

1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Add a **Web** app and copy the config values.
3. Open **Authentication → Sign-in method** and enable:
   - **Google**
   - **Apple** (requires an Apple Developer account — see below)
4. Under **Authentication → Settings → Authorized domains**, keep `localhost` and add your production domain.
5. Copy env values:

```bash
cp .env.example .env
```

Fill in every `VITE_FIREBASE_*` field, then restart the dev server:

```bash
npm run dev
```

Until `.env` is filled in, the login screen still appears with a setup notice; the Google/Apple buttons stay disabled.

## Apple Sign In (web)

1. In [Apple Developer](https://developer.apple.com/account/) create a **Services ID** with Sign in with Apple enabled.
2. Configure the return URL Firebase shows you (usually `https://YOUR_PROJECT.firebaseapp.com/__/auth/handler`).
3. Create a Sign in with Apple **key**, note the Key ID, and download the `.p8` private key.
4. In Firebase → Authentication → Apple, enter your **Team ID**, **Key ID**, **Services ID**, and private key contents.

Apple requires HTTPS for production domains. Localhost is fine for development once Firebase authorized domains include it.

## Notes

- Sessions persist in the browser via Firebase Auth.
- App data (goals, journal, vision board) is still stored in **localStorage** for now — sign-in gates access; cloud sync can come later.
- Use **Sign out** in the header when you want to switch accounts.
