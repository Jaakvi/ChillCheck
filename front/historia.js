import { fetchData } from "./fetch.js";
import "./styles.css";

// Haetaan kaikki käyttäjien entriteet ja lisätään tapahtumankuuntelija napille
const allButton = document.querySelector(".get_users");
allButton.addEventListener("click", getEntries);

// Funktio, joka hakee käyttäjien entriteet
async function getEntries() {
  console.log("Haetaan kaikki entrit");

  const url = "http://127.0.0.1:3000/api/kubios/user-data"; // Määritellään API:n URL
  let tokeni = localStorage.getItem("token"); // Haetaan token selaimen muistista

  // Määritellään HTTP-pyynnön asetukset
  const options = {
    method: "GET", // HTTP-pyynnön tyyppi
    headers: {
      Authorization: "Bearer: " + tokeni, // Lisätään token otsikkoon
    },
  };

  // Kutsutaan fetchData-funktiota ja käsitellään palautettu data
  fetchData(url, options).then((data) => {
    createTable(data); // Luodaan taulukko saadusta datasta
    console.log(data); // Tulostetaan data konsoliin
  });
}

// Funktio, joka luo taulukon saadusta datasta
function createTable(data) {
  const tbody = document.querySelector(".tbody");
  tbody.innerHTML = ""; // Tyhjennetään taulukko

  // Käydään läpi viimeiset 10 tulosta ja luodaan niistä taulukon rivejä
  data.results.slice(-10).forEach((rivi) => {
    const tr = document.createElement("tr"); // Luodaan rivi

    // Luodaan ja täytetään solut datalla
    const td1 = document.createElement("td");
    td1.innerText = rivi.daily_result;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = rivi.result.artefact_level;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerText = parseFloat(rivi.result.stress_index).toFixed(1); // Pyöristetään stressi-indeksi yhteen desimaaliin
    tr.appendChild(td3);

    const td4 = document.createElement("td");

    // Luodaan nappula ja lisätään tapahtumankuuntelija, joka avaa dialogin
    const noteButton = document.createElement("button");
    noteButton.className = "check";
    noteButton.innerText = "Avaa";
    noteButton.addEventListener("click", function () {
      const notes = rivi.user_comment;
      openDialog(notes); // Avataan dialogi näyttämään muistiinpano
    });

    td4.appendChild(noteButton);
    tr.appendChild(td4);

    tbody.appendChild(tr); // Lisätään rivi taulukkoon
  });
}

// Funktio, joka avaa dialogin näyttämään muistiinpanon
function openDialog(notes) {
  const dialog = document.getElementById("notesDialog");
  const header = document.getElementById("header");
  const dialogText = document.getElementById("dialogText");
  header.innerHTML = "";

  const notesHeader = document.createElement("h4");
  notesHeader.textContent = "Muistiinpano: ";
  dialogText.innerText = notes;

  header.appendChild(notesHeader);
  dialog.showModal(); // Avataan dialogi
}

// Lisätään tapahtumankuuntelija sulje-napille, joka sulkee dialogin
document.getElementById("closeNotes").addEventListener("click", function () {
  document.getElementById("notesDialog").close();
});

// Lisätään tapahtumankuuntelija uloskirjautumisnapille, joka suorittaa uloskirjautumisen
document.getElementById("logout").addEventListener("click", logOut);

// Funktio uloskirjautumiseen
function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token"); // Poistetaan token selaimen muistista
  console.log("Kirjaudutaan ulos");
  window.location.href = "kirjautuminen.html"; // Ohjataan käyttäjä kirjautumissivulle
}
