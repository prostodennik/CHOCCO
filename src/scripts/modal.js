const hamburgerBtn = document.querySelector(".hamburger");
const modalMenu = document.querySelector(".fullscreen-menu");
const body = document.body;
const hamburgerBtnClose = document.getElementById("close");

hamburgerBtn.addEventListener("click", function () {
  modalMenu.style.display = "flex";
  body.style.overflow = "hidden";
});

hamburgerBtnClose.addEventListener("click", function () {
  modalMenu.style.display = "none";
  body.style.overflow = "";
});
