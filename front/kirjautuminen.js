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
          console.log(data);
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
