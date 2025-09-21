// navbar.js
async function loadNavbar({ protectedPage = false } = {}) {
  const navLinks = document.getElementById("nav-links");
  if (!navLinks) {
    console.error("navbar.js: #nav-links element not found in DOM");
    return;
  }

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const renderGuest = () => {
    navLinks.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
    `;
  };

  const renderUserNav = (user) => {
    navLinks.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="service.html">Services</a></li>
      <li class="nav-item"><a class="nav-link" href="booking.html">Booking</a></li>
      <li class="nav-item"><a class="nav-link" href="bill.html">My Bills</a></li>
      <li class="nav-item dropdown">
        <a class="btn btn-light dropdown-toggle ms-2" href="#" role="button" data-bs-toggle="dropdown">
          👤 ${escapeHtml(user.name || "User")}
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><span class="dropdown-item-text"><strong>Email:</strong> ${escapeHtml(user.email || "Unknown")}</span></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
        </ul>
      </li>
    `;

    // logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "index.html";
      });
    }

    // highlight current page
    const currentPage = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#nav-links .nav-link").forEach(link => {
      if (link.getAttribute("href") === currentPage) link.classList.add("active");
    });
  };

  // simple escape to avoid accidental injection if user-controlled strings are present
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 1) No token and no stored user => guest
  if (!token && !storedUser) {
    if (protectedPage) {
      // redirect guests from protected pages
      window.location.href = "login.html";
      return;
    }
    renderGuest();
    return;
  }

  // 2) No token but stored user (development fallback) => treat as logged-in
  if (!token && storedUser) {
    try {
      const user = JSON.parse(storedUser);
      renderUserNav(user);
    } catch (e) {
      console.warn("navbar.js: invalid user in localStorage, clearing", e);
      localStorage.removeItem("user");
      renderGuest();
    }
    return;
  }

  // 3) token exists: attempt to validate with API; if API fails, fall back to localStorage user if present
  try {
    const res = await fetch("/api/auth/me", {
      headers: { "Authorization": "Bearer " + token },
    });

    if (res.ok) {
      const user = await res.json();
      // keep a cached user locally (handy if API goes unavailable)
      try { localStorage.setItem("user", JSON.stringify(user)); } catch (e) { /* ignore storage errors */ }
      renderUserNav(user);
      return;
    } else {
      // token invalid or expired
      console.warn("navbar.js: /api/auth/me returned", res.status);
      localStorage.removeItem("token");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          renderUserNav(user);
          return;
        } catch (e) {
          localStorage.removeItem("user");
        }
      }
      if (protectedPage) {
        window.location.href = "login.html";
        return;
      }
      renderGuest();
      return;
    }
  } catch (err) {
    // network error / API not present
    console.warn("navbar.js: auth API unavailable —", err);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        renderUserNav(user);
        return;
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    if (protectedPage) {
      window.location.href = "login.html";
      return;
    }
    renderGuest();
    return;
  }
}
