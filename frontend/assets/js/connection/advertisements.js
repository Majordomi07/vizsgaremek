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
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text(); // vagy response.json() ha JSON-t vársz
      })
      .then((data) => {
        // itt dolgozd fel a választ, például nyisd meg az oldalt
        window.location.href = data;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
});
