const burnoutForm = document.getElementById("burnoutForm");
const scoreDisplay = document.getElementById("scoreDisplay");
const riskLevel = document.getElementById("riskLevel");
const riskMessage = document.getElementById("riskMessage");

burnoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const sleep = parseFloat(document.getElementById("sleep").value);
  const stress = parseInt(document.getElementById("stress").value);
  const study = parseFloat(document.getElementById("study").value);
  const mood = parseInt(document.getElementById("mood").value);

  let score = 0;

  if (sleep < 6) {
    score += 2;
  }

  if (stress > 7) {
    score += 2;
  }

  if (study > 8) {
    score += 1;
  }

  if (mood < 4) {
    score += 2;
  }

  let levelText = "";
  let messageText = "";
  let riskClass = "";

  if (score <= 2) {
    levelText = "Low Risk";
    messageText = "Your current habits suggest a lower burnout risk, but continue tracking daily patterns.";
    riskClass = "low";
  } else if (score <= 5) {
    levelText = "Moderate Risk";
    messageText = "Your entries show some warning signs of burnout. Consider improving sleep, stress management, or workload balance.";
    riskClass = "moderate";
  } else {
    levelText = "High Risk";
    messageText = "Your current habits suggest a high burnout risk. It may help to reduce workload, rest more, and seek support if needed.";
    riskClass = "high";
  }

  scoreDisplay.textContent = score;
  riskLevel.textContent = levelText;
  riskLevel.className = "risk " + riskClass;
  riskMessage.textContent = messageText;
});
