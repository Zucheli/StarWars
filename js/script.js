const personagensContador = document.getElementById("personagens");
const starshipsContador = document.getElementById("starships");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

preencherContadores();
preencherTabela();

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(desenharGrafico);

async function desenharGrafico() {
  const response = await swapiGet("films/");
  const filmsArray = response.data.results;
  console.log(filmsArray);

  const dataArray = [];
  dataArray.push(["Films", "Species"]);
  filmsArray.forEach(film => {
    dataArray.push([film.title, film.species.length]);
  });

  console.log(dataArray)

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Species by Film",
    legend: "none"
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

function preencherContadores() {
  Promise.all([
    swapiGet("people/"),
    swapiGet("starships/"),
    swapiGet("planets/"),
    swapiGet("vehicles/"),
  ]).then(function (results) {
    personagensContador.innerHTML = results[0].data.count;
    starshipsContador.innerHTML = results[1].data.count;
    planetasContador.innerHTML = results[2].data.count;
    navesContador.innerHTML = results[3].data.count;
  });
}

async function preencherTabela() {
  const response = await swapiGet("films/");
  const tableData = response.data.results;
  tableData.forEach((film) => {
    $("#films-table").append(
      `<tr>
            <td>${film.title}</td>
            <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
            <td>${film.director}</td>
            <td>${film.episode_id}</td>
        <tr>`
    );
  });
}

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}
