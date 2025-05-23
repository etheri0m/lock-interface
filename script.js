function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const user = mockUsers.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  document.getElementById("login-section").style.display = "none";

  if (user.role === "admin") {
    document.getElementById("admin-dashboard").style.display = "block";
    loadUsers();
  } else {
    document.getElementById("user-dashboard").style.display = "block";
    document.getElementById("user").innerText = email;
  }
}

function logout() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("admin-dashboard").style.display = "none";
  document.getElementById("user-dashboard").style.display = "none";
}

function unlock() {
  // Implement unlock request
  alert("Unlock request sent!");
}
const mockUsers = [
  {
    email: "alaa.albasha@student.fh-kiel.de",
    password: "adminpass",
    role: "admin"
  },
  {
    email: "admin2@example.com",
    password: "secureadmin",
    role: "admin"
  },
  {
    email: "ahmed.ennour12@gmail.com",
    password: "userpass",
    role: "user"
  },
  {
    email: "user2@example.com",
    password: "123456",
    role: "user"
  }
];
function toggleDropdown(header) {
  const container = header.parentElement;
  container.classList.toggle("open");
}