function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  document.getElementById("login-section").style.display = "none";
  
  if (user.role === "admin") {
    document.getElementById("admin-dashboard").style.display = "flex";
    loadUsers();
  } else {
    document.getElementById("user-dashboard").style.display = "block";
    document.getElementById("user").innerText = email;

    // Simulate assigned locks
    const locks = ["Closet 1", "Closet 2", "Closet 3"];
    const lockList = document.getElementById("userLocksList");
    lockList.innerHTML = "";

    locks.forEach(lockName => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${lockName}</span>
        <button onclick="unlock('${lockName}')">Unlock</button>
      `;
      lockList.appendChild(li);
    });
  }
}

function logout() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("admin-dashboard").style.display = "none";
  document.getElementById("user-dashboard").style.display = "none";
}

function unlock(lockName) {
  alert(`Unlock request sent for: ${lockName}`);
  // TODO: Send fetch request to backend for specific lock
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