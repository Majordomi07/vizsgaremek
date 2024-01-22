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

/* -------------------------------------------------------------------------- */
/*                               Advertisements                               */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const showMoreButton = document.getElementById("show-more");
  const dataContainer = document.getElementById("advertisementsContainer");
  const keywordFilterInput = document.getElementById("keywordFilter");
  const locationFilterSelect = document.getElementById("locationFilter");
  const categoryFilterSelect = document.getElementById("categoryFilter");

  let currentPage = 1;
  let hasMoreData = true;

  updateResult();

  function loadData(page, keywordFilter, locationFilter, categoryFilter) {
    if (!hasMoreData) {
      return;
    }

    const filterParams = [];
    if (keywordFilter) filterParams.push(`&keywordFilter=${encodeURIComponent(keywordFilter)}`);
    if (locationFilter && locationFilter !== "Bármely település")
      filterParams.push(`&locationFilter=${encodeURIComponent(locationFilter)}`);
    if (categoryFilter && categoryFilter !== "Bármelyik kategória")
      filterParams.push(`&categoryFilter=${encodeURIComponent(categoryFilter)}`);

    const url = `/advertisement/getAllAdvertisements?page=${page}${filterParams.join("")}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        renderData(data);
        hasMoreData = data.length >= 4;
        if (!hasMoreData) {
          showMoreButton.style.display = "none";
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
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
    description.innerText = item.general;
    text.appendChild(description);

    const logo = document.createElement("div");
    logo.classList.add("logo");

    const logoImage = document.createElement("img");
    logoImage.src = "/assets/images/uploads/logos/" + item.logo;
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

  function handleShowMore() {
    currentPage++;
    loadData(currentPage, keywordFilterInput.value, locationFilterSelect.value, categoryFilterSelect.value);
  }

  showMoreButton.addEventListener("click", handleShowMore);

  function handleFilterChange() {
    currentPage = 1;
    hasMoreData = true;
    showMoreButton.style.display = "block";
    dataContainer.innerHTML = "";
    loadData(currentPage, keywordFilterInput.value, locationFilterSelect.value, categoryFilterSelect.value);
    updateResult();
  }

  keywordFilterInput.addEventListener("input", handleFilterChange);
  locationFilterSelect.addEventListener("change", handleFilterChange);
  categoryFilterSelect.addEventListener("change", handleFilterChange);

  function updateResult() {
    const filterParams = [];

    if (keywordFilterInput.value) filterParams.push(`&keywordFilter=${encodeURIComponent(keywordFilterInput.value)}`);
    if (locationFilterSelect.value && locationFilterSelect.value !== "Bármely település")
      filterParams.push(`&locationFilter=${encodeURIComponent(locationFilterSelect.value)}`);
    if (categoryFilterSelect.value && categoryFilterSelect.value !== "Bármelyik kategória")
      filterParams.push(`&categoryFilter=${encodeURIComponent(categoryFilterSelect.value)}`);

    fetch(`/advertisement/getTotalAdvertisementsCount?page=${currentPage}${filterParams.join("")}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("results").textContent = data.totalRecords;
      })
      .catch((error) => console.error("Error fetching total records count:", error));
  }

  loadData(currentPage);
});
