<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=32&duration=3000&pause=1000&color=F5A623&center=true&vCenter=true&width=600&lines=NIST+Astronomy+Club;Explore+the+Cosmos+%F0%9F%94%AD;Pallur+Hills+Observatory+%E2%AD%90" alt="NIST Astronomy Club" />

<br/>

![Stars](https://img.shields.io/badge/Stars-Infinite-%23F5A623?style=for-the-badge&logo=starship&logoColor=white)
![Members](https://img.shields.io/badge/Members-120%2B-%234FC3F7?style=for-the-badge&logo=groups&logoColor=white)
![Built With](https://img.shields.io/badge/Built%20With-React%20%2B%20Firebase-%23A78BFA?style=for-the-badge&logo=react&logoColor=white)
![Deployed On](https://img.shields.io/badge/Deployed%20On-Vercel-%23000000?style=for-the-badge&logo=vercel&logoColor=white)

<br/>

> *"Where Science Meets the Sky — Exploring the Cosmos from Pallur Hills, Berhampur"*

**[🌐 Live Website](https://nist-astronomy-club.vercel.app)** &nbsp;·&nbsp; **[🏫 NIST University](https://www.nist.edu/)** &nbsp;·&nbsp; **[📸 Instagram](#)** &nbsp;·&nbsp; **[💬 Discord](#)**

</div>

---

## 🌌 About the Club

The **NIST Astronomy Club** is the official astronomy and space science club of [NIST University, Berhampur](https://www.nist.edu/), Odisha — a premier institution with NAAC 'A' Grade accreditation, nestled in the scenic Pallur Hills.

Since 2018, we have been bringing the universe closer to students across all departments — through telescope observations, astrophotography sessions, workshops by distinguished scientists, and hands-on research projects.

---

## ✨ Features

| | Feature |
|---|---|
| 🎨 | Deep-space themed UI with animated star field |
| 📸 | 50-slot drag & drop photo gallery |
| 📝 | Full membership application questionnaire |
| ✉️ | Contact form with real-time message storage |
| 🔥 | Firebase Firestore database — permanent storage |
| 🔐 | Password-protected admin dashboard |
| 📊 | Export applications & messages as CSV |
| 📱 | Fully responsive — mobile, tablet & desktop |

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React_18-%2361DAFB?style=flat-square&logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase_10-%23FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-%23000000?style=flat-square&logo=vercel&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS_Variables-%231572B6?style=flat-square&logo=css3&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ installed
- A free [Firebase account](https://firebase.google.com)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/vanillafeisty/nist-astronomy-club.git
cd nist-astronomy-club
npm install
```

### 2️⃣ Connect Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a project → Add a Web App → copy the config
3. Enable **Firestore Database** → Start in **Test Mode**
4. Open `src/firebase.js` and paste your config:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3️⃣ Run Locally

```bash
npm start
# Opens at http://localhost:3000
```

---

## 🌐 Deploy to Vercel

Push to GitHub and Vercel auto-deploys on every commit:

```bash
git add .
git commit -m "your message"
git push
```

Or deploy via CLI:

```bash
npm install -g vercel
vercel --prod
```

---

## 🗄️ Database Structure

```
Firestore
├── 📁 applications            ← Join form submissions
│   ├── fullName
│   ├── email / phone
│   ├── department / year
│   ├── level
│   ├── interests []
│   ├── techSkills
│   ├── motivation
│   └── submittedAt
│
└── 📁 contact_messages        ← Contact form messages
    ├── name / email / phone
    ├── subject
    ├── message
    └── sentAt
```

---

## 🔐 Admin Panel

Access the admin dashboard to view all submissions:

1. Scroll to the **footer** → click **"Admin Panel"**
2. Enter password: `nistastro2025`
3. Switch between **Applications** and **Messages** tabs
4. Click **Export CSV** to download data as a spreadsheet

> 💡 To change the password, edit `src/App.js` and replace `'nistastro2025'`

---

## ✏️ Customization Guide

| What to change | File | What to edit |
|---|---|---|
| President / Secretary name | `src/components/Team.jsx` | Replace placeholder text |
| Core member names & roles | `src/data/clubData.js` | `coreMembers` array |
| Alumni messages | `src/data/clubData.js` | `alumni` array |
| Events content | `src/data/clubData.js` | `events` array |
| Social media links | `src/components/Contact.jsx` | `socials` array URLs |
| Footer social links | `src/components/Footer.jsx` | `href` values |
| Admin password | `src/App.js` | `'nistastro2025'` string |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky navigation with mobile menu
│   ├── Hero.jsx            # Animated star field hero section
│   ├── AboutNIST.jsx       # University info & official links
│   ├── WhyJoin.jsx         # Reasons to join & learning outcomes
│   ├── Events.jsx          # Club events (4 categories)
│   ├── Team.jsx            # President, secretary & 30 core members
│   ├── Gallery.jsx         # 50-slot drag & drop photo gallery
│   ├── Alumni.jsx          # 5 alumni messages
│   ├── JoinForm.jsx        # Full membership questionnaire → Firebase
│   ├── Contact.jsx         # Contact form → Firebase + social links
│   ├── AdminPanel.jsx      # View & export all submissions
│   └── Footer.jsx          # Footer with NIST links
├── data/
│   └── clubData.js         # All club content in one place
├── styles/
│   └── global.css          # Global design system & variables
├── firebase.js             # 🔴 Paste your Firebase config here
└── App.js                  # Root component + admin password
```

---

## 🏫 About NIST University

| | |
|---|---|
| 📍 **Location** | Pallur Hills, Berhampur, Odisha — 761008 |
| 🏆 **Accreditation** | NAAC 'A' Grade · UGC Recognized |
| 🌿 **Campus** | 70-Acre Green Campus |
| 📅 **Established** | 1996 |
| 🌐 **Website** | [www.nist.edu](https://www.nist.edu/) |
| 📧 **Email** | hello@nist.edu |
| 📞 **Phone** | 0680 3925403 |

---

<div align="center">

**⭐ Made with love by the NIST Astronomy Club ⭐**

*NIST University · Pallur Hills · Berhampur · Odisha · India*

<br/>

[![Visit NIST University](https://img.shields.io/badge/🏫_Visit_NIST_University-www.nist.edu-%23F5A623?style=for-the-badge)](https://www.nist.edu/)

</div>
