"use strict";

const inputElem = document.querySelector(".js-search");
const button = document.querySelector(".js-button");
const showFavList = document.querySelector(".js-showFavList");
const showAllList = document.querySelector(".js-showsList");
const imageDefault = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`; // when image is null, render this.
const resetAllFav = document.querySelector('.js-button-reset'); // const para borrar todos los fav

let globalData = []; // from the API. Array donde guardo resultado de la búsqueda que hace fetch.
let favShows = []; // Array de favoritos.

// conecto con la API
function getData() {
  let inputValue = inputElem.value.toLowerCase();
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;
      renderList(globalData);
    });
}

button.addEventListener("click", getData);

// Render List una vez que carga API o se la llama para repintar.
function renderList() {
  //limpia el contenido del ul para que no duplique la info
  showAllList.innerHTML = "";
  // for of para recorrer el array de globalData
  for (const data of globalData) {
    // aquí vemos si es favorita o no para añadirle o no ponerle la clase
    const isFav = favShows.find((theFav) => theFav.show.id === data.show.id);
    let favourite = "";
    if (isFav === undefined) {
      favourite = "";
    } else {
      favourite = "favouriteShow";
    }
    // en función de si tiene img o no le añades la img default o la de la API.
    if (data.show.image === null) {
      showAllList.innerHTML += `<li id="${data.show.id}" class="shows__list-item ${favourite} js-listAll">
      <img class="image" src="${imageDefault}"/><h2 class="show__title">${data.show.name}</h2></li>`;
    } else {
      showAllList.innerHTML += `<li id="${data.show.id}" class="shows__list-item ${favourite} js-listAll">
      <img class="image" src="${data.show.image.medium}"/><h2 class="show__title">${data.show.name}</h2></li>`;
    }
  }
  // llamo a la función para poder hacer click en las series
  addListeners();
}

// pongo a escuchar a todos los <li> declarados para que se pueda clickar sobre cada uno ellos (con el for of)
function addListeners() {
  const allMoviesListed = document.querySelectorAll(".js-listAll");
  for (const moviesListed of allMoviesListed) {
    moviesListed.addEventListener("click", handleClickFav);
  }
}

// función que maneja favs. Al clickar en un <li> llama a esta función
function handleClickFav(event) {
  let selectFavShow;
  selectFavShow = event.currentTarget;
  let selectedShowId = parseInt(selectFavShow.id);
  //busco en globaldata el elemento con id selectedShowId
  const infoSelectedShow = globalData.find(
    (data) => data.show.id === selectedShowId
  );
  //busco si la serie clickada está en fav
  const isFav = favShows.find((theFav) => theFav.show.id === selectedShowId);
  if (isFav === undefined) {
    // si no está en favoritos, lo añado
    favShows.push(infoSelectedShow);
  } else {
    // devuelve el array de fav menos el objeto que acabamos de sacar
    favShows = favShows.filter((theFav) => theFav.show.id !== selectedShowId);
  }
  // guarda en localstorage los fav clickados y volvemos a pintar ambas listas actualizadas.
  localStorageSaved();
  renderShowFav();
  renderList();
}

function localStorageSaved() {
  localStorage.setItem("fav", JSON.stringify(favShows));
}

// pinto la lista de fav
function renderShowFav() {
  showFavList.innerHTML = "";
  // recorro el array de favoritos
  for (const fav of favShows) {
    // si la img del fav no está se carga la img default. Pinto los <li> por cada fav. else, si la img está se carga todo desde el API.
    if (fav.show.image === null) {
      showFavList.innerHTML += `<li id="${fav.show.id}" class="fav__list-item">
      <img class="fav__image" src="${imageDefault}"/><h2 class="fav__title">${fav.show.name}</h2></li>`;
    } else {
      showFavList.innerHTML += `<li id="${fav.show.id}" class="fav__list-item">
      <img class="fav__image" src="${fav.show.image.medium}"/><h2 class="fav__title">${fav.show.name}</h2></li>`;
    }
  }
}

// función que recupera los fav del localstorage y vuelve a pintar la lista de fav y la otra lista
function showLocalStorage() {
  favShows = JSON.parse(localStorage.getItem("fav"));
  renderShowFav();
  renderList();
}
// cuando carga la página si tengo almacenado favs (en localstorage) me llama a la función, si no, NO.
if (localStorage.getItem("fav") !== null) {
  showLocalStorage();
}

// reseteo la lista de favoritos de una vez y vuelvo a cargar la página como de inicio
function handleResetFavs() {
  favShows = [];
  localStorage.clear();
  renderShowFav();
  renderList();
}

resetAllFav.addEventListener("click", handleResetFavs);
