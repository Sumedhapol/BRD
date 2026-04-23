const API_BASE = "/api";
let chartInstance = null;

document.getElementById("burnoutForm").addEventListener("submit", saveEntry);

window.onload = function () {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  if (token) {
    showApp(name);
    loadEntries();
    loadWeeklyChart();
  }
};

async function register() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    return alert(data.message);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("name", data.user.name);
  showApp(data.user.name);
  loadEntries();
  loadWeeklyChart();
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    return alert(data.message);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("name", data.user.name);
  showApp(data.user.name);
  loadEntries();
  loadWeeklyChart();
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  location.reload();
}

function showApp(name) {
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("appSection").classList.remove("hidden");
  document.getElementById("welcomeUser").textContent = `Welcome, ${name}`;
}

async function saveEntry(event) {
  event.preventDefault();

  const sleep = parseFloat(document.getElementById("sleep").value);
  const stress = parseInt(document.getElementById("stress").value);
  const study = parseFloat(document.getElementById("study").value);
  const mood = parseInt(document.getElementById("mood").value);

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ sleep, stress, study, mood })
  });

  const data = await res.json();

  if (!res.ok) {
    return alert(data.message);
  }

  document.getElementById("scoreDisplay").textContent = data.score;
  document.getElementById("riskLevel").textContent = data.riskLevel;
  document.getElementById("riskLevel").className =
    "risk-pill " +
    (data.riskLevel === "Low Risk"
      ? "low"
      : data.riskLevel === "Moderate Risk"
      ? "moderate"
      : "high");

  document.getElementById("riskMessage").textContent =
    data.riskLevel === "Low Risk"
      ? "You are on the right track."
      : data.riskLevel === "Moderate Risk"
      ? "You may be showing some early warning signs of burnout."
      : "You may be at high risk of burnout. Try to rest, reduce overload, and seek support.";

  document.getElementById("burnoutForm").reset();
  loadEntries();
  loadWeeklyChart();
}

async function loadEntries() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/entries`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const entries = await res.json();
  const table = document.getElementById("historyTable");
  table.innerHTML = "";

  entries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${new Date(entry.createdAt).toLocaleDateString()}</td>
      <td>${entry.score}</td>
      <td>${entry.riskLevel}</td>
    `;
    table.appendChild(row);
  });
}

async function loadWeeklyChart() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/entries/weekly`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const entries = await res.json();

  const labels = entries.map((entry) =>
    new Date(entry.createdAt).toLocaleDateString()
  );
  const scores = entries.map((entry) => entry.score);

  const ctx = document.getElementById("riskChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Burnout Score",
          data: scores,
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 7
        }
      }
    }
  });
}
