import { fetchData } from "./fetch.js";

const allButton = document.querySelector(".get_users");
allButton.addEventListener("click", getEntries);

async function getEntries() {
  console.log("Haetaan kaikki entriet");

  const url = "http://127.0.0.1:3000/api/kubios/user-data";
  let tokeni = localStorage.getItem("token");

  const options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer: " + tokeni,
    },
  };
  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    // console.log(data.results);
    createTable(data);
    // document.getElementById("name").innerHTML = data.user.username;
  });
}

function createTable(data) {
  const tbody = document.querySelector(".tbody");
  tbody.innerHTML = "";

  data.results.slice(-10).forEach((rivi) => {
    // console.log(rivi.daily_result);
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerText = rivi.daily_result;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = rivi.result.artefact_level;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    // Käytä toFixed() saadaksesi stressi-indeksin yhden desimaalin tarkkuudella
    td3.innerText = parseFloat(rivi.result.stress_index).toFixed(1);
    tr.appendChild(td3);

    const td4 = document.createElement("td");

    //   const noteButton = document.createElement("button");
    //   noteButton.className = "check";
    //   noteButton.innerText = "Notes";

    //   noteButton.addEventListener("click", function () {
    //     const notes = rivi.notes;
    //     openDialog(notes);
    //   });

    //   td4.appendChild(noteButton);
    tr.appendChild(td4);

    //   const td5 = document.createElement("td");
    //   const deleteButton = document.createElement("button");
    //   deleteButton.className = "del";
    //   deleteButton.dataset.id = rivi.entry_id;
    //   deleteButton.textContent = "Delete";
    //   td5.appendChild(deleteButton);
    //   deleteButton.addEventListener("click", deleteUser);

    // const td6 = document.createElement("td");
    // td6.innerText = rivi.;

    // tr.appendChild(td5);
    // tr.appendChild(td6);

    tbody.appendChild(tr);
  });
}
// logout nappula
document.getElementById("logout").addEventListener("click", logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token");
  console.log("Kirjaudutaan ulos");
  window.location.href = "kirjautuminen.html";
}
