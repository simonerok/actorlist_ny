/* KONSTANTER */
let temp = document.querySelector("template");
let container = document.querySelector("#indhold");
let json;
const header = document.querySelector("header h2");

/* HENTER DATA */

/* Henter daten via filen actor.json */
const fil = "actors.json";
/* Henter json  */
async function hentData(fil) {
  const respons = await fetch(fil);
  /* Gør at vores template nu indeholder vores json data */
  json = await respons.json();
  vis(json);
}

/* FILTRERING  */
/* Her definere vi at filter = alle, dette gør at alle bliver vist når siden bliver laoded ind*/
let filter = "alle";
const filterKnapper = document.querySelectorAll("nav button");

/* lytter efter klik på knapper og kalder funktionen filtrerknapper */
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerknapper));

function filtrerknapper() {
  /* Den finder data-movie værdierne og sætter filteret til dette */
  filter = this.dataset.movie;
  /* sletter klassen valgt når der klikkes på noget nyt */
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  /*headers tekst kontent = knaps kontent*/
  header.textContent = this.textContent;
  /*HUSK AT KALDE FUNKTIONEN*/
  vis(json);
}

/* ARRAY  */
function vis(json) {
  console.log(json);
  container.textContent = "";

  json.forEach((actor) => {
    /* Dette fungere som en if else sætning så den viser alle til at starte med og ellers filtrere igennem filmene*/
    if (filter == "alle" || filter == actor.movie) {
      console.log("hej");

      const klon = temp.cloneNode(true).content;
      klon.querySelector(".movie").textContent = actor.movie;
      klon.querySelector(".fuldeNavn").textContent = actor.fullname;
      klon.querySelector("article").addEventListener("click", () => visEnkelt(actor));
      container.appendChild(klon);
    }
  });
}

/* POPOP  */

/* Luk knap til popup */
document.querySelector("#luk").addEventListener("click", () => (popop.style.display = "none"));

function visEnkelt(popopData) {
  const popop = document.querySelector("#popop");
  popop.style.display = "flex";
  popop.querySelector(".visNavn").textContent = "Navn: " + popopData.fullname;
  popop.querySelector(".visFilm").textContent = "Film: " + popopData.movie;
}

/* Husk at kalde funktionen til sidst for at hente dataten ind  */
hentData(fil);
