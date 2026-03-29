<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBgeTiuAJMFuOfjagGNnk3ozcYWzeqAMxU",
    authDomain: "nist-astronomy-club.firebaseapp.com",
    projectId: "nist-astronomy-club",
    storageBucket: "nist-astronomy-club.firebasestorage.app",
    messagingSenderId: "967539338705",
    appId: "1:967539338705:web:2ef2b958510f70ae4704f0",
    measurementId: "G-0KZWVY9Z74"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
