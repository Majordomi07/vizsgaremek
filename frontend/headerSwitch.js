function toggle() {
  var bars = document.querySelector(".bars");
  var nav = document.getElementById("nav");
  console.log(nav);
  bars.classList.toggle("active");
  nav.classList.toggle("hide");
}
