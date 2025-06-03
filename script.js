const mockUsers = [
  { email: "alaa.albasha@student.fh-kiel.de", password: "adminpass", role: "admin" },
  { email: "admin2@example.com", password: "secureadmin", role: "admin" },
  //thatsright_u_ma_bitchuser
  { email: "ahmed.ennour12@gmail.com", password: "userpass", role: "user" },
  { email: "user2@example.com", password: "123456", role: "user" }
];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdown-toggle").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-content").forEach(content => {
        if (content !== button.nextElementSibling) {
          content.style.display = "none";
        }
      });
      const content = button.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = mockUsers.find(u => u.email === email && u.password === password);

  if (!user) {
    showMessage("Invalid email or password.");
    return;
  }
//AhmAAAd_Elzamel
  document.getElementById("login-section").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  document.getElementById("user-email").innerText = email;
  document.getElementById("user-role").innerText = user.role;

  // Zeige/Verstecke Karten je nach Rolle
  const cards = document.querySelectorAll("#dashboard .card");
  cards.forEach(card => card.style.display = "none");

  cards[0].style.display = "block"; // User Info
  cards[1].style.display = "block"; // Lock Control

  if (user.role === "admin") {
    cards[2].style.display = "block"; // Register User
    cards[3].style.display = "block"; // Manage Users
    cards[4].style.display = "block"; // RFID Scan
  }

  // Lockliste füllen
  const locks = user.role === "admin" 
    ? ["Closet 1", "Closet 2", "Closet 3", "Closet 4"]
    : ["Closet 1", "Closet 2", "Closet 3"];

  const locksList = document.getElementById("locks-list");
  locksList.innerHTML = "";
  locks.forEach(lock => {
    const div = document.createElement("div");
    div.innerHTML = `<span>${lock}</span> <button onclick="unlock('${lock}')">Unlock</button>`;
    locksList.appendChild(div);
  });
}

function logout() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
  clearInputs();
}

function unlock(lockName) {
  showMessage(`Unlock request sent for: ${lockName}`);
}

function registerUser() {
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;
  const role = document.getElementById("newRole").value;

  if (!email || !password) {
    showMessage("Please fill out all registration fields.");
    return;
  }

  if (mockUsers.find(u => u.email === email)) {
    showMessage("User already exists.");
    return;
  }

  mockUsers.push({ email, password, role });
  showMessage(`User ${email} registered successfully.`);
  renderUserList();
}

function renderUserList() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";
  mockUsers.forEach((u, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${u.email} (${u.role}) <button onclick="deleteUser(${i})">Delete</button>`;
    userList.appendChild(li);
  });
}

function deleteUser(index) {
  const user = mockUsers[index];
  if (confirm(`Are you sure you want to delete ${user.email}?`)) {
    mockUsers.splice(index, 1);
    renderUserList();
    showMessage(`User ${user.email} removed.`);
  }
}

function assignCard() {
  const scannedUID = document.getElementById("scannedUID").innerText;
  if (scannedUID === "None") {
    showMessage("No card scanned.");
    return;
  }
  showMessage(`RFID card ${scannedUID} assigned successfully.`);
}

function simulateCardScan(uid = "ABC123XYZ") {
  document.getElementById("scannedUID").innerText = uid;
  document.getElementById("scannedUser").innerText = "Not found";
}

function clearInputs() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

function showMessage(msg) {
  const box = document.getElementById("message-box");
  box.innerText = msg;
  box.style.display = "block";
  setTimeout(() => {
    box.style.display = "none";
  }, 4000);
}
