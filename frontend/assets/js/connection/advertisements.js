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
    });
  });
});
