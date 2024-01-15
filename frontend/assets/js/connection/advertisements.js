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
        return response.json();
      })
      .then((data) => {
        const advertisementID = data.advertisementID;
        window.location.href = `/controlPanel/advertisement/edit/${advertisementID}`;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
});
