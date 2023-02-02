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
let filter = "alle";
const filterKnapper = document.querySelectorAll("nav button");

/* lytter efter klik på knapper og kalder funktionen filtrerknapper */
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerknapper));

function filtrerknapper() {
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
    /* Gør at filreringen altid starter med at vise alle */
    if (filter == "movies") {
      console.log("hej");

      const klon = temp.cloneNode(true).content;
      klon.querySelector(".movie").textContent = actor.movie;
      klon.querySelector("article").addEventListener("click", () => visEnkelt(actor));
      container.appendChild(klon);
    } else {
      const klon = temp.cloneNode(true).content;
      klon.querySelector(".fuldeNavn").textContent = actor.fullname;
      klon.querySelector("article").addEventListener("click", () => visEnkelt(actor));
      container.appendChild(klon);
    }
  });
}

/* Popup  */

/* Luk knap til popup */
document.querySelector("#luk").addEventListener("click", () => (popop.style.display = "none"));

function visEnkelt(popopData) {
  const popop = document.querySelector("#popop");
  popop.style.display = "flex";
  popop.querySelector(".visNavn").textContent = "Navn: " + popopData.fullname;
  popop.querySelector(".visFilm").textContent = "Film: " + popopData.movie;
}

hentData(fil);
