import { fetchData } from "./fetch.js";

// Add an event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Call getProfile function when the DOM content is loaded
  getProfile();
});

async function getProfile() {
  console.log("Haetaan profiilitiedot");

  const url = "http://127.0.0.1:3000/api/kubios/user-info";
  let tokeni = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokeni,
    },
  };

  // Clear previous data in console
  console.clear();

  fetchData(url, options).then((data) => {
    // Update the DOM to display profile information
    console.log(data.user);
    const etunimiValue = data.user.given_name;
    const sukunimiValue = data.user.family_name;
    const sahkopostiValue = data.user.email;
    const pituusValue = data.user.height;
    const painoValue = data.user.weight;

    // Set values into respective elements
    document.querySelector(".firstname--input").value = etunimiValue;
    document.querySelector(".lastname--input").value = sukunimiValue;
    document.querySelector(".email--input").value = sahkopostiValue;
    document.querySelector(".dialog--input[name='length']").value = pituusValue;
    document.querySelector(".dialog--input[name='weight']").value = painoValue;
  });
}
