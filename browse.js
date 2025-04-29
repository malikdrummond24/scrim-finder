// 🔐 Paste your Firebase config here (same as app.js)
const firebaseConfig = {
  apiKey: "AIzaSyCK0oBB3baf4TrHPudWus2LK7KsRLsyVQ4",
  authDomain: "scrim-finder-de2a1.firebaseapp.com",
  projectId: "scrim-finder-de2a1",
  storageBucket: "scrim-finder-de2a1.firebasestorage.app",
  messagingSenderId: "413141139893",
  appId: "1:413141139893:web:82ad9108f6df55cdd519fc"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let currentUser = null;

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    currentUser = user;
  }
});

const scrimList = document.getElementById("scrimList");
const gameFilter = document.getElementById("gameFilter");
const searchInput = document.getElementById("searchInput");

let allScrims = [];

db.collection("scrims")
  .orderBy("timestamp", "desc")
  .get()
  .then((querySnapshot) => {
    allScrims = [];
    querySnapshot.forEach((doc) => {
      allScrims.push({ id: doc.id, ...doc.data() }); // ✅ include ID for delete
    });
    displayScrims(allScrims);
  });

function displayScrims(scrims) {
  scrimList.innerHTML = '';

  scrims.forEach((data) => {
    const card = document.createElement("div");
    card.className = "bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 w-full mb-4";

    card.innerHTML = `
      <h2 class="text-xl font-semibold text-blue-400">${data.game} — ${data.rank}</h2>
      <p><span class="font-semibold text-gray-300">Region:</span> ${data.region}</p>
      <p><span class="font-semibold text-gray-300">Time:</span> ${data.time}</p>
      <p class="text-sm text-gray-400 mt-1"><span class="font-semibold text-gray-300">Notes:</span> ${data.notes}</p>
      <p class="text-xs text-gray-500 mt-2 italic">Posted by: ${data.email}</p>
      ${currentUser && currentUser.email === data.email ? `
        <button class="mt-2 text-red-400 hover:text-red-600 text-sm underline" data-id="${data.id}">
          Delete
        </button>` : ``}
    `;

    scrimList.appendChild(card);
  });
}

function applyFilters() {
  const gameVal = gameFilter.value.toLowerCase();
  const searchVal = searchInput.value.toLowerCase();

  const filtered = allScrims.filter((s) => {
    const matchesGame = gameVal ? s.game.toLowerCase() === gameVal : true;
    const matchesSearch =
      s.rank.toLowerCase().includes(searchVal) ||
      s.time.toLowerCase().includes(searchVal) ||
      s.notes.toLowerCase().includes(searchVal);

    return matchesGame && matchesSearch;
  });

  displayScrims(filtered);
}

// Live filtering
gameFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

// 🔥 Delete Scrim
scrimList.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.id) {
    const confirmDelete = confirm("Are you sure you want to delete this scrim?");
    if (confirmDelete) {
      await db.collection("scrims").doc(e.target.dataset.id).delete();
      location.reload(); // optional: can re-call displayScrims instead
    }
  }
});