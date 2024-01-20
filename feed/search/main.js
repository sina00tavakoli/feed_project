const favReader = "https://icons.feedercdn.com/";

const categoriesData = JSON.parse(localStorage.getItem("categories"));
const sites = JSON.parse(localStorage.getItem("sites")) || [];
let feeds = [];

const searchInput = document.getElementById("search_input");
const categories = document.getElementById("categories");
const searchResult = document.getElementById("search_result");

const searchForFeed = async (name) => {
  searchResult.innerHTML = "";
  feeds = [];

  const isExactCategory = categoriesData.find(
    (cat) => cat.name === searchInput.value
  );
  if (
    isExactCategory &&
    !sites.find((site) => site.category === isExactCategory.name)
  ) {
    const req = await fetch(isExactCategory.searchSite);
    const res = await req.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(res, "text/xml");
    Array.from(xmlDoc.getElementsByTagName("item")).forEach((item) => {
      feeds.push(item);
    });
  } else {
    const sitesWithSimilarCategory = sites.filter((item) =>
      item.category.includes(searchInput.value)
    );
    for (let i = 0; i < sitesWithSimilarCategory.length; i++) {
      const req = await fetch(sitesWithSimilarCategory[i].link);
      const res = await req.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(res, "text/xml");
      Array.from(xmlDoc.getElementsByTagName("item")).forEach((item) => {
        feeds.push(item);
      });
    }
  }
  feeds.forEach((feed) => {
    const div = document.createElement("div");
    div.className = "search_item";
    const link = document.createElement("a");
    link.textContent = feed.getElementsByTagName("title")[0].textContent;
    link.href = feed.getElementsByTagName("link")[0].textContent;
    link.target = "_blank";
    const url = new URL(feed.getElementsByTagName("link")[0].textContent)
      .hostname;
    const favicon = document.createElement("img");
    favicon.src = `${favReader}${url}`;
    favicon.alt = "favicon";
    favicon.className = "favicon";
    div.appendChild(favicon);
    div.appendChild(link);
    searchResult.appendChild(div);
  });
};

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value;
  if (searchValue.length === 0) {
    searchResult.style.display = "none";
    categories.style.display = "grid";
  } else {
    categories.style.display = "none";
    categories.style.overflow = "hidden";
    searchForFeed(searchValue);
    searchResult.style.display = "flex";
  }
});
searchInput.addEventListener("click", () => {
  const searchValue = searchInput.value;
  if (searchValue.length === 0) {
    searchResult.style.display = "none";
    categories.style.display = "grid";
  } else {
    categories.style.display = "none";
    categories.style.overflow = "hidden";
    searchForFeed(searchValue);
    searchResult.style.display = "flex";
  }
});

const renderCategories = () => {
  categoriesData.forEach((category) => {
    const container = document.createElement("div");
    container.className = "grid_item";
    container.style.backgroundImage = `url(${category.img})`;
    container.style.backgroundSize = "cover";
    const span = document.createElement("span");
    span.textContent = category.name;
    container.appendChild(span);
    categories.appendChild(container);
    container.addEventListener("click", () => {
      searchInput.value = category.name;
      searchInput.click();
    });
  });
};
renderCategories();
