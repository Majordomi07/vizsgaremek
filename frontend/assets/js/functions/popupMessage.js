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
    slideOutSuccesfulRegister();
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

/* --------------------------- ControlPanel error --------------------------- */

function slideInControlPanelError() {
  const popup = document.getElementById("controlPanelError");
  popup.classList.add("show");
}

function slideOutControlPanelError() {
  const popup = document.getElementById("controlPanelError");
  popup.classList.remove("show");
}

function popupControlPanelError() {
  slideInControlPanelError();

  setTimeout(() => {
    slideOutControlPanelError();
  }, 5000);
}

document.getElementById("controlPanel").addEventListener("click", async () => {
  try {
    const response = await fetch("/admin/user");

    if (response.ok) {
      window.location.href = "/admin/user";
    } else {
      popupControlPanelError();
    }
  } catch (error) {
    console.log("Hiba történt: " + error.message);
  }
});

/* ------------------------------- Login error ------------------------------ */

function slideInloginError() {
  const popup = document.getElementById("loginError");
  popup.classList.add("show");
}

function slideOutloginError() {
  const popup = document.getElementById("loginError");
  popup.classList.remove("show");
}

function popuploginError() {
  slideInloginError();

  setTimeout(() => {
    slideOutloginError();
  }, 5000);
}
