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

/* -------------------------------------------------------------------------- */
/*                            Applicants feltöltés                            */
/* -------------------------------------------------------------------------- */

const currentPath = window.location.pathname;
const idIndex = currentPath.lastIndexOf("/") + 1;
const advertisementID = currentPath.substring(idIndex);

fetch("/advertisement/getApplicants/" + advertisementID)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((applicant) => {
      createApplicantElement(applicant);
    });
  })
  .catch((error) => console.error("Hiba történt a fetch során:", error));

function createApplicantElement(applicant) {
  const applicantDiv = document.createElement("div");
  applicantDiv.classList.add("applicant");
  const h3 = document.createElement("h3");
  h3.textContent = applicant.lastName + " " + applicant.firstName;
  applicantDiv.appendChild(h3);

  const img = document.createElement("img");
  img.setAttribute("src", "/assets/images/icons/down-icon.svg");
  applicantDiv.appendChild(img);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const infosDiv = document.createElement("div");
  infosDiv.classList.add("infos");

  const p1 = document.createElement("p");
  p1.innerHTML = "<span>Vezetéknév:</span> " + applicant.lastName;
  infosDiv.appendChild(p1);

  const p2 = document.createElement("p");
  p2.innerHTML = "<span>Keresztnév:</span> " + applicant.firstName;
  infosDiv.appendChild(p2);

  const p3 = document.createElement("p");
  p3.innerHTML = "<span>E-mail cím:</span> " + applicant.email;
  infosDiv.appendChild(p3);

  contentDiv.appendChild(infosDiv);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  const cvButton = document.createElement("button");
  cvButton.classList.add("cv");
  cvButton.innerHTML = `<p>Önéletrajz</p><img src="/assets/images/icons/download-icon.svg" />`;
  cvButton.onclick = function () {
    window.open("http://localhost:3000/assets/uploads/cv/" + applicant.cv, "_blank");
  };
  buttonsDiv.appendChild(cvButton);

  const mlButton = document.createElement("button");
  mlButton.classList.add("ml");
  mlButton.innerHTML = `<p>Motivációs levél</p><img src="/assets/images/icons/download-icon.svg" />`;
  mlButton.onclick = function () {
    window.open("http://localhost:3000/assets/uploads/ml/" + applicant.ml, "_blank");
  };
  buttonsDiv.appendChild(mlButton);

  contentDiv.appendChild(buttonsDiv);

  const applicantsDiv = document.querySelector(".applicants");

  applicantsDiv.appendChild(applicantDiv);
  applicantsDiv.appendChild(contentDiv);
}
