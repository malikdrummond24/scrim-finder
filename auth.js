const firebaseConfig = {
    apiKey: "AIzaSyCK0oBB3baf4TrHPudWus2LK7KsRLsyVQ4",
    authDomain: "scrim-finder-de2a1.firebaseapp.com",
    projectId: "scrim-finder-de2a1",
    storageBucket: "scrim-finder-de2a1.firebasestorage.app",
    messagingSenderId: "413141139893",
    appId: "1:413141139893:web:82ad9108f6df55cdd519fc",
  };
  
  
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const errorDisplay = document.getElementById("error");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((err) => {
        errorDisplay.textContent = err.message;
      });
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((err) => {
        errorDisplay.textContent = err.message;
      });
  });
}


function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const emailEl = document.getElementById("userEmail");
    if (emailEl) {
      emailEl.textContent = `Logged in as: ${user.email}`;
    }
  }
});
  