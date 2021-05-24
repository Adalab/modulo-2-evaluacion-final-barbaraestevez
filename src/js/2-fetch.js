let globalData = [];
let favSeries = [];

function getApi() {
  const inputValue = document.querySelector(".js-formSearch").value;
  if (localStorage.getItem("seriesList") === null) {
    fetch("//api.tvmaze.com/search/shows?q=${inputValue}")
      .then((response) => response.json())
      .then((data) => {
        globalData = data;

        localStorage.setItem("series", JSON.stringify(globalData));

        renderSeries(globalData);
      });
  } else {
    globalData = JSON.parse(localStorage.getItem("seriesList"));
    renderSeries(globalData);
  }
}

function renderSeries(globalData) {
  seriesList.innerHTML = "";

  for (let i = 0; i < globalData.length; i++) {
    let serieElement = globalData[i];
    showName = globalData[i].show.name;
    showImage = globalData[i].show.image;
    showId = globalData[i].show.id;
    if (serieImage === null) {
      image = defaultImage;
    }
  }
}
seriesList.innerHTML += `<li data-id="${serie.id}" class="serie__list--item js-serie ${serie.image}">
<h4 class="item__name">${serie.name}</h4>`;

function handleClick() {
  getApi();
}

btn.addEventListener("click", handleClick);
