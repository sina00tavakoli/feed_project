const favReader = "https://icons.feedercdn.com/";

const sitesList = document.getElementById("sites_list");

const searchParams = new URLSearchParams(window.location.search);
const folderName = searchParams.get("folder");

const sitesInFolder = JSON.parse(localStorage.getItem("sites")).filter(
  (item) => item.folder === folderName
);

function renderSites() {
  sitesList.innerHTML = "";
  if (sitesInFolder?.sites?.length === 0) {
    const li = document.createElement("li");
    li.style.color = "white";
    li.style.fontSize = "20px";
    li.style.textAlign = "center";
    li.style.marginTop = "20px";
    li.textContent = "فیدی وجود ندارد";
    sitesList.appendChild(li);
  } else {
    sitesInFolder.forEach((site) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "site_item";
      a.href = `../single-site/index.html?link=${site.link}`;
      const firstSpan = document.createElement("span");
      const secondSpan = document.createElement("span");
      const img = document.createElement("img");
      const url = new URL(site.link).hostname;
      img.src = `${favReader}${url}`;
      img.alt = "favicon";
      img.className = "favicon";
      firstSpan.textContent = site.name;
      secondSpan.appendChild(img);
      a.appendChild(secondSpan);
      a.appendChild(firstSpan);
      li.appendChild(a);
      sitesList.appendChild(li);
    });
  }
}

renderSites();
