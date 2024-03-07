/* -------------------------------------------------------------------------- */
/*                             Kategória feltöltés                            */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const categorySelects = document.querySelectorAll("#categoryFilter");

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
  const locationSelects = document.querySelectorAll("#locationFilter");

  fetch("/advertisement/usedlocations")
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

/* -------------------------------------------------------------------------- */
/*                                Wage Feltölés                               */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  function updateLabels(ranges, formId) {
    var labels = document.querySelectorAll(`#${formId} label`);
    ranges.forEach(function (range, index) {
      labels[index].textContent = range;
    });
  }

  fetch("/advertisement/calculateWageRanges")
    .then((response) => response.json())
    .then((data) => {
      updateLabels(data.ranges, "wageFilter");
      updateLabels(data.ranges, "wageFilter2");
    })
    .catch((error) => console.error("Hiba a fetch közben:", error));
});

function updateRanges() {
  var selectedOption = document.querySelector('input[name="wage"]:checked');

  if (selectedOption) {
    var label = selectedOption.nextElementSibling.textContent.trim();
    var values = label.split(" - ").map(function (value) {
      return parseInt(value.replace(/\D/g, ""), 10);
    });

    ranges = values;
  } else {
    ranges = [];
  }
  return ranges;
}

/* -------------------------------------------------------------------------- */
/*                               Advertisements                               */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const showMoreButton = document.getElementById("show-more");
  const dataContainer = document.getElementById("advertisementsContainer");
  const keywordFilterInput = document.getElementById("keywordFilter");
  const locationFilterSelect = document.querySelectorAll("#locationFilter");
  const categoryFilterSelect = document.querySelectorAll("#categoryFilter");
  const orderFilterSelect = document.querySelectorAll("#orderFilter");

  let currentPage = 1;
  let hasMoreData = true;

  function loadData(page, keywordFilter, locationFilter, categoryFilter, orderFilter) {
    const wageFilter = updateRanges();

    const filterParams = [];
    if (keywordFilter) filterParams.push(`&keywordFilter=${encodeURIComponent(keywordFilter)}`);
    if (locationFilter && locationFilter !== "Bármely település")
      filterParams.push(`&locationFilter=${encodeURIComponent(locationFilter)}`);
    if (categoryFilter && categoryFilter !== "Bármelyik kategória")
      filterParams.push(`&categoryFilter=${encodeURIComponent(categoryFilter)}`);
    if (wageFilter.length !== 0) filterParams.push(`&wageFilter=${encodeURIComponent(wageFilter)}`);
    if (orderFilter) filterParams.push(`&orderFilter=${encodeURIComponent(orderFilter)}`);

    const url = `/advertisement/getAllAdvertisements?page=${page}${filterParams.join("")}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hiba");
        }
        return response.json();
      })
      .then((data) => {
        if (data.results && data.totalCount !== undefined) {
          renderData(data.results);
          if ((page - 1) * 4 + data.results.length < data.totalCount) {
            hasMoreData = true;
          } else {
            hasMoreData = false;
            showMoreButton.style.display = "none";
          }
          document.getElementById("results").textContent = data.totalCount;
        } else {
          console.error("Hibás válasz form:", data);
        }
      })
      .catch((error) => console.error("Hiba a fetch közben:", error));
  }

  function renderData(data) {
    if (data.length === 0) {
      hasMoreData = false;
      showMoreButton.style.display = "none";
      return;
    }

    data.forEach((item) => {
      const postElement = createPostElement(item);
      dataContainer.appendChild(postElement);
    });
  }

  function createPostElement(item) {
    const post = document.createElement("div");
    post.classList.add("post");

    const top = document.createElement("div");
    top.classList.add("top");

    const text = document.createElement("div");
    text.classList.add("text");

    const title = document.createElement("h3");
    title.innerText = item.title;
    text.appendChild(title);

    const description = document.createElement("p");
    description.innerText = item.introduction;
    text.appendChild(description);

    const logo = document.createElement("div");
    logo.classList.add("logo");

    const logoImage = document.createElement("img");
    logoImage.src = "/assets/uploads/logo/" + item.logo;
    logo.appendChild(logoImage);

    top.appendChild(text);
    top.appendChild(logo);

    const bottom = document.createElement("div");
    bottom.classList.add("bottom");

    const tags = document.createElement("div");
    tags.classList.add("tags");

    const category = document.createElement("div");
    category.classList.add("category");

    const categoryText = document.createElement("p");
    categoryText.innerText = item.category;
    category.appendChild(categoryText);

    const widget = document.createElement("div");
    widget.classList.add("widget");

    const map = document.createElement("div");
    map.classList.add("map");

    const mapImage = document.createElement("img");
    mapImage.src = "/assets/images/icons/map-pin.svg";
    map.appendChild(mapImage);

    const mapText = document.createElement("p");
    mapText.innerText = item.location;
    map.appendChild(mapText);

    const wage = document.createElement("div");
    wage.classList.add("wage");

    const wageImage = document.createElement("img");
    wageImage.src = "/assets/images/icons/dollar-icon.svg";
    wage.appendChild(wageImage);

    const wageText = document.createElement("p");
    wageText.innerText = item.wage + " Ft/óra";
    wage.appendChild(wageText);

    widget.appendChild(map);
    widget.appendChild(wage);

    tags.appendChild(category);
    tags.appendChild(widget);

    const continueButton = document.createElement("div");
    continueButton.classList.add("continue");

    const button = document.createElement("button");
    button.onclick = function () {
      window.location.href = "/advertisement/view/" + item.advertisementID;
    };
    const buttonText = document.createElement("p");
    buttonText.innerText = "Tovább";

    const buttonImage = document.createElement("img");
    buttonImage.src = "/assets/images/icons/arrow-up-right.svg";

    button.appendChild(buttonText);
    button.appendChild(buttonImage);
    continueButton.appendChild(button);

    bottom.appendChild(tags);
    bottom.appendChild(continueButton);

    post.appendChild(top);
    post.appendChild(bottom);

    return post;
  }

  showMoreButton.addEventListener("click", handleShowMore);

  function handleShowMore() {
    currentPage++;
    const selectedCategoryValue = Array.from(categoryFilterSelect)
      .map((inputField) => inputField.value)
      .find((value) => value !== "Bármelyik kategória");

    const selectedLocationValue = Array.from(locationFilterSelect)
      .map((inputField) => inputField.value)
      .find((value) => value !== "Bármely település");

    const selectedOrderValue = Array.from(orderFilterSelect)
      .map((inputField) => inputField.value)
      .find((value) => value !== "Legújabb");

    loadData(
      currentPage,
      keywordFilterInput.value,
      selectedLocationValue,
      selectedCategoryValue,
      selectedOrderValue
    );
  }

  function handleFilterChange() {
    const selectedCategoryValue = Array.from(categoryFilterSelect)
      .map((inputField) => inputField.value)
      .find((value) => value !== "Bármelyik kategória");

    const selectedLocationValue = Array.from(locationFilterSelect)
      .map((inputField) => inputField.value)
      .find((value) => value !== "Bármely település");

    const selectedOrderValue = Array.from(orderFilterSelect)
      .map((inputField) => inputField.value)
      .find((value) => value !== "Legújabb");

    currentPage = 1;
    hasMoreData = true;
    showMoreButton.style.display = "block";
    dataContainer.innerHTML = "";
    loadData(
      currentPage,
      keywordFilterInput.value,
      selectedLocationValue,
      selectedCategoryValue,
      selectedOrderValue
    );
  }

  keywordFilterInput.addEventListener("input", handleFilterChange);
  locationFilterSelect.forEach((inputField) => {
    inputField.addEventListener("change", handleFilterChange);
  });

  categoryFilterSelect.forEach((inputField) => {
    inputField.addEventListener("change", handleFilterChange);
  });

  orderFilterSelect.forEach((inputField) => {
    inputField.addEventListener("change", handleFilterChange);
  });

  var radioButtons = document.querySelectorAll('input[name="wage"]');
  radioButtons.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (radio.checked) {
        updateRanges();
        handleFilterChange();
      }
    });
  });

  var resetFilterButtons = document.querySelectorAll("#resetFilter");
  resetFilterButtons.forEach(function (resetFilter) {
    resetFilter.addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("topbar").reset();
      document.getElementById("wageFilter").reset();
      document.getElementById("wageFilter2").reset();
      document.querySelectorAll("#locationFilter").forEach(function (locationFilter) {
        locationFilter.selectedIndex = 0;
      });
      document.querySelectorAll("#categoryFilter").forEach(function (categoryFilter) {
        categoryFilter.selectedIndex = 0;
      });
      handleFilterChange();
    });
  });

  loadData(currentPage);
});
