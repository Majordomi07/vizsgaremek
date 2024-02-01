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
    .catch((error) => console.error("Hiba a fetch kérés során:", error));
});

function advertisementAppear(data) {
  const postSection = document.querySelector(".post");

  const container = document.createElement("div");
  container.className = "container";

  const heading = document.createElement("h2");
  heading.textContent = data[0].title;

  const paragraph = document.createElement("p");
  paragraph.textContent = data[0].general;

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
  companyLogo.src = "/assets/images/uploads/logos/" + data[0].logo;

  const companyNameHeading = document.createElement("h4");
  companyNameHeading.textContent = data[0].name;

  const companyParagraph = document.createElement("p");
  companyParagraph.textContent = data[0].description;

  const contactFormDiv = document.createElement("div");
  contactFormDiv.className = "contact-form";

  const contactFormHeading = document.createElement("h3");
  contactFormHeading.textContent = "Kapcsolatfelvétel";

  const form = document.createElement("form");

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";

  const messageLabel = document.createElement("label");
  messageLabel.textContent = "Üzenet:";

  const messageTextarea = document.createElement("textarea");
  messageTextarea.name = "message";
  messageTextarea.placeholder = "Üzenet";
  messageTextarea.rows = "6";

  messageDiv.appendChild(messageLabel);
  messageDiv.appendChild(messageTextarea);

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

  const cvInput = document.createElement("input");
  cvInput.type = "file";
  cvInput.id = "cvInput";
  cvInput.accept = "application/pdf";

  cvFileDiv.appendChild(cvFileNameParagraph);
  cvFileDiv.appendChild(cvInputLabel);
  cvFileDiv.appendChild(cvInput);

  cvDiv.appendChild(cvLabel);
  cvDiv.appendChild(cvFileDiv);

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

  const mlInput = document.createElement("input");
  mlInput.type = "file";
  mlInput.id = "mlInput";
  mlInput.accept = "application/pdf";

  mlFileDiv.appendChild(mlFileNameParagraph);
  mlFileDiv.appendChild(mlInputLabel);
  mlFileDiv.appendChild(mlInput);

  mlDiv.appendChild(mlLabel);
  mlDiv.appendChild(mlFileDiv);

  const adatvedelmiDiv = document.createElement("div");
  adatvedelmiDiv.className = "adatvedelmi";

  const checkboxLabel = document.createElement("label");
  checkboxLabel.className = "checkbox";

  const adatvedelemInput = document.createElement("input");
  adatvedelemInput.type = "checkbox";
  adatvedelemInput.id = "adatvedelem";

  const adatvedelemParagraph = document.createElement("p");
  adatvedelemParagraph.textContent = "Elolvastam és elfogadom az adatvédelmi nyilatkozatot";

  checkboxLabel.appendChild(adatvedelemInput);
  adatvedelmiDiv.appendChild(checkboxLabel);
  adatvedelmiDiv.appendChild(adatvedelemParagraph);

  const sendButton = document.createElement("button");

  const sendButtonTextParagraph = document.createElement("p");
  sendButtonTextParagraph.textContent = "Küldés";

  const sendButtonImage = document.createElement("img");
  sendButtonImage.src = "/assets/images/icons/send-icon.svg";

  sendButton.appendChild(sendButtonTextParagraph);
  sendButton.appendChild(sendButtonImage);

  form.appendChild(messageDiv);
  form.appendChild(cvDiv);
  form.appendChild(mlDiv);
  form.appendChild(adatvedelmiDiv);
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
    .catch((error) => console.error("Hiba a fetch kérés során:", error));
}
