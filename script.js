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

  // Force Lock Control dropdown open
  const lockControlHeader = Array.from(document.querySelectorAll(".admin-dropdown"))
    .find(dropdown => dropdown.querySelector("h3")?.innerText.trim() === "Lock Control");

  if (lockControlHeader) {
    lockControlHeader.classList.add("open");
  } else {
    console.warn("Lock Control dropdown not found");
  }

  const adminLockList = document.getElementById("adminLocksList");
  if (!adminLockList) {
    console.error("adminLocksList not found in DOM");
    return;
  }

  const allLocks = ["Main Door", "Garage", "Back Gate", "Server Room"];
  adminLockList.innerHTML = ""; 

  allLocks.forEach(lockName => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${lockName}</span>
      <button onclick="unlock('${lockName}')">Unlock</button>
    `;
    adminLockList.appendChild(li);
  });

  console.log("✅ Admin locks rendered.");
}

   else {
    document.getElementById("user-dashboard").style.display = "block";
    document.getElementById("user").innerText = email;

    
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