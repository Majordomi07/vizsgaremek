/* -------------------------------------------------------------------------- */
/*                                Token expire                                */
/* -------------------------------------------------------------------------- */

console.log(document.cookie);

/* -------------------------------------------------------------------------- */
/*                                Company info                                */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  fetch("/controlPanel/company/info")
    .then((response) => response.json())
    .then((data) => {
      const companyInfo = document.querySelector(".company-info");

      let tag;

      data.forEach((info) => {
        tag = document.createElement("h3");
        tag.textContent = "Céginformációk";
        companyInfo.appendChild(tag);

        tag = document.createElement("h4");
        tag.textContent = "Cégnév:";
        companyInfo.appendChild(tag);

        tag = document.createElement("p");
        tag.textContent = info.name;
        companyInfo.appendChild(tag);

        tag = document.createElement("h4");
        tag.textContent = "Céglogó:";
        companyInfo.appendChild(tag);

        tag = document.createElement("img");
        tag.src = "../assets/uploads/logo/" + info.logo;
        companyInfo.appendChild(tag);

        tag = document.createElement("h4");
        tag.textContent = "Cég leírás:";
        companyInfo.appendChild(tag);

        tag = document.createElement("p");
        tag.textContent = info.description;
        companyInfo.appendChild(tag);
      });
    })
    .catch((error) => console.error("Hiba a fetch kérés során:", error));
});

/* -------------------------------------------------------------------------- */
/*                              Nav company name                              */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  fetch("/controlPanel/company/info")
    .then((response) => response.json())
    .then((data) => {
      const companyName = document.querySelectorAll("#companyName");

      companyName.forEach((name) => {
        name.textContent = data[0].name;
      });
    })
    .catch((error) => console.error("Hiba a fetch kérés során:", error));
});
