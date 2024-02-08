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
/*                           New advertisement button                         */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const newAdvertisementButton = document.querySelector(".new-advertisement");

  newAdvertisementButton.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("/advertisement/create-new", {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Rossz válasz: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const advertisementID = data.advertisementID;
        window.location.href = `/controlPanel/advertisement/edit/${advertisementID}`;
      })
      .catch((error) => {
        console.error("Hiba a fetch közben:", error);
      });
  });
});

/* -------------------------------------------------------------------------- */
/*                               Advertisements                               */
/* -------------------------------------------------------------------------- */

fetch("/advertisement/getByCompanyAdvertisement")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((advertisement) => {
      createPostElement(advertisement);
    });
  })
  .catch((error) => console.error("Hiba történt a fetch során:", error));

function createPostElement(advertisement) {
  // Main konténer kiválasztása
  const mainContainer = document.querySelector("main");

  // .post elem létrehozása
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  // .top rész létrehozása
  const topElement = document.createElement("div");
  topElement.classList.add("top");

  // .text rész létrehozása
  const textElement = document.createElement("div");
  textElement.classList.add("text");

  const titleElement = document.createElement("h3");
  titleElement.textContent = advertisement.title;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = advertisement.introduction;

  textElement.appendChild(titleElement);
  textElement.appendChild(descriptionElement);

  // .logo rész létrehozása
  const logoElement = document.createElement("div");
  logoElement.classList.add("logo");

  const logoImageElement = document.createElement("img");
  logoImageElement.src = `/assets/uploads/logo/${advertisement.logo}`;
  logoElement.appendChild(logoImageElement);

  topElement.appendChild(textElement);
  topElement.appendChild(logoElement);

  // .bottom rész létrehozása
  const bottomElement = document.createElement("div");
  bottomElement.classList.add("bottom");

  // .tags rész létrehozása
  const tagsElement = document.createElement("div");
  tagsElement.classList.add("tags");

  // .category rész létrehozása
  const categoryElement = document.createElement("div");
  categoryElement.classList.add("category");

  const categoryPElement = document.createElement("p");
  categoryPElement.textContent = advertisement.category;

  categoryElement.appendChild(categoryPElement);
  tagsElement.appendChild(categoryElement);

  // .widget rész létrehozása
  const widgetElement = document.createElement("div");
  widgetElement.classList.add("widget");

  // .map rész létrehozása
  const mapElement = document.createElement("div");
  mapElement.classList.add("map");

  const mapImageElement = document.createElement("img");
  mapImageElement.src = "/assets/images/icons/map-pin.svg";

  const mapPElement = document.createElement("p");
  mapPElement.textContent = advertisement.location;

  mapElement.appendChild(mapImageElement);
  mapElement.appendChild(mapPElement);

  // .time rész létrehozása
  const timeElement = document.createElement("div");
  timeElement.classList.add("time");

  const timeImageElement = document.createElement("img");
  timeImageElement.src = "/assets/images/icons/dollar-icon.svg";

  const timePElement = document.createElement("p");
  timePElement.textContent = advertisement.wage + " Ft/óra";

  timeElement.appendChild(timeImageElement);
  timeElement.appendChild(timePElement);

  widgetElement.appendChild(mapElement);
  widgetElement.appendChild(timeElement);

  tagsElement.appendChild(widgetElement);

  // .continue rész létrehozása
  const continueElement = document.createElement("div");
  continueElement.classList.add("continue");

  // .applicants rész létrehozása
  const applicantsButton = document.createElement("button");
  applicantsButton.classList.add("applicants");
  applicantsButton.onclick = function () {
    window.location.href = "/controlPanel/advertisement/applicants/" + advertisement.advertisementID;
  };

  const applicantsPElement = document.createElement("p");
  applicantsPElement.textContent = "Jelentkezők";

  const applicantsImageElement = document.createElement("img");
  applicantsImageElement.src = "/assets/images/icons/users.svg";

  applicantsButton.appendChild(applicantsPElement);
  applicantsButton.appendChild(applicantsImageElement);

  // .edit rész létrehozása
  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.onclick = function () {
    window.location.href = "/controlPanel/advertisement/edit/" + advertisement.advertisementID;
  };

  const editPElement = document.createElement("p");
  editPElement.textContent = "Szerkesztés";

  const editImageElement = document.createElement("img");
  editImageElement.src = "/assets/images/icons/edit.svg";

  editButton.appendChild(editPElement);
  editButton.appendChild(editImageElement);

  continueElement.appendChild(applicantsButton);
  continueElement.appendChild(editButton);

  bottomElement.appendChild(tagsElement);
  bottomElement.appendChild(continueElement);

  // .post elem összeállítása és hozzáadása a main konténerhez
  postElement.appendChild(topElement);
  postElement.appendChild(bottomElement);
  mainContainer.appendChild(postElement);
}
