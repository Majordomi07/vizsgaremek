/* -------------------------------------------------------------------------- */
/*                             Kategória feltöltés                            */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const categorySelects = document.querySelectorAll("#category");

  fetch("/advertisement/usedCategories")
    .then((response) => response.json())
    .then((data) => {
      categorySelects.forEach((categorySelect) => {
        data.categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category;
          option.text = category;
          categorySelect.appendChild(option);
        });
      });
    })
    .catch((error) => console.error("Hiba a fetch során:", error));
});

/* -------------------------------------------------------------------------- */
/*                             Település feltöltés                            */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const locationSelects = document.querySelectorAll("#location");

  fetch("/advertisement/locations")
    .then((response) => response.json())
    .then((data) => {
      locationSelects.forEach((locationSelect) => {
        data.locations.forEach((location) => {
          const option = document.createElement("option");
          option.value = location;
          option.text = location;
          locationSelect.appendChild(option);
        });
      });
    })
    .catch((error) => console.error("Hiba a fetch során:", error));
});
