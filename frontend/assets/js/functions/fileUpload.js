document.addEventListener("DOMContentLoaded", () => {
  setTimeout(function () {
    let cvInput = document.getElementById("cvInput");
    let mlInput = document.getElementById("mlInput");

    let cvFileName = document.getElementById("cvFileName");
    let mlFileName = document.getElementById("mlFileName");

    cvInput.addEventListener("change", () => {
      let inputDocument = cvInput.files[0];

      cvFileName.innerText = inputDocument.name;
      cvFileName.style.color = "black";
    });

    mlInput.addEventListener("change", () => {
      let inputDocument = mlInput.files[0];

      mlFileName.innerText = inputDocument.name;
      mlFileName.style.color = "black";
    });
  }, 1000);
});

function resetFileUpload() {
  let cvFileName = document.getElementById("cvFileName");
  let mlFileName = document.getElementById("mlFileName");

  cvFileName.innerText = "Nincs kiválasztva";
  cvFileName.style.color = "#8d8d8d";
  mlFileName.innerText = "Nincs kiválasztva";
  mlFileName.style.color = "#8d8d8d";
}
