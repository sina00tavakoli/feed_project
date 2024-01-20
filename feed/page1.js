const searchBtn = document.querySelector(".icon"),
    searchBox = document.querySelector(".search-box");

searchBtn.addEventListener("click", () => {
    searchBox.classList.toggle("active");
});



setTimeout(function () {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("all25").style.display = "block";
}, 3000);