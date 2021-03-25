const personagensContador = document.getElementById("personagens");
const starshipsContador = document.getElementById("starships");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

preencherContadores();

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

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

Promise.all([getUserAccount(), getUserPermissions()]).then(function (results) {
  const acct = results[0];
  const perm = results[1];
});
