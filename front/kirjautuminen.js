import { fetchData } from "./fetch";

document.addEventListener("DOMContentLoaded", function () {
  // JavaScript code
  // Open register dialog when "Rekisteröidy tästä" is clicked
  document
    .querySelector(".register__login a")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      document.getElementById("register_dialog").showModal(); // Show register dialog
    });
  const loginUser = document.querySelector(".button__login");

  loginUser.addEventListener("click", async (evt) => {
    evt.preventDefault();
    console.log("Nyt logataan sisään");

    // # Login
    // POST http://localhost:3000/api/auth/login
    // content-type: application/json

    // {
    //   "username": "user",
    //   "password": "secret"
    //  }

    const url = `http://127.0.0.1:3000/api/auth/login`;

    const form = document.querySelector(".login__form");

    const body = {
      username: form.querySelector("input[name=username]").value,
      password: form.querySelector("input[name=password]").value,
    };

    const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    };

    fetchData(url, options).then((data) => {
      // käsitellään fetchData funktiosta tullut JSON
      console.log(data);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      // kannattaa fetch.js palauttaa BE puolen validointi virheen joka käsitellään
      if (data.token === undefined) {
        alert("Unauth user: Käyttäjänimi tai salasana ei oikein");
      } else {
        alert("Kirjautuminen onnistui.");
        window.location.href = "kotisivu.html";
      }
      logResponse(
        "loginResponse",
        `localStorage set with token value: ${data.token}`
      );
    });
  });
  // Handle form submission in the register dialog
  document
    .querySelector("#register_dialog form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission behavior
      const selectValue = document.getElementById("professional").value; // Get selected value from dropdown
      if (selectValue === "Ammattilainen" || selectValue === "Opiskelija") {
        // If a valid option is selected, redirect to the register page
        localStorage.setItem("selectedOption", selectValue);
        window.location.href = "rekisteröinti.html";
      } else {
        alert("Valitse vaihtoehto!"); // Alert user to select an option if none is selected
      }
    });
});
