const categoriesData = [
  {
    name: "ورزشی",
    img: "../assets/Images/car.png",
    searchSite: "https://www.varzesh3.com/rss/all",
  },
  {
    name: "تکنولوژی",
    img: "../assets/Images/person.png",
    searchSite: "https://www.zoomit.ir/feed",
  },
  {
    name: "اخبار",
    img: "../assets/Images/headphone.png",
    searchSite: "https://www.farsnews.ir/rss",
  },
  {
    name: "سرگرمی",
    img: "../assets/Images/vr.png",
    searchSite: "https://www.zoomg.ir/feed/",
  },
];
localStorage.setItem("categories", JSON.stringify(categoriesData));

setTimeout(function () {
  const preLoader = document.getElementById("pre_loader");
  preLoader.style.opacity = "0%";
  // window.location.href = "";
  window.location.pathname = "/folders/index.html";
  setTimeout(() => {
    preLoader.style.display = "none";
  }, 400);
}, 500);
// const changeDOM = () => {
//   const rssElement = document.getElementsByTagName("rss")[0];
//   if (!rssElement) return;
//   const channelElement = rssElement.getElementsByTagName("channel")[0];
//   const titleElement = channelElement.getElementsByTagName("title")[0];
//   document.body.innerHTML = `<h1>RSS Feed</h1><div id="rss_feed"></div>`;
//   const feedElement = document.getElementById("rss_feed");
//   feedElement.innerHTML = `<h2>${titleElement.innerHTML
//     .split(" ")
//     .slice(0, 3)
//     .join(" ")}</h2>`;
// };
// async function getDOMData() {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   console.log(chrome.storage);
//   // localStorage.setItem("phasersTo", "locally");
//   // chrome.storage.local.set({ phasersTo: "awesome" }, function () {
//   //   //  Data's been saved boys and girls, go on home
//   // });
//   chrome.storage.local.get("phasersTo", function (e) {
//     //  Data's been saved boys and girls, go on home
//     console.log(e);
//   });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: changeDOM,
//   });
// }

// getDOMData();

// fetch("https://www.varzesh3.com/rss/all")
//   .then((response) => response.text())
//   .then((data) => {
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(data, "text/xml");
//     console.log(xmlDoc);
//   });
