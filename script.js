window.onload = function () {
  alert(
    "Welcome to the Burnout Risk Dashboard 👋\n\n" +
    "Track your daily habits and understand your burnout risk.\n\n" +
    "Enter your sleep, stress, study hours, and mood below, then click 'Calculate Burnout Risk' to see your results."
  );
};

const burnoutForm = document.getElementById("burnoutForm");
const scoreDisplay = document.getElementById("scoreDisplay");
const riskLevel = document.getElementById("riskLevel");
const riskMessage = document.getElementById("riskMessage");
const resetBtn = document.getElementById("resetBtn");

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
  messageText =
    "Your current habits suggest a lower burnout risk. Keep maintaining a healthy routine.";
  riskClass = "low";

  alert(
    "Great job! 🎉\n\n" +
    "You are currently at low risk of burnout.\n\n" +
    "Keep up your healthy habits and continue maintaining a good balance between work, rest, and stress."
  );

} else if (score <= 5) {
  levelText = "Moderate Risk";
  messageText =
    "Your entries show some warning signs of burnout. Consider improving sleep, stress management, or workload balance.";
  riskClass = "moderate";

} else {
  levelText = "High Risk";
  messageText =
    "Your current habits suggest a high burnout risk. Consider resting more, reducing overload, and seeking support if needed.";
  riskClass = "high";

  alert(
    "⚠️ Burnout Risk Warning\n\n" +
    "Your score indicates a high risk of burnout.\n\n" +
    "Here are some tips to help reduce your risk:\n" +
    "• Get at least 6–8 hours of sleep\n" +
    "• Take breaks during long study sessions\n" +
    "• Manage stress with relaxation techniques\n" +
    "• Avoid overloading your schedule\n" +
    "• Talk to someone if you're feeling overwhelmed"
  );
}

  scoreDisplay.textContent = score;
  riskLevel.textContent = levelText;
  riskLevel.className = "risk-pill " + riskClass;
  riskMessage.textContent = messageText;
});

resetBtn.addEventListener("click", function () {
  burnoutForm.reset();
  scoreDisplay.textContent = "0";
  riskLevel.textContent = "Low Risk";
  riskLevel.className = "risk-pill low";
  riskMessage.textContent =
    "Enter your daily wellness information below to calculate your burnout score.";
});
