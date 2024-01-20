const favReader = "https://icons.feedercdn.com/";
const container = document.getElementById("container");

const convertISOToRelative = (isoDateString) => {
  let date = new Date(isoDateString);

  let current = Date.now();
  let difference = current - +date;

  let seconds = Math.floor(difference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30.44);
  let years = Math.floor(days / 365.25);

  if (years >= 1) {
    return `${years} سال پیش`;
  } else if (months >= 1) {
    return `${months} ماه پیش`;
  } else if (days >= 1 && months === 0) {
    return `${days} روز قبل`;
  } else if (hours >= 1 && hours < 25) {
    return `${hours} ساعت پیش`;
  } else if (minutes >= 1) {
    return `${minutes} دقیقه پیش`;
  } else {
    return `${seconds} ثانیه قبل`;
  }
};

const sites = JSON.parse(localStorage.getItem("sites"))?.reverse() || [];
const readLater = JSON.parse(localStorage.getItem("readLater")) || [];
let datas = [];

const renderFeeds = async () => {
  if (sites.length === 0) {
    container.textContent = "فیدی ذخیره نشده است";
    container.style.fontSize = "20px";
    container.style.color = "white";
    container.style.textAlign = "center";
    container.style.paddingTop = "20px";
  }
  for (let i = 0; i < sites.length; i++) {
    const req = await fetch(sites[i].link);
    const res = await req.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(res, "text/xml");
    const items = Array.from(xmlDoc.getElementsByTagName("item")).forEach(
      (item) => {
        datas.push(item);
      }
    );
  }
  datas
    .sort((a, b) =>
      new Date(b.getElementsByTagName("pubDate")[0].textContent).getTime() >
      new Date(a.getElementsByTagName("pubDate")[0].textContent).getTime()
        ? 1
        : -1
    )
    .forEach((data) => {
      const headContainer = document.createElement("div");
      headContainer.className = "head_container";
      const singleItem = document.createElement("div");
      singleItem.className = "single_item";
      const firstSpan = document.createElement("span");
      firstSpan.textContent = convertISOToRelative(
        data.getElementsByTagName("pubDate")[0].textContent
      );
      firstSpan.style.whiteSpace = "nowrap";
      headContainer.appendChild(firstSpan);
      if (
        !readLater.find(
          (item) =>
            item.link === data.getElementsByTagName("link")[0].textContent
        )
      ) {
        const secondSpan = document.createElement("span");
        secondSpan.innerHTML = `<img src="../assets/Logos/bookmark.svg" />`;
        secondSpan.style.cursor = "pointer";
        secondSpan.addEventListener("click", () => {
          if (
            !readLater.find(
              (item) =>
                item.link === data.getElementsByTagName("link")[0].textContent
            )
          ) {
            secondSpan.innerHTML = `<img src="../assets/Logos/bookmark-active.svg" />`;
            readLater.push({
              link: data.getElementsByTagName("link")[0].textContent,
              title: data.getElementsByTagName("title")[0].textContent,
            });
            localStorage.setItem("readLater", JSON.stringify(readLater));
          }
        });
        headContainer.appendChild(secondSpan);
      }
      const h3 = document.createElement("h3");
      const a = document.createElement("a");
      a.textContent = data.getElementsByTagName("title")[0].textContent;
      a.href = data.getElementsByTagName("link")[0].textContent;
      a.target = "_blank";
      h3.appendChild(a);
      const p = document.createElement("div");
      p.innerHTML = data.getElementsByTagName("description")[0].textContent;
      singleItem.appendChild(headContainer);
      singleItem.appendChild(h3);
      singleItem.appendChild(p);
      container.appendChild(singleItem);
    });
};

renderFeeds();
