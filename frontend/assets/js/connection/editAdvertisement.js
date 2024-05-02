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
/*                             Location feltöltés                             */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const locationSelects = document.getElementById("location");

  fetch("/advertisement/allLocations")
    .then((response) => response.json())
    .then((data) => {
      data.locations.forEach((location) => {
        const option = document.createElement("option");
        option.value = location;
        option.text = location;
        locationSelects.appendChild(option);
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
      const introductionElement = document.getElementById("introduction");
      const generalElement = document.getElementById("general");
      const categoryElement = document.getElementById("category");
      const wageElement = document.getElementById("wage");
      const locationElement = document.getElementById("location");
      const requirementElement = document.getElementById("requirement");
      const benefitElement = document.getElementById("benefit");

      titleElement.value = data[0].title;
      introductionElement.value = data[0].introduction;
      generalElement.value = data[0].general;

      var options = categoryElement.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].value === data[0].category) {
          categoryElement.selectedIndex = i;
          break;
        }
      }

      wageElement.value = data[0].wage;

      var options = locationElement.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].value === data[0].location) {
          locationElement.selectedIndex = i;
          break;
        }
      }

      requirementElement.value = data[0].requirement;
      benefitElement.value = data[0].benefit;
    })
    .catch((error) => console.error("Hiba a fetch kérés során:", error));
});

/* -------------------------------------------------------------------------- */
/*                             Save advertisement                             */
/* -------------------------------------------------------------------------- */

const saveButton = document.getElementById("saveAdvertisement");

const currentPath = window.location.pathname;
const idIndex = currentPath.lastIndexOf("/") + 1;
const advertisementID = currentPath.substring(idIndex);

saveButton.addEventListener("click", async (event) => {
  event.preventDefault();

  clearErrors();

  const title = document.getElementById("title").value;
  const introduction = document.getElementById("introduction").value;
  const general = document.getElementById("general").value;
  const category = document.getElementById("category").selectedIndex + 1;
  const wage = document.getElementById("wage").value;
  const location = document.getElementById("location").selectedIndex + 1;
  const requirement = document.getElementById("requirement").value;
  const benefit = document.getElementById("benefit").value;

  const response = await fetch("/advertisement/save/" + advertisementID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, introduction, general, category, wage, location, requirement, benefit }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("successfulEdit", "popup");
    window.location.href = "/controlPanel/advertisements";
  } else {
    displayErrors(data.error);
  }
});

function clearErrors() {
  const errorElements = document.querySelectorAll(".error");
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

/* -------------------------------------------------------------------------- */
/*                            Delete advertisement                            */
/* -------------------------------------------------------------------------- */

const deleteButton = document.getElementById("deleteAdvertisement");

deleteButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const response = await fetch("/advertisement/delete/" + advertisementID, {
    method: "DELETE",
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("successfulDelete", "popup");
    window.location.href = "/controlPanel/advertisements";
  } else {
    console.log("hiba");
    displayErrors(data.error);
  }
});
