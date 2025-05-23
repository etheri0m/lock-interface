function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://<YOUR-RPI-IP>:5000/locks_by_email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.locks) {
      document.getElementById("dashboard").style.display = "block";
      document.getElementById("user").innerText = email;
    }
  });
}

function unlock() {
  // Implement unlock request
  alert("Unlock request sent!");
}
