let companyLogo = document.getElementById("companyLogo");

let companyLogoFileName = document.getElementById("companyLogoFileName");

companyLogo.addEventListener("change", () => {
  let inputDocument = companyLogo.files[0];

  companyLogoFileName.innerText = inputDocument.name;
  companyLogoFileName.style.color = "black";
});
