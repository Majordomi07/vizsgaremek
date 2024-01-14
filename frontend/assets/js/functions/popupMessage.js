/* --------------------------- Successful register -------------------------- */

function slideInSuccessfulRegister() {
  const popup = document.getElementById("successfulRegister");
  popup.classList.add("show");
}

function slideOutSuccessfulRegister() {
  const popup = document.getElementById("successfulRegister");
  popup.classList.remove("show");
}

var storageData = localStorage.getItem("successfulRegister");

if (storageData) {
  popupSuccessfulRegister();

  localStorage.removeItem("successfulRegister");
}

function popupSuccessfulRegister() {
  slideInSuccessfulRegister();

  setTimeout(() => {
    slideOutSuccessfulRegister();
  }, 5000);
}

/* ---------------------------- Successful login ---------------------------- */

function slideInSuccessfulLogin() {
  const popup = document.getElementById("successfulLogin");
  popup.classList.add("show");
}

function slideOutSuccesfulLogin() {
  const popup = document.getElementById("successfulLogin");
  popup.classList.remove("show");
}

var storageData = localStorage.getItem("successfulLogin");

if (storageData) {
  popupSuccessfulLogin();

  localStorage.removeItem("successfulLogin");
}

function popupSuccessfulLogin() {
  slideInSuccessfulLogin();

  setTimeout(() => {
    slideOutSuccesfulLogin();
  }, 5000);
}

/* --------------------------- Successful logout ---------------------------- */

function slideInSuccessfulLogout() {
  const popup = document.getElementById("successfulLogout");
  popup.classList.add("show");
}

function slideOutSuccesfulLogout() {
  const popup = document.getElementById("successfulLogout");
  popup.classList.remove("show");
}

var storageData = localStorage.getItem("successfulLogout");

if (storageData) {
  popupSuccessfulLogout();

  localStorage.removeItem("successfulLogout");
}

function popupSuccessfulLogout() {
  slideInSuccessfulLogout();

  setTimeout(() => {
    slideOutSuccesfulLogout();
  }, 5000);
}

/* --------------------------- ControlPanel error --------------------------- */

function slideInControlPanelAuthError() {
  const popup = document.getElementById("controlPanelAuthError");
  popup.classList.add("show");
}

function slideOutControlPanelAuthError() {
  const popup = document.getElementById("controlPanelAuthError");
  popup.classList.remove("show");
}

function popupControlPanelAuthError() {
  slideInControlPanelAuthError();

  setTimeout(() => {
    slideOutControlPanelAuthError();
  }, 5000);
}

function slideInControlPanelCompanyError() {
  const popup = document.getElementById("controlPanelCompanyError");
  popup.classList.add("show");
}

function slideOutControlPanelCompanyError() {
  const popup = document.getElementById("controlPanelCompanyError");
  popup.classList.remove("show");
}

function popupControlPanelCompanyError() {
  slideInControlPanelCompanyError();

  setTimeout(() => {
    slideOutControlPanelCompanyError();
  }, 5000);
}

const controlPanelLinks = document.querySelectorAll(".controlPanel");

controlPanelLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/controlPanel/company");

      if (response.ok) {
        try {
          const response = await fetch("/controlPanel/company/registered-company");
          const data = await response.json();

          if (data.userExists) {
            console.log(data);
            window.location.href = "/controlPanel/company";
          } else {
            popupControlPanelCompanyError();
          }
        } catch (error) {
          console.error("Hiba a fetchelés során:", error);
        }
      } else {
        popupControlPanelAuthError();
      }
    } catch (error) {
      console.log("Hiba történt: " + error.message);
    }
  });
});

/* ------------------------------- Login error ------------------------------ */

function slideInLoginError() {
  const popup = document.getElementById("loginError");
  popup.classList.add("show");
}

function slideOutLoginError() {
  const popup = document.getElementById("loginError");
  popup.classList.remove("show");
}

function popupLoginError() {
  slideInLoginError();

  setTimeout(() => {
    slideOutLoginError();
  }, 5000);
}
