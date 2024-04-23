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
  function fetchData() {
    // Show dark overlay
    loadingOverlay.style.display = "block";
    loadingDialog.style.display = "block";

    // Reset console
    resetConsole();

    // Simulate loading for 5 seconds
    setTimeout(() => {
      fetch("testi_tulokset.json")
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
          const columns = ["column1", "column2", "column3"];
          columns.forEach((column) => {
            const columnData = data[column];
            const values = Object.values(columnData);
            const joinedValues = values.join(", ");
            console.log(`${column}: ${joinedValues}`); // Log the values
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
          }, 5000);
        });
    }, 5000); // Simulate loading for 5 seconds
  }

  // Event listener for Get Result button
  getResultButton.addEventListener("click", () => {
    // Call the function to fetch and show data
    fetchData();
  });
});
