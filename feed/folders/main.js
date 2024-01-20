// setTimeout(function () {
//   const preLoader = document.getElementById("pre_loader");
//   preLoader.style.opacity = "0%";
//   setTimeout(() => {
//     preLoader.style.display = "none";
//   }, 400);
// }, 500);

const foldersTest = [
  {
    name: "فولدر 1",
  },
  {
    name: "فولدر 2",
  },
];
// localStorage.setItem("folders", JSON.stringify(foldersTest));

const addFolderBtn = document.getElementById("add_folder_btn");
const cancelBtn = document.getElementById("cancel");
const form = document.getElementById("add_folder_form");
const foldersList = document.getElementById("folders_list");

const folders = JSON.parse(localStorage.getItem("folders")) || [];

function renderFolders() {
  foldersList.innerHTML = "";
  folders.forEach((folder) => {
    const li = document.createElement("li");
    const firstSpan = document.createElement("span");
    firstSpan.textContent = folder.name;
    const secondSpan = document.createElement("span");
    const img = document.createElement("img");
    img.src = "../assets/Logos/folder.svg";
    secondSpan.appendChild(img);
    li.appendChild(secondSpan);
    li.appendChild(firstSpan);
    li.addEventListener("click", () => {
      window.location.href = `./single-folder/index.html?folder=${folder.name}`;
    });
    foldersList.appendChild(li);
  });
}

renderFolders();

addFolderBtn.addEventListener("click", () => {
  document.getElementById("folders").style.display = "none";
  document.querySelector(".add_folder_form_container").style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  document.querySelector(".add_folder_form_container").style.display = "none";
  form.querySelector("input").value = "";
  document.getElementById("folders").style.display = "block";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const folderName = form.querySelector("input").value;
  console.log(folderName);
  if (!folderName) return;
  folders.push({ name: folderName });
  localStorage.setItem("folders", JSON.stringify(folders));
  renderFolders();
  document.querySelector(".add_folder_form_container").style.display = "none";
  form.querySelector("input").value = "";
  document.getElementById("folders").style.display = "block";
});
