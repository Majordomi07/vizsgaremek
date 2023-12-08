let open2 = false;

function responsiveFilter() {
  var filter = document.querySelector(".responsive-filter");
  if (open2 == false) {
    open2 = true;
    filter.classList.remove("closed");
    document.querySelector(".posts").style.overflow = "visible";
  } else {
    open2 = false;
    filter.classList.add("closed");
    document.querySelector(".posts").style.overflow = "hidden";
  }

  event.preventDefault();
}
