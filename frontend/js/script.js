document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // TEMPORARY (for testing before backend)
    if (email && password) {
        alert("Login successful (demo)");
        window.location.href = "dashboard.html";
    } else {
        alert("Please fill in all fields");
    }
});
