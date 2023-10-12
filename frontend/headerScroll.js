window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".desktop").style.position = "sticky";
    document.querySelector(".desktop").style.top = "20px";
    document.querySelector(".desktop").style.backgroundColor = "#ffffff66";
    document.querySelector(".desktop").style.backdropFilter = "blur(20px)";
    document.querySelector(".desktop").style.paddingTop = "0";
    document.querySelector(".desktop").style.padding = "15px";
    document.querySelector(".desktop").style.borderRadius = "10px";
    document.querySelector(".desktop .brand img").style.height = "50px";
  } else {
    document.querySelector(".desktop").style.position = "static";
    document.querySelector(".desktop").style.top = "0px";
    document.querySelector(".desktop").style.backgroundColor = "";
    document.querySelector(".desktop").style.backdropFilter = "none";
    document.querySelector(".desktop").style.padding = "0";
    document.querySelector(".desktop").style.paddingTop = "40px";
    document.querySelector(".desktop").style.borderRadius = "0";
    document.querySelector(".desktop .brand img").style.height = "70px";
  }
}
