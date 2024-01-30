let cvInput2 = document.getElementById("cvInput");
let mlInput2 = document.getElementById("mlInput");

let cvFileName = document.getElementById("cvFileName");
let mlFileName = document.getElementById("mlFileName");

cvInput2.addEventListener("change", () => {
  let inputDocument = cvInput2.files[0];

  cvFileName.innerText = inputDocument.name;
  cvFileName.style.color = "black";
});

mlInput2.addEventListener("change", () => {
  let inputDocument = mlInput2.files[0];

  mlFileName.innerText = inputDocument.name;
  mlFileName.style.color = "black";
});
