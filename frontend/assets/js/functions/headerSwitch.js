let open = false;
var bars = document.querySelector(".bars");
var nav = document.getElementById("nav");

function toggle() {
  if (open == false) {
    nav.style.width = "85%";
    nav.style.right = "0px";
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector("html").style.overflow = "hidden";
    bars.classList.add("active");
    open = true;
  } else {
    open = false;
    nav.style.width = "0%";
    nav.style.right = "-100px";
    document.querySelector("body").style.overflow = "visible";
    document.querySelector("html").style.overflow = "visible";
    bars.classList.remove("active");
  }
}

const links = document.querySelectorAll("#nav a");

links.forEach((link) => {
  link.addEventListener("click", function (event) {
    open = false;
    nav.style.width = "0%";
    nav.style.right = "-100px";
    document.querySelector("body").style.overflow = "visible";
    document.querySelector("html").style.overflow = "visible";
    bars.classList.remove("active");
  });
});
