let globalData = [];
let favSeries = [];

fetch("http://api.tvmaze.com/search/shows")
  .then((response) => response.json())
  .then((data) => {
    globalData = data.Series;
  });

serie = data.series[0];
seriesList.innerHTML = `
<li>
    <div class="item__photo-each">
        <h3 class="item-name">${serie.name}</h3>
        {
          "id": 2095422,
          "url": "https://www.tvmaze.com/episodes/2095422/please-feel-at-ease-mr-ling-1x05-episode-5",
          "name": "Episode 5",
          "season": 1,
          "number": 5,
          "type": "regular",
          "airdate": "2021-05-21",
          "airtime": "",
          "airstamp": "2021-05-21T04:00:00+00:00",
          "runtime": 45,
          "image": null,
          "summary": null,
          "_links": {
            "self": {
              "href": "https://api.tvmaze.com/episodes/2095422"
            }
          }
    </div>
</li>`;
