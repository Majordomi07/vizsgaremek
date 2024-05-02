const checkbox = document.getElementById("company");

checkbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    document.querySelector(".company").style.display = "block";
    document.querySelector(".company-check").style.marginBottom = "20px";
  } else {
    document.querySelector(".company").style.display = "none";
    document.querySelector(".company-check").style.marginBottom = "10px";
  }
});
