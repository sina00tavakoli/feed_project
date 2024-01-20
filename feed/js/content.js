const favReader = "https://icons.feedercdn.com/";

const styles = `<style>
@font-face {
    font-family: "Vazirmatn";
    src: url("chrome-extension://eofgmmhdimknfoildoejcecaljhhejal/Vazirmatn-Regular.ttf");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Vazirmatn";
    src: url("chrome-extension://eofgmmhdimknfoildoejcecaljhhejal/Vazirmatn-Bold.ttf");
    font-weight: 700;
    font-style: normal;
  }
  
  /* @font-face {
      font-family: "Vazirmatn";
      src: url("chrome-extension://eofgmmhdimknfoildoejcecaljhhejal/Vazirmatn-Regular.ttf")
        format("truetype");
        
        font-weight: normal;
        font-style: normal;
      } */
  /* src: url("chrome-extension://eofgmmhdimknfoildoejcecaljhhejal/Vazirmatn-VariableFont_wght.ttf"); */
  
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  h3 {
    all: unset;
  }
  
  body {
    direction: rtl;
    width: 100%;
    min-height: 100vh;
    padding-right: 300px;
    padding-left: 50px;
    padding-block: 20px 60px;
    font-family: "Vazirmatn";
  }
  
  aside {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-block: 20px;
    padding-inline: 20px;
    top: 0;
    right: 0;
    height: 100vh;
    width: 270px;
    background-color: #2a282c8c;
    font-family: "Vazirmatn";
  }
  
  aside h1 {
    text-align: center;
    color: white;
    font-size: 20px;
  }
  
  aside p {
    color: white;
    margin-top: 6px;
  }
  
  #items-container {
    display: block;
    padding-bottom: 40px;
    padding-inline: 50px;
    min-height: 100%;
    width: 100%;
  }
  
  #items-container > div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;
  }
  
  .item {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  h3 {
    font-size: 20px;
    font-weight: bold;
  }
  
  a {
    cursor: pointer;
  }
  
  p {
    font-size: 14px;
  }
  
  .img-container {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  
  .img-container img {
    display: block;
    width: 20px !important;
    height: 20px !important;
  }
  
</style>`;

// const tabUrl = window.location.href;

// fetch(tabUrl)
//   .then((response) => response.text())
//   .then((data) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(data, "text/html");
//     console.log(doc);
//     const itemContainer = document.createElement("div");
//     doc.body.innerHTML = "";
//     // doc.body.appendChild(itemContainer);
//     const img = document.createElement("img");
//     console.log("After creating img:", img); // Log 1
//     img.className = "fav_icon";
//     img.src = "https://icons.feedercdn.com/varzesh3.com";
//     img.alt = "fav icon";
//     console.log("Before setting style:", img); // Log 2
//     img.style.width = "20px";
//     img.style.height = "20px";
//     itemContainer.appendChild(img);
//     itemContainer.innerHTML = `<img class="fav_icon" src="${favReader}" alt="fav icon" />`;
//     doc.appendChild(itemContainer);
//   });

const parseDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const formatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran",
  });
  const [dateString, timeString] = formatter.format(date).split(" ");

  return { dateString: dateString.slice(0, -1), timeString };
};

const aside = ({ title, description, time }) => {
  const el = document.createElement("aside");
  const heading = document.createElement("h1");
  heading.textContent = title;
  el.appendChild(heading);
  const des = document.createElement("p");
  des.textContent = description;
  el.appendChild(des);
  const date = document.createElement("p");
  date.textContent = `${parseDateTime(time).dateString} ${
    parseDateTime(time).timeString
  }`;
  el.appendChild(date);
  return el;
};

const addItem = (item) => {
  const itemContainer = document.createElement("div");
  itemContainer.classList = "item";
  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  const imgTag = document.createElement("img");
  imgTag.setAttribute("src", favReader);
  //   const imgTag = `<img src="${favReader}" alt="icon" />`;
  imgContainer.appendChild(imgTag);
  itemContainer.appendChild(imgContainer);
  itemContainer.innerHTML += `<h3><a href="${
    item.getElementsByTagName("link")[0].textContent
  }" rel="noopener noreferer" target="_blank" >${
    item.getElementsByTagName("title")[0].textContent
  }</a></h3>`;
  const description = document.createElement("p");
  description.textContent =
    item.getElementsByTagName("description")[0].textContent;
  itemContainer.appendChild(description);
  itemContainer.querySelector("a").addEventListener("click", (e) => {
    const link = e.target.getAttribute("href");
    window.open(link, "_blank");
  });
  return itemContainer;
};

const changeDOM = () => {
  const rssElement = document.getElementsByTagName("rss")[0];
  if (!rssElement) return;
  document.head.innerHTML += styles;
  document.body.innerHTML = "";
  console.log(document.head);
  const channelElement = rssElement.getElementsByTagName("channel")[0];
  const rssDesc = channelElement.getElementsByTagName("description")[0];
  const rssDate = channelElement.getElementsByTagName("pubDate")[0];
  const rssItems = channelElement.getElementsByTagName("item");

  console.log(channelElement);
  const titleElement = channelElement.getElementsByTagName("title")[0];
  document.body.appendChild(
    aside({
      description: rssDesc.textContent,
      title: titleElement.textContent,
      time: rssDate.textContent,
    })
  );
  const itemsContainer = document.createElement("div");
  itemsContainer.id = "items-container";
  for (let i = 0; i < rssItems.length; i++) {
    itemsContainer.appendChild(addItem(rssItems[i]));
  }
  document.body.appendChild(itemsContainer);
};

changeDOM();
