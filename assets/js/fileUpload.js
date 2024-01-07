let cvInput = document.getElementById("cvInput");
let mlInput = document.getElementById("mlInput");

let cvFileName = document.getElementById("cvFileName");
let mlFileName = document.getElementById("mlFileName");

cvInput.addEventListener("change", () => {
  let inputDocument = cvInput.files[0];

  cvFileName.innerText = inputDocument.name;
});

mlInput.addEventListener("change", () => {
  let inputDocument = mlFileNameInput.files[0];

  mlFileName.innerText = inputDocument.name;
});
