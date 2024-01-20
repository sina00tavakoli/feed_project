// setTimeout(function () {
//   const preLoader = document.getElementById("pre_loader");
//   preLoader.style.opacity = "0%";
//   setTimeout(() => {
//     preLoader.style.display = "none";
//   }, 400);
// }, 500);

const addFolderBtn = document.getElementById("add_folder_btn");
const cancelBtn = document.getElementById("cancel");
const form = document.getElementById("add_folder_form");

addFolderBtn.addEventListener("click", () => {
  document.getElementById("folders").style.display = "none";
  document.querySelector(".add_folder_form_container").style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  document.querySelector(".add_folder_form_container").style.display = "none";
  form.querySelector("input").value = "";
  document.getElementById("folders").style.display = "block";
});
