window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.querySelector(".container .desktop").style.position = "sticky";
    document.querySelector(".container .desktop").style.top = "20px";
    document.querySelector(".container .desktop").style.backgroundColor = "#0000005d";
    document.querySelector(".container .desktop").style.backdropFilter = "blur(20px)";
    document.querySelector(".container .desktop").style.paddingTop = "0";
    document.querySelector(".container .desktop").style.padding = "15px";
    document.querySelector(".container .desktop").style.borderRadius = "10px";
    document.querySelector(".container .desktop .brand img").style.height = "50px";
    document.querySelector(".container .desktop").style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.1)";
  } else {
    document.querySelector(".container .desktop").style.position = "static";
    document.querySelector(".container .desktop").style.top = "0px";
    document.querySelector(".container .desktop").style.backgroundColor = "";
    document.querySelector(".container .desktop").style.backdropFilter = "none";
    document.querySelector(".container .desktop").style.padding = "0";
    document.querySelector(".container .desktop").style.paddingTop = "40px";
    document.querySelector(".container .desktop").style.borderRadius = "0";
    document.querySelector(".container .desktop .brand img").style.height = "70px";
    document.querySelector(".container .desktop").style.boxShadow = "none";
  }
}
