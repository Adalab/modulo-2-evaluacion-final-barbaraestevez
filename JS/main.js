"use strict";

const inputElem = document.querySelector(".js-search");
const button = document.querySelector(".js-button");
const showFavList = document.querySelector(".js-showFavList");
const showAllList = document.querySelector(".js-showsList");

let globalData = []; // from the API
let selectedFavShows = []; // favourites selected

// To find shows

function setAllShows() {
  showAllList.innerHTML = "";
  getData();
}

// Render

function getData() {
  const inputValue = inputElem.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;
      renderList();
      addListeners();
    });
}

function addListeners() {
  const allMoviesListed = document.querySelectorAll(".js-listAll");
  for (const moviesListed of allMoviesListed) {
    moviesListed.addEventListener("click", handleClickFav);
  }
}

function handleClickFav(event) {
  let selectFavShow;
  selectFavShow = event.currentTarget;
  selectFavShow.classList.toggle("fav");

  let selectedFav = {};
  selectedFav.id = selectFavShow.id;
  selectedFav.name = selectFavShow.innerText;
  selectedFav.image = selectFavShow.lastElementChild.currentSrc;

  if (selectFavShow.classList.contains("fav")) {
    selectedFavShows.push(selectedFav);
  }
  localStorageSaved();
  renderShowFav();
}

function localStorageSaved() {
  localStorage.setItem("fav", JSON.stringify(selectedFavShows));
}

function renderShow(show) {
  let imageDefault = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`; // when image is null, render this.
  if (show.image) {
    imageDefault = show.image;
  }
  return `<li id="${show.id}" class="shows__list-item fav__list js-listAll">
  <h2 class="show__title>${show.name}</h2><img class="img" src="${imageDefault}"/></li>`;
}

function renderShowFav() {
  showFavList.innerHTML = `<h2 class="favourites">Mis series favoritas</h2>`;
  for (let i = 0; i < selectedFavShows.length; i++) {
    showFavList.innerHTML += renderShow(selectedFavShows[i]);
  }
}

// Render List
function renderList() {
  for (let i = 0; i < globalData.length; i++) {
    const dataShowsElement = globalData[i].show;
    let show = [];
    show.id = dataShowsElement.id;
    show.name = dataShowsElement.name;
    if (dataShowsElement.image) {
      show.image = dataShowsElement.image.medium;
    }
    showAllList.innerHTML += renderShow(show);
  }
}

function showLocalStorage() {
  if (localStorage.getItem("fav")) {
    selectedFavShows = JSON.parse(localStorage.getItem("fav"));
    console.log("It´s favouriteee");
    renderShowFav(selectedFavShows);
  }
}
showLocalStorage();

button.addEventListener("click", setAllShows);
