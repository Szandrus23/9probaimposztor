let players = [];
let word = "";
let impostorIndex = -1;
let revealedCount = 0;

const words = [
  "alma", "iskola", "telefon", "nap", "autó", "ház", "hegy", "cukor", "virág", "számítógép",
  "repülő", "könyv", "pizza", "játék", "víz", "csillag", "erdő", "tenger", "vonat", "kamera"
];

const hints = {
  "alma": ["piros", "gyümölcs", "fáról esik"],
  "iskola": ["tanulás", "diákok", "osztály"],
  "telefon": ["hívás", "mobil", "zsebben van"],
  "nap": ["süt", "meleg", "ég"],
  "autó": ["vezet", "kerekek", "motor"],
  "ház": ["fal", "tető", "lakás"],
  "hegy": ["csúcs", "mászás", "túra"],
  "cukor": ["édes", "fehér", "kocka"],
  "virág": ["szirmok", "illat", "mező"],
  "számítógép": ["billentyűzet", "képernyő", "technológia"],
  "repülő": ["szárny", "felszáll", "légiközlekedés"],
  "könyv": ["oldal", "szöveg", "olvasás"],
  "pizza": ["sajt", "kerek", "olasz"],
  "játék": ["szórakozás", "gyerek", "doboz"],
  "víz": ["folyadék", "szomjúság", "ivás"],
  "csillag": ["ég", "fény", "éjjel"],
  "erdő": ["fák", "levelek", "állatok"],
  "tenger": ["só", "hullám", "nagy"],
  "vonat": ["sín", "állomás", "mozdony"],
  "kamera": ["fotó", "videó", "felvétel"]
};

function addPlayer() {
  const name = document.getElementById("player-name").value.trim();
  if (name) {
    players.push(name);
    document.getElementById("player-list").innerHTML += `<li>${name}</li>`;
    document.getElementById("player-name").value = "";
  }
}

function startGame() {
  if (players.length < 3) {
    alert("Legalább 3 játékos szükséges.");
    return;
  }

  word = words[Math.floor(Math.random() * words.length)];
  impostorIndex = Math.floor(Math.random() * players.length);
  revealedCount = 0;

  const revealList = document.getElementById("reveal-list");
  revealList.innerHTML = "";

  players.forEach((player, index) => {
    const li = document.createElement("li");
    li.textContent = player;
    li.onclick = () => {
      if (!li.classList.contains("revealed")) {
        li.classList.add("revealed");
        if (index === impostorIndex) {
          const hintsForWord = hints[word] || [];
          const randomHint = hintsForWord[Math.floor(Math.random() * hintsForWord.length)] || "Segítség nincs.";
          li.textContent = `${player}: ${randomHint} (te vagy az imposztor)`;
        } else {
          li.textContent = `${player}: ${word}`;
        }

        revealedCount++;
        if (revealedCount === players.length) {
          document.getElementById("reveal-impostor-btn").classList.remove("hidden");
        }
      }
    };
    revealList.appendChild(li);
  });

  document.getElementById("word-display").classList.remove("hidden");
  document.getElementById("impostor-result").classList.add("hidden");
}

function revealImpostor() {
  const resultDiv = document.getElementById("impostor-result");
  resultDiv.textContent = `Az imposztor: ${players[impostorIndex]}`;
  resultDiv.classList.remove("hidden");
}
