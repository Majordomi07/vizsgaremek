/* -------------------------------------------------------------------------- */
/*                               Login / Logout                               */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  fetch("/auth/logged-in")
    .then((response) => {
      if (response.ok) {
        const buttons = document.querySelectorAll("#loginButton");

        buttons.forEach((button) => {
          button.textContent = "Kijelentkezés";
          button.href = "/auth/logout";
        });
      } else {
        const buttons = document.querySelectorAll("#loginButton");

        buttons.forEach((button) => {
          button.textContent = "Bejelentkezés";
          button.href = "/login";
        });
      }
    })
    .catch((error) => console.error("Hiba a fetch kérés során:", error));
});

const loginButtons = document.querySelectorAll("#loginButton");

/* -------------------------------------------------------------------------- */
/*                                 Login Click                                */
/* -------------------------------------------------------------------------- */

loginButtons.forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    fetch("/auth/logged-in")
      .then((response) => {
        if (response.ok) {
          localStorage.setItem("successfulLogout", "popup");
          window.location.href = "/auth/logout";
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.error("Hiba a fetch kérés során:", error));
  });
});
