const favReader = "https://icons.feedercdn.com/";

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

const container = document.getElementById("container");
const loading = document.getElementById("loading");

const sites = JSON.parse(localStorage.getItem("sites")) || [];
const categories = JSON.parse(localStorage.getItem("categories")) || [];
let selectedCategory = categories[0].name;

const showForm = ({ siteName, siteLink }) => {
  const renderCategories = () => {
    const categoryContainer = document.createElement("div");
    categoryContainer.className = "category_container";
    const categoryHead = document.createElement("div");
    categoryHead.className = "category_head";
    categoryHead.textContent = "دسته‌بندی مرتبط";
    categoryContainer.appendChild(categoryHead);
    const categoryBody = document.createElement("div");
    categoryBody.className = "category_body";
    categoryBody.id = "category_body";
    categories.forEach((category) => {
      const container = document.createElement("div");
      container.className = "category_input_container";
      const input = document.createElement("input");
      const label = document.createElement("label");
      label.textContent = category.name;
      label.htmlFor = category.name;
      input.type = "radio";
      input.name = "category";
      input.value = category.name;
      input.checked = category.name === selectedCategory;
      input.id = category.name;
      container.appendChild(input);
      container.appendChild(label);

      input.addEventListener("click", () => {
        selectedCategory = category.name;
      });

      categoryBody.appendChild(container);
    });
    categoryContainer.appendChild(categoryBody);
    return categoryContainer;
  };
  const folders = JSON.parse(localStorage.getItem("folders")) || [];
  container.innerHTML = "";
  const form = document.createElement("form");
  const h2 = document.createElement("h2");
  h2.textContent = "ایجاد کردن فید جدید";
  h2.style.color = "white";
  form.appendChild(h2);
  const inputContainer = document.createElement("div");
  inputContainer.className = "input_container";
  const lable = document.createElement("label");
  lable.textContent = "عنوان";
  lable.htmlFor = "site_name";
  inputContainer.appendChild(lable);
  const input = document.createElement("input");
  input.type = "text";
  input.value = siteName;
  input.id = "site_name";
  inputContainer.appendChild(input);
  form.appendChild(inputContainer);
  form.id = "add_feed_form";
  const selectContainer = document.createElement("div");
  selectContainer.className = "select_container";
  const selectHead = document.createElement("div");
  selectHead.className = "select_head";
  const firstSpan = document.createElement("span");
  firstSpan.textContent = "اننتخاب پوشه";
  selectHead.appendChild(firstSpan);
  const a = document.createElement("a");
  a.innerHTML = `<img src="../assets/Logos/plus-active.svg" />`;
  a.href = "../folders/index.html";
  selectHead.appendChild(a);
  selectContainer.appendChild(selectHead);
  const selectBody = document.createElement("select");
  selectBody.style.marginTop = "4px";
  selectBody.id = "folder_select";
  folders.forEach((folder) => {
    const option = document.createElement("option");
    option.value = folder.name;
    option.textContent = folder.name;
    selectBody.appendChild(option);
  });
  selectContainer.appendChild(selectBody);

  form.appendChild(selectContainer);
  form.appendChild(renderCategories());
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons_container";
  const cancelButton = document.createElement("a");
  cancelButton.textContent = "انصراف";
  cancelButton.className = "cancel_button";
  cancelButton.href = "index.html";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "ذخیره";
  submitButton.className = "submit_button";
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const folderName = document.getElementById("folder_select").value || "";
    const siteName = document.getElementById("site_name").value;
    const categoryName = selectedCategory;
    const data = {
      name: siteName,
      category: categoryName,
      link: siteLink,
      folder: folderName,
    };
    sites.push(data);
    localStorage.setItem("sites", JSON.stringify(sites));
    window.location.pathname = "index.html";
  });
  buttonsContainer.appendChild(submitButton);
  buttonsContainer.appendChild(cancelButton);
  form.appendChild(buttonsContainer);
  container.appendChild(form);
};

const renderSiteData = ({ title, description, link }) => {
  const dataContainer = document.createElement("div");
  const infoContainer = document.createElement("div");
  infoContainer.className = "info_container";
  dataContainer.className = "data_container";
  const h2 = document.createElement("h2");
  h2.textContent = title;
  const p = document.createElement("p");
  p.textContent = description;
  const url = new URL(link);
  const favicon = document.createElement("img");
  favicon.src = `${favReader}${url.hostname}`;
  favicon.alt = "favicon";
  favicon.className = "favicon";
  const secondContainer = document.createElement("div");
  secondContainer.className = "second_container";
  secondContainer.appendChild(favicon);
  secondContainer.appendChild(h2);
  infoContainer.appendChild(secondContainer);
  infoContainer.appendChild(p);
  dataContainer.appendChild(infoContainer);
  const doesSiteFollowed = sites.find((site) => site.link === link);
  if (!doesSiteFollowed) {
    const followButton = document.createElement("button");
    followButton.textContent = "دنبال کردن سایت";
    followButton.id = "follow_button";
    followButton.addEventListener("click", () => {
      showForm({ siteLink: link, siteName: title });
    });
    dataContainer.appendChild(followButton);
  }
  return dataContainer;
};

const renderItems = (items, siteTitle) => {
  const itemsContainer = document.createElement("div");
  itemsContainer.className = "items_container";
  items.forEach((item) => {
    const headContainer = document.createElement("div");
    headContainer.className = "head_container";
    const singleItem = document.createElement("div");
    singleItem.className = "single_item";
    const firstSpan = document.createElement("span");
    firstSpan.textContent = siteTitle;
    headContainer.appendChild(firstSpan);
    const secondSpan = document.createElement("span");
    secondSpan.textContent = convertISOToRelative(
      item.getElementsByTagName("pubDate")[0].textContent
    );
    secondSpan.style.whiteSpace = "nowrap";
    headContainer.appendChild(secondSpan);
    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    a.textContent = item.getElementsByTagName("title")[0].textContent;
    a.href = item.getElementsByTagName("link")[0].textContent;
    a.target = "_blank";
    h3.appendChild(a);
    const p = document.createElement("div");
    p.innerHTML = item.getElementsByTagName("description")[0].textContent;
    singleItem.appendChild(headContainer);
    singleItem.appendChild(h3);
    singleItem.appendChild(p);
    itemsContainer.appendChild(singleItem);
  });
  return itemsContainer;
};

const getTabData = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const getTabDOM = await fetch(tab.url);
  const tabDOM = await getTabDOM.text();
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(tabDOM, "text/xml");
  console.log(doc);
  if (!doc.getElementsByTagName("rss")[0]) {
    loading.style.display = "none";
    const h2 = document.createElement("h2");
    h2.textContent = "سایت مورد نظر فاقد RSS می‌باشد";
    h2.style.paddingBlock = "20px";
    h2.style.textAlign = "center";
    h2.style.color = "white";
    container.appendChild(h2);
  } else {
    loading.style.display = "none";
    const title = doc.getElementsByTagName("title")[0].textContent;
    const link = tab.url;
    const description = doc.getElementsByTagName("description")[0].textContent;
    container.appendChild(renderSiteData({ title, description, link }));
    container.appendChild(
      renderItems(Array.from(doc.getElementsByTagName("item")), title)
    );
  }
};

getTabData();
