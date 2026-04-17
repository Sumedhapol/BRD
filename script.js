function showPopup(message, type) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  const popupContent = document.getElementById("popupContent");

  popupText.textContent = message;

  popupContent.className = "popup-content";

  if (type === "low") {
    popupContent.classList.add("popup-low");
  } else if (type === "high") {
    popupContent.classList.add("popup-high");
  } else {
    popupContent.classList.add("popup-welcome");
  }

  popup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

window.onload = function () {
  showPopup(
    "Welcome to the Burnout Risk Dashboard.\n\nEnter your daily sleep, stress level, study hours, and mood score to calculate your burnout risk.\n\nThis tool is designed to help you reflect on your habits and recognize early signs of burnout.",
    "welcome"
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
    showPopup(
      "Please complete all fields before calculating your burnout risk.",
      "welcome"
    );
    return;
  }

  if (stress < 1 || stress > 10) {
    showPopup("Stress level must be between 1 and 10.", "welcome");
    return;
  }

  if (mood < 1 || mood > 10) {
    showPopup("Mood score must be between 1 and 10.", "welcome");
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
  } else if (score === 5) {
    levelText = "Moderate Risk";
    messageText =
      "Your entries show some warning signs of burnout. Consider improving rest, stress management, or workload balance.";
    riskClass = "moderate";
  } else {
    levelText = "High Risk";
    messageText =
      "Your current habits suggest a high burnout risk. Consider resting more, reducing overload, and reaching out for support if needed.";
    riskClass = "high";
  }

  scoreDisplay.textContent = score;
  riskLevel.textContent = levelText;
  riskLevel.className = "risk-pill " + riskClass;
  riskMessage.textContent = messageText;

  setTimeout(() => {
    if (score <= 4) {
      showPopup(
        "Great job.\n\nYou are on the right track and currently showing a lower risk of burnout.\n\nKeep maintaining healthy habits with sleep, stress management, and balanced study time.",
        "low"
      );
    } else if (score >= 6) {
      showPopup(
        "You may be at risk of burnout.\n\nHere are some ways to lower your risk:\n• Try to get more sleep each night\n• Take breaks during long study sessions\n• Spread work out over time instead of cramming\n• Use stress-relief habits like walking, stretching, or deep breathing\n• Reach out for support if you are feeling overwhelmed",
        "high"
      );
    }
  }, 100);
});

resetBtn.addEventListener("click", function () {
  burnoutForm.reset();
  scoreDisplay.textContent = "0";
  riskLevel.textContent = "Low Risk";
  riskLevel.className = "risk-pill low";
  riskMessage.textContent =
    "Enter your daily wellness information below to calculate your burnout score.";
});
