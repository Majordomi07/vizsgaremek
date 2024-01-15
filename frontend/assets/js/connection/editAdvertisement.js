/* -------------------------------------------------------------------------- */
/*                          Verification of ownership                         */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    const currentPath = window.location.pathname;
    const idIndex = currentPath.lastIndexOf("/") + 1;
    const advertisementID = currentPath.substring(idIndex);

    const response = await fetch("/advertisement/edit-verification/" + advertisementID);
    const data = await response.json();

    console.log(data);

    if (data.verificatedUser == false) {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Hiba a fetchelés során:", error);
  }
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

/* -------------------------------------------------------------------------- */
/*                             Kategória feltöltés                            */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const categorySelects = document.getElementById("category");

  fetch("/advertisement/allCategories")
    .then((response) => response.json())
    .then((data) => {
      data.categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.text = category;
        categorySelects.appendChild(option);
      });
    })
    .catch((error) => console.error("Hiba a fetch során:", error));
});

/* -------------------------------------------------------------------------- */
/*                                 Load inputs                                */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const idIndex = currentPath.lastIndexOf("/") + 1;
  const advertisementID = currentPath.substring(idIndex);

  fetch("/advertisement/api/" + advertisementID)
    .then((response) => response.json())
    .then((data) => {
      const titleElement = document.getElementById("title");
      const generalElement = document.getElementById("general");
      const categoryElement = document.getElementById("category");
      const wageElement = document.getElementById("wage");
      const locationElement = document.getElementById("location");
      const requirementElement = document.getElementById("requirement");
      const benefitElement = document.getElementById("benefit");

      titleElement.value = data[0].title;
      generalElement.value = data[0].general;

      var options = categoryElement.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].value === data[0].category) {
          categoryElement.selectedIndex = i;
          break;
        }
      }

      wageElement.value = data[0].wage;
      locationElement.value = data[0].location;
      requirementElement.value = data[0].requirement;
      benefitElement.value = data[0].benefit;
    })
    .catch((error) => console.error("Hiba a fetch kérés során:", error));
});
