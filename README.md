# 🔭 NIST Astronomy Club — React + Firebase

## ⚡ Quick Setup (3 steps)

---

## STEP 1 — Set up Firebase (5 minutes, free)

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"** → Name it `nist-astronomy-club` → Continue
3. Disable Google Analytics (optional) → **Create project**
4. Click **"</> Web"** icon to add a web app → Register app (any nickname)
5. Copy the `firebaseConfig` object shown on screen
6. Open **`src/firebase.js`** in VS Code and paste your config:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nist-astronomy-club.firebaseapp.com",
  projectId: "nist-astronomy-club",
  storageBucket: "nist-astronomy-club.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

7. Back in Firebase console → **Build → Firestore Database → Create database**
8. Choose **"Start in test mode"** → Select a region → Done!

---

## STEP 2 — Run locally

```bash
npm install
npm start
```
Opens at **http://localhost:3000**

Test it: fill the Join form → go to Firebase Console → Firestore → see data appear in real time ✅

---

## STEP 3 — Deploy to Vercel

### Option A: Via Vercel Dashboard (easiest)
1. Push your code to GitHub (commit the firebase.js with your config)
2. Go to **https://vercel.com** → **Add New Project**
3. Import your GitHub repository `nist-astronomy-club`
4. Framework: **Create React App** (auto-detected)
5. Click **Deploy** → Done! 🎉

### Option B: Via VS Code Terminal
```bash
npm install -g vercel
vercel login
vercel
```
Follow the prompts → your site is live!

---

## 🔐 Admin Panel

- Scroll to footer → click **"Admin Panel"**
- Password: **`nistastro2025`** (change in `src/App.js`)
- View all **Join Applications** and **Contact Messages** in tabs
- Export either as **CSV**

---

## 🗄️ Firebase Database Collections

| Collection | Stores |
|---|---|
| `applications` | All join form submissions |
| `contact_messages` | All contact form messages |

View data anytime at: **Firebase Console → Firestore Database**

---

## ✏️ Customizing

| What | Where |
|---|---|
| President/Secretary name | `src/components/Team.jsx` |
| Social media links | `src/components/Contact.jsx` → `socials` array |
| Core member names | `src/data/clubData.js` |
| Alumni messages | `src/data/clubData.js` |
| Admin password | `src/App.js` → `'nistastro2025'` |
| Club events | `src/data/clubData.js` |

---

## 📞 NIST University
**https://www.nist.edu/** · Pallur Hills, Berhampur, Odisha 761008
