import { fetchData } from "./fetch.js";

// Suoritetaan toimet, kun dokumentti on latautunut
document.addEventListener("DOMContentLoaded", function () {
  // Avataan rekisteröitymisdialogi, kun "Rekisteröidy tästä" -linkkiä klikataan
  document
    .querySelector(".register__login a")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Estetään linkin oletuskäyttäytyminen
      document.getElementById("information_dialog").showModal(); // Avataan rekisteröitymisdialogi
    });

  // Käsitellään sisäänkirjautumisnapin klikkausta
  const loginUser = document.querySelector(".button__login");
  loginUser.addEventListener("click", async (evt) => {
    evt.preventDefault();
    console.log("Nyt logataan sisään");

    // Määritellään sisäänkirjautumisen URL
    const url = `http://127.0.0.1:3000/api/auth/login`;

    // Haetaan lomakkeen tiedot
    const form = document.querySelector(".login__form");
    const body = {
      username: form.querySelector("input[name=username]").value, // Haetaan käyttäjänimi
      password: form.querySelector("input[name=password]").value, // Haetaan salasana
    };

    // Määritellään HTTP-pyynnön asetukset
    const options = {
      method: "POST", // HTTP-pyynnön tyyppi
      headers: {
        "Content-Type": "application/json", // Määritellään sisällön tyyppi
      },
      body: JSON.stringify(body), // Muutetaan lähetettävä data JSON-muotoon
    };

    // Kutsutaan fetchData-funktiota ja käsitellään palautettu data
    fetchData(url, options).then((data) => {
      console.log(data); // Tulostetaan data konsoliin
      console.log(data.token); // Tulostetaan token konsoliin
      localStorage.setItem("token", data.token); // Tallennetaan token selaimen muistiin
      // Käsitellään vastaus, jos tokenia ei ole määritelty
      if (data.token === undefined) {
        alert("Unauth user: Käyttäjänimi tai salasana ei ole oikein");
      } else {
        alert("Kirjautuminen onnistui."); // Ilmoitetaan käyttäjälle onnistuneesta kirjautumisesta
        window.location.href = "kotisivu.html"; // Ohjataan käyttäjä kotisivulle
      }
      logResponse(
        "loginResponse",
        `localStorage set with token value: ${data.token}`
      ); // Kirjataan vastaus
    });
  });
});
