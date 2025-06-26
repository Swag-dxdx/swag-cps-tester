const TOTAL_TIME = 5;
const ranks = [
  { min: 0, max: 2, label: "Slowpoke" },
  { min: 2, max: 3, label: "Developing" },
  { min: 3, max: 4, label: "Still under development" },
  { min: 4, max: 5, label: "Really close" },
  { min: 5, max: 6, label: "Avg. Minecrafter" },
  { min: 6, max: 7, label: "Good" },
  { min: 7, max: 8, label: "Nice" },
  { min: 8, max: 9, label: "Brave" },
  { min: 9, max: 10, label: "u r speed" },
  { min: 10, max: Infinity, label: "Flash" }
];

const clickArea = document.getElementById("clickArea");
const cpsBox = document.getElementById("cpsBox");
const clickBox = document.getElementById("clickBox");
const timeBox = document.getElementById("timeBox");
const rankBox = document.getElementById("rankBox");

// create dialog
const dialog = document.createElement("div");
dialog.className = "dialog";
dialog.innerHTML = `
  <h2>Time's Up!</h2>
  <p id="finalStats"></p>
  <button onclick="restart()">Try Again</button>
`;
document.body.appendChild(dialog);

let clicks = 0;
let elapsed = 0;
let timerId = null;
let running = false;

function updateUI() {
  const cps = elapsed ? clicks / elapsed : 0;
  cpsBox.textContent = `CPS: ${cps.toFixed(2)}`;
  clickBox.textContent = `Clicks: ${clicks}`;
  timeBox.textContent = `Time: ${Math.max(0, TOTAL_TIME - elapsed).toFixed(1)} s`;
}

function finish() {
  clearInterval(timerId);
  const cps = clicks / TOTAL_TIME;
  const rank = ranks.find(r => cps >= r.min && cps < r.max)?.label || "—";

  document.getElementById("finalStats").innerHTML = `
    <strong>Clicks:</strong> ${clicks}<br>
    <strong>CPS:</strong> ${cps.toFixed(2)}<br>
    <strong>Rank:</strong> ${rank}
  `;
  dialog.style.display = "block";
  rankBox.textContent = `Rank: ${rank}`;
  rankBox.classList.remove("hidden");
  running = false;
}

clickArea.addEventListener("click", () => {
  if (!running) {
    clicks = 0;
    elapsed = 0;
    rankBox.classList.add("hidden");
    dialog.style.display = "none";
    running = true;
    timerId = setInterval(() => {
      elapsed += 0.1;
      if (elapsed >= TOTAL_TIME) finish();
      updateUI();
    }, 100);
  }
  if (running) {
    clicks++;
    updateUI();
  }
});

function restart() {
  clicks = 0;
  elapsed = 0;
  running = false;
  dialog.style.display = "none";
  updateUI();
  rankBox.classList.add("hidden");
}

updateUI();