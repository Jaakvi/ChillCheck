import Chart from "chart.js/auto";

document.addEventListener("DOMContentLoaded", () => {
  const getResultButton = document.getElementById("get_result");
  const loadingOverlay = document.getElementById("loading-overlay");
  const loadingDialog = document.getElementById("loading-dialog");

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
        Authorization: "Bearer " + token, // Removed the colon after Bearer
      }, // body data type must match "Content-Type" header
    };

    // Simulate loading for 5 seconds
    setTimeout(() => {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Hide loading screen
          loadingOverlay.style.display = "none";
          loadingDialog.style.display = "none";

          // Display the JSON data in console
          data.results.slice(-3).forEach((rivi) => {
            const result = rivi.result;

            const chartData = {
              labels: ["Stress Index"],
              datasets: [
                {
                  label: "Values",
                  data: [result.stress_index],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            };
            console.log(chartData);

            const config = {
              type: "bar",
              data: chartData,
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
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
                    text: "Kubios",
                  },
                },
                interaction: {
                  mode: "index",
                },
              },
            };
            const myChart = new Chart(
              document.getElementById("myChart"),
              config
            );
          });
        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
          clearLoadingDialog(); // Clear loading dialog
          console.clear(); // Clear console
          loadingDialog.innerHTML = `<p>Error fetching data: ${error}</p>`;

          // Hide loading screen after 5 seconds
          setTimeout(() => {
            loadingOverlay.style.display = "none";
            loadingDialog.style.display = "none";
          }, 2000);
        });
    }, 2000); // Simulate loading for 5 seconds
  }

  // Event listener for Get Result button
  getResultButton.addEventListener("click", () => {
    // Call the function to fetch and show data
    fetchData();
  });
});
function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token");
  console.log("Kirjaudutaan ulos");
  window.location.href = "kirjautuminen.html";
}
