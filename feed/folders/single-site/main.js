const favReader = "https://icons.feedercdn.com/";

const siteFeeds = document.getElementById("feeds_list");

const searchParams = new URLSearchParams(window.location.search);
const siteLink = searchParams.get("link");

const siteData = async () => {
  const req = await fetch(siteLink);
  const res = await req.text();
  return res;
};

async function renderSites() {
  siteFeeds.innerHTML = "";
  const siteDOC = await siteData();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(siteDOC, "text/xml");
  if (!xmlDoc) {
    const li = document.createElement("li");
    li.style.color = "white";
    li.style.fontSize = "20px";
    li.style.textAlign = "center";
    li.style.marginTop = "20px";
    li.textContent = "فیدی وجود ندارد";
    siteFeeds.appendChild(li);
  } else {
    Array.from(xmlDoc.getElementsByTagName("item")).forEach((site) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "site_item";
      const firstSpan = document.createElement("span");
      const secondSpan = document.createElement("span");
      const img = document.createElement("img");
      const url = new URL(site.getElementsByTagName("link")[0].textContent)
        .hostname;
      img.src = `${favReader}${url}`;
      img.alt = "favicon";
      img.className = "favicon";
      a.href = site.getElementsByTagName("link")[0].textContent;
      a.target = "_blank";
      firstSpan.textContent = site.getElementsByTagName("title")[0].textContent;
      secondSpan.appendChild(img);
      a.appendChild(secondSpan);
      a.appendChild(firstSpan);
      li.appendChild(a);
      siteFeeds.appendChild(li);
    });
  }
}

renderSites();
