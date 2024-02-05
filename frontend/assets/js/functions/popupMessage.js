/* --------------------------- Successful register -------------------------- */

document.addEventListener("DOMContentLoaded", () => {
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
});

/* ---------------------------- Successful login ---------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  function slideInSuccessfulLogin() {
    const popup = document.getElementById("successfulLogin");
    popup.classList.add("show");
  }

  function slideOutSuccessfulLogin() {
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
      slideOutSuccessfulLogin();
    }, 5000);
  }
});

/* --------------------------- Successful logout ---------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  function slideInSuccessfulLogout() {
    const popup = document.getElementById("successfulLogout");
    popup.classList.add("show");
  }

  function slideOutSuccessfulLogout() {
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
      slideOutSuccessfulLogout();
    }, 5000);
  }
});

/* --------------------------- ControlPanel error --------------------------- */

document.addEventListener("DOMContentLoaded", () => {
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

/* ------------------------------- Edit success ------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  function slideInSuccessfulEdit() {
    const popup = document.getElementById("successfulEdit");
    popup.classList.add("show");
  }

  function slideOutSuccessfulEdit() {
    const popup = document.getElementById("successfulEdit");
    popup.classList.remove("show");
  }

  var storageData = localStorage.getItem("successfulEdit");

  if (storageData) {
    popupSuccessfulEdit();

    localStorage.removeItem("successfulEdit");
  }

  function popupSuccessfulEdit() {
    slideInSuccessfulEdit();

    setTimeout(() => {
      slideOutSuccessfulEdit();
    }, 5000);
  }
});

/* ----------------------------- Delete success ------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  function slideInSuccessfulDelete() {
    const popup = document.getElementById("successfulDelete");
    popup.classList.add("show");
  }

  function slideOutSuccessfulDelete() {
    const popup = document.getElementById("successfulDelete");
    popup.classList.remove("show");
  }

  var storageData = localStorage.getItem("successfulDelete");

  if (storageData) {
    popupSuccessfulDelete();

    localStorage.removeItem("successfulDelete");
  }

  function popupSuccessfulDelete() {
    slideInSuccessfulDelete();

    setTimeout(() => {
      slideOutSuccessfulDelete();
    }, 5000);
  }
});

/* --------------------------- Successful contact --------------------------- */

function slideInsuccessfulContact() {
  const popup = document.getElementById("successfulContact");
  popup.classList.add("show");
}

function slideOutsuccessfulContact() {
  const popup = document.getElementById("successfulContact");
  popup.classList.remove("show");
}

function popupsuccessfulContact() {
  slideInsuccessfulContact();

  setTimeout(() => {
    slideOutsuccessfulContact();
  }, 5000);
}

/* --------------------------- Successful contact --------------------------- */

function slideIncontactError() {
  const popup = document.getElementById("contactError");
  popup.classList.add("show");
}

function slideOutcontactError() {
  const popup = document.getElementById("contactError");
  popup.classList.remove("show");
}

function popupcontactError() {
  slideIncontactError();

  setTimeout(() => {
    slideOutcontactError();
  }, 5000);
}
