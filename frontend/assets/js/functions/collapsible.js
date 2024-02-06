document.addEventListener("DOMContentLoaded", () => {
  setTimeout(function () {
    var applicants = document.querySelectorAll(".applicant");

    applicants.forEach(function (applicant) {
      applicant.addEventListener("click", function () {
        toggleContent(applicant);

        var img = applicant.querySelector("img");
        var originalSrc = img.getAttribute("src");
        var newSrc = originalSrc.includes("down-icon")
          ? "/assets/images/icons/up-icon.svg"
          : "/assets/images/icons/down-icon.svg";
        img.setAttribute("src", newSrc);
      });
    });
  }, 100);
});

function toggleContent(element) {
  var content = element.nextElementSibling;
  content.classList.toggle("expanded");
}
