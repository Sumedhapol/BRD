window.onload = function () {
  alert(
    "Welcome to the Burnout Risk Dashboard.\n\n" +
    "Use this tool to enter your daily sleep, stress level, study hours, and mood score. " +
    "Once you calculate your result, the dashboard will show your current burnout risk and helpful feedback."
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

  if (isNaN(sleep) || isNaN(stress) || isNaN(study) || isNaN(mood)) {
    alert("Please complete all fields before calculating your burnout risk.");
    return;
  }

  if (stress < 1 || stress > 10) {
    alert("Stress level must be between 1 and 10.");
    return;
  }

  if (mood < 1 || mood > 10) {
    alert("Mood score must be between 1 and 10.");
    return;
  }

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

  if (score <= 4) {
    levelText = "Low Risk";
    messageText =
      "Your current habits suggest a lower burnout risk. Keep maintaining a healthy routine.";
    riskClass = "low";

    alert(
      "Good job.\n\n" +
      "You are on the right track and currently showing a lower risk of burnout.\n\n" +
      "Keep maintaining healthy habits with sleep, stress management, and balanced study time."
    );
  } else if (score <= 5) {
    levelText = "Moderate Risk";
    messageText =
      "Your entries show some warning signs of burnout. Consider improving rest, stress management, or workload balance.";
    riskClass = "moderate";
  } else {
    levelText = "High Risk";
    messageText =
      "Your current habits suggest a high burnout risk. Consider resting more, reducing overload, and reaching out for support if needed.";
    riskClass = "high";

    alert(
      "You may be at risk of burnout.\n\n" +
      "Here are some ways to lower your risk:\n" +
      "• Try to get more sleep each night\n" +
      "• Take breaks during long study sessions\n" +
      "• Spread work out over time instead of cramming\n" +
      "• Use stress-relief habits like walking, stretching, or deep breathing\n" +
      "• Reach out for support if you are feeling overwhelmed"
    );
  }

  scoreDisplay.textContent = score;
  riskLevel.textContent = levelText;
  riskLevel.className = "risk-pill " + riskClass;
  riskMessage.textContent = messageText;

  /* NOW show popup AFTER UI updates */
setTimeout(() => {
  if (score <= 4) {
    showPopup(
      "Great job! 🎉\n\nYou're on the right track and maintaining a healthy balance.\n\nKeep it up!"
    );
  } else if (score >= 6) {
    showPopup(
      "⚠️ Burnout Risk Warning\n\nYou may be at risk of burnout.\n\nTry:\n• Getting more sleep\n• Taking study breaks\n• Reducing workload\n• Managing stress\n• Reaching out for support"
    );
  }
}, 100);

resetBtn.addEventListener("click", function () {
  burnoutForm.reset();
  scoreDisplay.textContent = "0";
  riskLevel.textContent = "Low Risk";
  riskLevel.className = "risk-pill low";
  riskMessage.textContent =
    "Enter your daily wellness information below to calculate your burnout score.";
});
