function slideInMessageSuccess() {
  const popup = document.getElementById("success");
  popup.classList.add("show");
}

function slideOutMessageSucces() {
  const popup = document.getElementById("success");
  popup.classList.remove("show");
}

function slideInMessageError() {
  const popup = document.getElementById("error");
  popup.classList.add("show");
}

function slideOutMessageError() {
  const popup = document.getElementById("error");
  popup.classList.remove("show");
}

if (window.location.hash === "#successful-registration") {
  popupMessageSuccess();
}

if (window.location.hash === "#successful-login") {
  popupMessageSuccess();
}

function popupMessageSuccess() {
  slideOutMessageError();
  slideInMessageSuccess();

  setTimeout(() => {
    slideOutMessageSucces();
  }, 5000);
}

function popupMessageError() {
  slideOutMessageSucces();
  slideInMessageError();

  setTimeout(() => {
    slideOutMessageError();
  }, 5000);
}
