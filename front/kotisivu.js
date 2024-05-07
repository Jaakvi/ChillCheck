import Chart from "chart.js/auto";

document.addEventListener("DOMContentLoaded", () => {
  const getResultButton = document.getElementById("get_result");
  const loadingOverlay = document.getElementById("loading-overlay");
  const loadingDialog = document.getElementById("loading-dialog");
  const chartContainer = document.getElementById("chart-container");

  // Piilota chart-container
  chartContainer.style.display = "none";
  // Function to reset the console
  function resetConsole() {
    console.clear(); // Clear console
  }

  // Function to clear the loading dialog
  function clearLoadingDialog() {
    loadingDialog.innerHTML = ""; // Clear loading dialog content
  }

  // Function to fetch JSON data
  async function fetchData() {
    // Show dark overlay
    const url = `http://127.0.0.1:3000/api/kubios/user-data`;
    const token = localStorage.getItem("token");

    loadingOverlay.style.display = "block";
    loadingDialog.style.display = "block";

    // Reset console
    resetConsole();

    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    // Simuloi latausta 5 sekunnin ajan
    setTimeout(() => {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Verkkovastaus ei ollut kunnossa");
          }
          return response.json();
        })
        .then((data) => {
          // Piilota latausnäyttö
          loadingOverlay.style.display = "none";
          loadingDialog.style.display = "none";

          // Eksraktoidaan kolmen viimeisimmän tuloksen stressi-indeksiarvot
          const recentResults = data.results
            .slice(-3)
            .map((item) => item.result.stress_index);

          // Laske keskiarvo stressi-indeksistä
          const averageStressIndex =
            recentResults.reduce((sum, value) => sum + value, 0) /
            recentResults.length;

          // Haetaan päivämäärät testien päivämääräksi
          const testDates = data.results
            .slice(-3)
            .map((item) =>
              new Date(item.create_timestamp).toLocaleDateString()
            );

          // Hae canvas-elementti
          const canvas = document.getElementById("myChart");

          // Luo yhdistetty kaavio
          if (canvas) {
            const ctx = canvas.getContext("2d");
            const chartData = {
              labels: testDates, // Käytä testien päivämääriä labels-taulukossa
              datasets: [
                {
                  label: "Stressi Indeksi",
                  data: recentResults,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 153, 51, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 153, 51, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            };

            // Laske keskiarvoviivan paikat
            const averageLinePositions = [
              averageStressIndex,
              averageStressIndex,
              averageStressIndex,
            ];

            // Lisää keskiarvoviiva kaaviodataan
            chartData.datasets.push({
              type: "line",
              label: "Kolmen testin keskiarvo",
              data: averageLinePositions,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              yAxisID: "y",
            });

            const config = {
              type: "bar",
              data: chartData,
              options: {
                maintainAspectRatio: false, // Poista kuvasuhteen rajoitus täyttääksesi kontin
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value, index, values) {
                        return value.toFixed(2); // Muotoile arvot kahden desimaalin tarkkuudella
                      },
                    },
                  },
                  x: {
                    display: true,
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                  },
                  title: {
                    display: true,
                    text: "Kubios Stressi Indeksi",
                  },
                  tooltip: {
                    mode: "index",
                    callbacks: {
                      label: function (context) {
                        const datasetLabel = context.dataset.label || "";
                        const value = context.parsed.y;
                        // Tarkista, ettei arvo ole null ennen kuin näytetään se
                        if (!isNaN(value)) {
                          return `${datasetLabel}: ${value.toFixed(2)}`; // Muotoile arvo kahden desimaalin tarkkuudella
                        } else {
                          return ""; // Palauta tyhjä merkkijono, jos arvo on null
                        }
                      },
                    },
                  },
                },
                interaction: {
                  mode: "index",
                },
              },
            };

            new Chart(ctx, config);

            // Haetaan viestilaatikko ja stressi-indeksi
            const messageBox = document.getElementById("stress-message");

            // Generoidaan viesti ja asetetaan se viestilaatikkoon
            const message = generateStressMessage(averageStressIndex);
            messageBox.textContent = message;
          } else {
            console.error("Canvas-elementtiä ei löytynyt.");
          }
        })
        .catch((error) => {
          console.error(`Virhe datan hakemisessa: ${error}`);
          clearLoadingDialog();
          console.clear();
          loadingDialog.innerHTML = `<p>Virhe datan hakemisessa: ${error}</p>`;
          setTimeout(() => {
            loadingOverlay.style.display = "none";
            loadingDialog.style.display = "none";
          }, 2000);
        });
    }, 2000); // Simuloi latausta 5 sekunnin ajan
  }

  // Event listener for Get Result button
  getResultButton.addEventListener("click", () => {
    // Näytä chart-container nappulaa painaessa
    chartContainer.style.display = "block";
    fetchData();
  });
});

// Funktio stressiviestin generoimiseen
function generateStressMessage(averageStressIndex) {
  let message = "";
  if (averageStressIndex < 10) {
    message = "Stressi-indeksi on alle 10, olet hyvällä mallilla!";
  } else if (averageStressIndex >= 10 && averageStressIndex <= 20) {
    message = "Stressi-indeksi on koholla, ota hieman rennommin.";
  } else {
    message =
      "Stressi-indeksi on yli 20, sinun kannattaa ottaa välittömästi itsellesi aikaa ja harkita rentoutumista.";
  }
  return message;
}

// Haetaan viestilaatikko ja stressi-indeksi
const messageBox = document.getElementById("stress-message");
const stressIndex = averageStressIndex; // Oletan, että averageStressIndex on jo määritelty muualla

// Generoidaan viesti ja asetetaan se viestilaatikkoon
const message = generateStressMessage(stressIndex);
messageBox.textContent = message;

async function showUserName() {
  console.log("Täällä ollaan!");
  const url = "http://127.0.0.1:3000/api/kubios/user-info";
  let tokeni = localStorage.getItem("token");

  const options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer: " + tokeni,
    },
  };
  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    document.getElementById("nimi").innerHTML =
      ", " + data.user.given_name + "!";
  });
}

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token");
  console.log("Kirjaudutaan ulos");
  window.location.href = "kirjautuminen.html";
}

showUserName();
