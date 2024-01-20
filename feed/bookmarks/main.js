const favReader = "https://icons.feedercdn.com/";
const readLaterContainer = document.getElementById("container");
const readLater = JSON.parse(localStorage.getItem("readLater")).reverse() || [];

const renderReadLater = () => {
  readLaterContainer.innerHTML = "";
  if (readLater.length === 0) {
    readLaterContainer.textContent = "موردی وجود ندارد";
    readLaterContainer.style.fontSize = "20px";
    readLaterContainer.style.color = "white";
    readLaterContainer.style.textAlign = "center";
    readLaterContainer.style.paddingTop = "20px";
  }
  readLater.forEach((item) => {
    const { title, link } = item;
    const div = document.createElement("div");
    const span = document.createElement("span");
    span.textContent = title;
    const img = document.createElement("img");
    img.src = `${favReader}${new URL(link).hostname}`;
    div.className = "read_later_item";
    div.appendChild(img);
    div.appendChild(span);
    div.addEventListener("click", () => {
      window.open(link, "_blank");
      readLater.splice(readLater.indexOf(item), 1);
      localStorage.setItem("readLater", JSON.stringify(readLater));
      renderReadLater();
    });
    readLaterContainer.appendChild(div);
  });
};

renderReadLater();
