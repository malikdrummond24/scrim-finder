const firebaseConfig = {
    apiKey: "AIzaSyCK0oBB3baf4TrHPudWus2LK7KsRLsyVQ4",
  authDomain: "scrim-finder-de2a1.firebaseapp.com",
  projectId: "scrim-finder-de2a1",
  storageBucket: "scrim-finder-de2a1.firebasestorage.app",
  messagingSenderId: "413141139893",
  appId: "1:413141139893:web:82ad9108f6df55cdd519fc",
  };
  
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }
  
    
    const emailEl = document.getElementById("userEmail");
    if (emailEl) {
      emailEl.textContent = `Logged in as: ${user.email}`;
    }
  
    document.getElementById("scrimForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const game = document.getElementById("game").value;
      const rank = document.getElementById("rank").value;
      const region = document.getElementById("region").value;
      const time = document.getElementById("time").value;
      const notes = document.getElementById("notes").value;
  
      await db.collection("scrims").add({
        game,
        rank,
        region,
        time,
        notes,
        email: user.email, 
        timestamp: new Date()
      });
  
      alert("Scrim posted!");
      document.getElementById("scrimForm").reset();
    });
  });
  