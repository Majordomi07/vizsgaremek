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
    document.querySelector(".desktop .brand img").style.height = "55px";
  } else {
    document.getElementById("headerScroll").style.position = "static";
    document.querySelector(".desktop").style.backgroundColor = "";
    document.querySelector(".desktop").style.backdropFilter = "none";
    document.querySelector(".desktop").style.borderRadius = "none";
    document.getElementById("headerScroll").style.top = "0";
    document.querySelector(".desktop").style.paddingLeft = "0";
    document.querySelector(".desktop").style.paddingRight = "0";
    document.querySelector(".desktop").style.boxShadow = "none";
    document.querySelector(".desktop .brand img").style.height = "70px";
  }
}

/*

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.querySelector(".desktop").style.position = "sticky";
    document.querySelector(".desktop").style.top = "20px";
    document.querySelector(".desktop").style.backgroundColor = "#0000005d";
    document.querySelector(".desktop").style.backdropFilter = "blur(20px)";
    document.querySelector(".desktop").style.paddingTop = "0";
    document.querySelector(".desktop").style.padding = "15px";
    document.querySelector(".desktop").style.borderRadius = "10px";
    document.querySelector(".desktop .brand img").style.height = "50px";
    document.querySelector(".desktop").style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.1)";
  } else {
    document.querySelector(".desktop").style.position = "static";
    document.querySelector(".desktop").style.top = "0px";
    document.querySelector(".desktop").style.backgroundColor = "";
    document.querySelector(".desktop").style.backdropFilter = "none";
    document.querySelector(".desktop").style.padding = "0";
    document.querySelector(".desktop").style.paddingTop = "40px";
    document.querySelector(".desktop").style.borderRadius = "0";
    document.querySelector(".desktop .brand img").style.height = "70px";
    document.querySelector(".desktop").style.boxShadow = "none";
  }
}

*/
