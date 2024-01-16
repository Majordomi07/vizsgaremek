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

/* -------------------------------------------------------------------------- */
/*                               Advertisements                               */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const pagination = document.getElementById("pagination");
  const dataContainer = document.getElementById("advertisementsContainer");
  const keywordFilterInput = document.getElementById("keywordFilter");
  let currentPage = 1;

  function loadData(page, keywordFilter) {
    const filterParam = keywordFilter ? `&keywordFilter=${encodeURIComponent(keywordFilter)}` : "";

    const url = `/advertisement/getAllAdvertisements?page=${page}${filterParam}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => renderData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  function renderData(data) {
    dataContainer.innerHTML = "";
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

    const time = document.createElement("div");
    time.classList.add("time");

    const timeImage = document.createElement("img");
    timeImage.src = "/assets/images/icons/clock.svg";
    time.appendChild(timeImage);

    const timeText = document.createElement("p");
    timeText.innerText = item.wage;
    time.appendChild(timeText);

    widget.appendChild(map);
    widget.appendChild(time);

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

  function updatePagination() {
    const pageLinks = pagination.querySelectorAll('a[id^="page"]');
    pageLinks.forEach((link) => link.classList.remove("active"));
    document.getElementById(`page${currentPage}`).classList.add("active");
  }

  function handleFilterChange() {
    loadData(currentPage, keywordFilterInput.value);
  }

  keywordFilterInput.addEventListener("input", handleFilterChange);

  document.getElementById("prev").addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
      loadData(currentPage, keywordFilterInput.value);
    }
  });

  document.getElementById("next").addEventListener("click", function (e) {
    e.preventDefault();
    currentPage++;
    updatePagination();
    loadData(currentPage, keywordFilterInput.value);
  });

  pagination.querySelectorAll('a[id^="page"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = parseInt(this.innerText, 10);
      updatePagination();
      loadData(currentPage, keywordFilterInput.value);
    });
  });

  loadData(currentPage);
  updatePagination();
});
