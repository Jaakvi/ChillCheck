import Chart from "chart.js/auto";

document.addEventListener("DOMContentLoaded", () => {
  const getResultButton = document.getElementById("get_result");
  const loadingOverlay = document.getElementById("loading-overlay");
  const loadingDialog = document.getElementById("loading-dialog");
  const chartContainer = document.getElementById("chart-container");

  // Piilota chart-container
  chartContainer.style.display = 'none';
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

          // Extract stress index values from the three most recent data points
          const recentResults = data.results.slice(-3).map((item) => item.result.stress_index);

          // Get canvas element
          const canvas = document.getElementById("myChart");

// Create combined chart
if (canvas) {
  const ctx = canvas.getContext("2d");
  const chartData = {
    labels: ["Stress Index 1", "Stress Index 2", "Stress Index 3"],
    datasets: recentResults.map((stressIndex, index) => ({
      label: `Stress Index ${index + 1}`,
      data: [index === 0 ? stressIndex : null, index === 1 ? stressIndex : null, index === 2 ? stressIndex : null],
      backgroundColor: index === 0 ? "rgba(255, 99, 132, 0.2)" : index === 1 ? "rgba(54, 162, 235, 0.2)" : "rgba(255, 153, 51, 0.2)",
      borderColor: index === 0 ? "rgba(255, 99, 132, 1)" : index === 1 ? "rgba(54, 162, 235, 1)" : "rgba(255, 153, 51, 1)",
      borderWidth: 1,
    })),
  };
  
  
  

  

  const config = {
    type: "bar",
    data: chartData,
    options: {
      maintainAspectRatio: false, // Disable aspect ratio to fill the container
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
          text: "Kubios Stress Index",
        },
        tooltip: {
          mode: "index",
          callbacks: {
            label: function (context) {
              const datasetLabel = context.dataset.label || '';
              const value = context.parsed.y;
              // Check if the value is not null before displaying it
              if (value !== null) {
                return `${datasetLabel}: ${value}`;
              } else {
                return ''; // Return an empty string for null values
              }
            }
          }
        }
      },
      interaction: {
        mode: "index",
      },
    },
  };
  
  
  
  new Chart(ctx, config);
} else {
  console.error("Canvas element not found.");
}


        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
          clearLoadingDialog();
          console.clear();
          loadingDialog.innerHTML = `<p>Error fetching data: ${error}</p>`;
          setTimeout(() => {
            loadingOverlay.style.display = "none";
            loadingDialog.style.display = "none";
          }, 2000);
        });
    }, 2000); // Simulate loading for 5 seconds
  }

  // Event listener for Get Result button
  getResultButton.addEventListener("click", () => {
    
     // Näytä chart-container nappulaa painaessa
     chartContainer.style.display = 'block';
    fetchData();
  });
});

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token");
  console.log("Kirjaudutaan ulos");
  window.location.href = "kirjautuminen.html";
}
