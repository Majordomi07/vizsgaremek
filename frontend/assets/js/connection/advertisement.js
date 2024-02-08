/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const idIndex = currentPath.lastIndexOf("/") + 1;
  const advertisementID = currentPath.substring(idIndex);

  fetch("/advertisement/api/" + advertisementID)
    .then((response) => response.json())
    .then((data) => {
      advertisementAppear(data);
    })
    .catch((error) => {
      console.error("Hiba a fetch kérés során:", error);
    });
});

function advertisementAppear(data) {
  const postSection = document.querySelector(".post");

  const container = document.createElement("div");
  container.className = "container";

  const heading = document.createElement("h2");
  heading.textContent = data[0].title;

  const paragraph = document.createElement("p");
  paragraph.textContent = data[0].introduction;

  const main = document.createElement("main");

  const leftDiv = document.createElement("div");
  leftDiv.className = "left";

  const generalInfoDiv = document.createElement("div");
  generalInfoDiv.className = "general-info";

  const generalInfoHeading = document.createElement("h3");
  generalInfoHeading.textContent = "Általános információ";

  const generalInfoParagraph = document.createElement("p");
  generalInfoParagraph.textContent = data[0].general;

  const widgetDiv = document.createElement("div");
  widgetDiv.className = "widget";

  const locationDiv = document.createElement("div");
  locationDiv.className = "location";

  const locationImage = document.createElement("img");
  locationImage.src = "/assets/images/icons/map-pin (post).svg";

  const locationParagraph = document.createElement("p");
  locationParagraph.textContent = data[0].location;

  const dateDiv = document.createElement("div");
  dateDiv.className = "date";

  const dateImage = document.createElement("img");
  dateImage.src = "/assets/images/icons/dollar-icon.svg";

  const dateParagraph = document.createElement("p");
  dateParagraph.textContent = data[0].wage + " Ft/óra";

  const requirementsDiv = document.createElement("div");
  requirementsDiv.className = "requirements";

  const requirementsHeading = document.createElement("h3");
  requirementsHeading.textContent = "Elvárások";

  const requirementsList = document.createElement("ul");
  const requirementsText = data[0].requirement;

  requirementsText.split("\n").forEach((line) => {
    const listItem = document.createElement("li");
    listItem.textContent = line;
    requirementsList.appendChild(listItem);
  });

  const benefitsDiv = document.createElement("div");
  benefitsDiv.className = "benefits";

  const benefitsHeading = document.createElement("h3");
  benefitsHeading.textContent = "Juttatások";

  const benefitsList = document.createElement("ul");
  const benefitsText = data[0].benefit;

  benefitsText.split("\n").forEach((line) => {
    const listItem = document.createElement("li");
    listItem.textContent = line;
    benefitsList.appendChild(listItem);
  });

  const rightDiv = document.createElement("div");
  rightDiv.className = "right";

  const companyDiv = document.createElement("div");
  companyDiv.className = "company";

  const companyHeading = document.createElement("h3");
  companyHeading.textContent = "Céginformáció";

  const companyLogo = document.createElement("img");
  companyLogo.src = "/assets/uploads/logo/" + data[0].logo;

  const companyNameHeading = document.createElement("h4");
  companyNameHeading.textContent = data[0].name;

  const companyParagraph = document.createElement("p");
  companyParagraph.textContent = data[0].description;

  const contactFormDiv = document.createElement("div");
  contactFormDiv.className = "contact-form";

  const contactFormHeading = document.createElement("h3");
  contactFormHeading.textContent = "Kapcsolatfelvétel";

  const form = document.createElement("form");
  form.id = "contactForm";
  form.enctype = "multipart/form-data";

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";

  const messageLabel = document.createElement("label");
  messageLabel.textContent = "Üzenet:";

  const messageTextarea = document.createElement("textarea");
  messageTextarea.name = "message";
  messageTextarea.id = "message";
  messageTextarea.placeholder = "Üzenet";
  messageTextarea.rows = "6";

  messageDiv.appendChild(messageLabel);
  messageDiv.appendChild(messageTextarea);
  const errorMessage = document.createElement("p");
  errorMessage.textContent = "";
  errorMessage.className = "error";
  errorMessage.id = "messageError";
  messageDiv.appendChild(errorMessage);
  form.appendChild(messageDiv);

  const cvDiv = document.createElement("div");
  cvDiv.className = "cv";

  const cvLabel = document.createElement("p");
  cvLabel.textContent = "Önéletrajz:";

  const cvFileDiv = document.createElement("div");
  cvFileDiv.className = "file";

  const cvFileNameParagraph = document.createElement("p");
  cvFileNameParagraph.id = "cvFileName";
  cvFileNameParagraph.textContent = "Nincs kiválasztva";

  const cvInputLabel = document.createElement("label");
  cvInputLabel.htmlFor = "cvInput";
  cvInputLabel.textContent = "Tallózás";

  const cvInputElement = document.createElement("input");
  cvInputElement.type = "file";
  cvInputElement.id = "cvInput";
  cvInputElement.name = "cvInput";
  cvInputElement.accept = "application/pdf";

  cvFileDiv.appendChild(cvFileNameParagraph);
  cvFileDiv.appendChild(cvInputLabel);
  cvFileDiv.appendChild(cvInputElement);

  cvDiv.appendChild(cvLabel);
  cvDiv.appendChild(cvFileDiv);
  const cvError = document.createElement("p");
  cvError.textContent = "";
  cvError.className = "error";
  cvError.id = "cvFileError";
  cvDiv.appendChild(cvError);
  form.appendChild(cvDiv);

  const mlDiv = document.createElement("div");
  mlDiv.className = "motivationLetter";

  const mlLabel = document.createElement("p");
  mlLabel.textContent = "Motivációs levél:";

  const mlFileDiv = document.createElement("div");
  mlFileDiv.className = "file";

  const mlFileNameParagraph = document.createElement("p");
  mlFileNameParagraph.id = "mlFileName";
  mlFileNameParagraph.textContent = "Nincs kiválasztva";

  const mlInputLabel = document.createElement("label");
  mlInputLabel.htmlFor = "mlInput";
  mlInputLabel.textContent = "Tallózás";

  const mlInputElement = document.createElement("input");
  mlInputElement.type = "file";
  mlInputElement.id = "mlInput";
  mlInputElement.name = "mlInput";
  mlInputElement.accept = "application/pdf";

  mlFileDiv.appendChild(mlFileNameParagraph);
  mlFileDiv.appendChild(mlInputLabel);
  mlFileDiv.appendChild(mlInputElement);

  mlDiv.appendChild(mlLabel);
  mlDiv.appendChild(mlFileDiv);
  const mlError = document.createElement("p");
  mlError.textContent = "";
  mlError.className = "error";
  mlError.id = "mlFileError";
  mlDiv.appendChild(mlError);
  form.appendChild(mlDiv);

  const adatvedelmiDiv = document.createElement("div");
  adatvedelmiDiv.className = "adatvedelmi";

  // Külön div az adatvédelmi input és az első p számára
  const adatvedelmiInputDiv = document.createElement("div");

  const checkboxLabel = document.createElement("label");
  checkboxLabel.className = "checkbox";

  const adatvedelmiInput = document.createElement("input");
  adatvedelmiInput.type = "checkbox";
  adatvedelmiInput.id = "adatvedelmi";
  adatvedelmiInput.name = "adatvedelmi";

  const adatvedelmiParagraph = document.createElement("p");
  adatvedelmiParagraph.textContent = "Elolvastam és elfogadom az adatvédelmi nyilatkozatot";

  checkboxLabel.appendChild(adatvedelmiInput);
  adatvedelmiInputDiv.appendChild(checkboxLabel);
  adatvedelmiInputDiv.appendChild(adatvedelmiParagraph);

  const adatvedelmiError = document.createElement("p");
  adatvedelmiError.textContent = "";
  adatvedelmiError.className = "error";
  adatvedelmiError.id = "adatvedelmiError";

  // Hozzáadás az adatvédelmi div-hez
  adatvedelmiDiv.appendChild(adatvedelmiInputDiv);
  adatvedelmiDiv.appendChild(adatvedelmiError);

  form.appendChild(adatvedelmiDiv);

  const sendButton = document.createElement("button");

  const sendButtonTextParagraph = document.createElement("p");
  sendButtonTextParagraph.textContent = "Küldés";

  const sendButtonImage = document.createElement("img");
  sendButtonImage.src = "/assets/images/icons/send-icon.svg";

  sendButton.appendChild(sendButtonTextParagraph);
  sendButton.appendChild(sendButtonImage);
  form.appendChild(sendButton);

  rightDiv.appendChild(companyDiv);
  companyDiv.appendChild(companyHeading);
  companyDiv.appendChild(companyLogo);
  companyDiv.appendChild(companyNameHeading);
  companyDiv.appendChild(companyParagraph);
  rightDiv.appendChild(contactFormDiv);
  contactFormDiv.appendChild(contactFormHeading);
  contactFormDiv.appendChild(form);

  leftDiv.appendChild(generalInfoDiv);
  generalInfoDiv.appendChild(generalInfoHeading);
  generalInfoDiv.appendChild(generalInfoParagraph);
  generalInfoDiv.appendChild(widgetDiv);
  widgetDiv.appendChild(locationDiv);
  locationDiv.appendChild(locationImage);
  locationDiv.appendChild(locationParagraph);
  widgetDiv.appendChild(dateDiv);
  dateDiv.appendChild(dateImage);
  dateDiv.appendChild(dateParagraph);
  leftDiv.appendChild(requirementsDiv);
  requirementsDiv.appendChild(requirementsHeading);
  requirementsDiv.appendChild(requirementsList);
  leftDiv.appendChild(benefitsDiv);
  benefitsDiv.appendChild(benefitsHeading);
  benefitsDiv.appendChild(benefitsList);

  main.appendChild(leftDiv);
  main.appendChild(rightDiv);

  container.appendChild(heading);
  container.appendChild(paragraph);
  container.appendChild(main);

  postSection.appendChild(container);

  fetch("/auth/logged-in")
    .then((response) => {
      if (response.ok) {
        document.querySelector(".contact-form").style.display = "block";
      } else {
        document.querySelector(".contact-form").style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Hiba a fetch kérés során:", error);
    });
}

/* -------------------------------------------------------------------------- */
/*                                Contact form                                */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(function () {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      clearErrors();

      const formData = new FormData();
      formData.append("message", document.getElementById("message").value);
      formData.append("adatvedelmi", document.getElementById("adatvedelmi").checked);

      const cvFile = document.getElementById("cvInput").files[0];
      const mlFile = document.getElementById("mlInput").files[0];

      if (cvFile) {
        formData.append("cvFile", cvFile);
      }

      if (mlFile) {
        formData.append("mlFile", mlFile);
      }

      const currentPath = window.location.pathname;
      const idIndex = currentPath.lastIndexOf("/") + 1;
      const advertisementID = currentPath.substring(idIndex);

      const response = await fetch("/contactForm/" + advertisementID, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status == 200) {
        contactForm.reset();
        resetFileUpload();
        popupsuccessfulContact();
      } else if (response.status == 400) {
        displayErrors(data.error);
      } else if (response.status == 500) {
        contactForm.reset();
        resetFileUpload();
        popupcontactError();
      }
    });

    function clearErrors() {
      const errorElements = document.querySelectorAll("#contactForm .error");
      errorElements.forEach((element) => {
        element.textContent = "";
      });
    }

    const displayErrors = (errors) => {
      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          const errorField = document.getElementById(`${error.path}Error`);
          if (errorField) {
            errorField.textContent = error.msg;
          }
        });
      }
    };
  }, 100);
});
