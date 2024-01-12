window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("headerScroll").style.position = "sticky";
    document.querySelector(".desktop").style.backgroundColor = "#0000005d";
    document.querySelector(".desktop").style.backdropFilter = "blur(20px)";
    document.querySelector(".desktop").style.borderRadius = "10px";
    document.getElementById("headerScroll").style.top = "20px";
    document.querySelector(".desktop").style.paddingLeft = "30px";
    document.querySelector(".desktop").style.paddingRight = "30px";
    document.querySelector(".desktop").style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.1)";
    document.querySelector(".desktop .brand img").style.height = "50px";
  } else {
    document.getElementById("headerScroll").style.position = "static";
    document.querySelector(".desktop").style.backgroundColor = "";
    document.querySelector(".desktop").style.backdropFilter = "none";
    document.querySelector(".desktop").style.borderRadius = "none";
    document.getElementById("headerScroll").style.top = "0";
    document.querySelector(".desktop").style.paddingLeft = "0";
    document.querySelector(".desktop").style.paddingRight = "0";
    document.querySelector(".desktop").style.boxShadow = "none";
    document.querySelector(".desktop .brand img").style.height = "60px";
  }
}
