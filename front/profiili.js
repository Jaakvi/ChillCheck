import { fetchData } from "./fetch.js";

// Lisätään toimenpiteet, kun DOM-sisältö on ladattu
document.addEventListener("DOMContentLoaded", () => {
  // Kutsutaan getProfile-funktiota, kun DOM-sisältö on ladattu
  getProfile();
});

// Funktio, joka hakee käyttäjäprofiilin tiedot
async function getProfile() {
  console.log("Haetaan profiilitiedot");

  // Määritellään profiilitietojen hakupyyntöjen URL
  const url = "http://127.0.0.1:3000/api/kubios/user-info";
  let tokeni = localStorage.getItem("token"); // Haetaan token selaimen muistista

  // Määritellään HTTP-pyynnön asetukset
  const options = {
    method: "GET", // HTTP-pyynnön tyyppi
    headers: {
      Authorization: "Bearer " + tokeni, // Lisätään token otsikkoon
    },
  };

  // Tyhjennetään edellinen data konsolista
  console.clear();

  // Kutsutaan fetchData-funktiota ja käsitellään palautettu data
  fetchData(url, options).then((data) => {
    // Päivitetään DOM näyttämään profiilitiedot
    console.log(data.user); // Tulostetaan käyttäjän tiedot konsoliin
    const etunimiValue = data.user.given_name;
    const sukunimiValue = data.user.family_name;
    const sahkopostiValue = data.user.email;
    const pituusValue = data.user.height;
    const painoValue = data.user.weight;

    // Asetetaan arvot vastaaviin elementteihin
    document.querySelector(".firstname--input").value = etunimiValue;
    document.querySelector(".lastname--input").value = sukunimiValue;
    document.querySelector(".email--input").value = sahkopostiValue;
    document.querySelector(".dialog--input[name='length']").value = pituusValue;
    document.querySelector(".dialog--input[name='weight']").value = painoValue;
  });
}
