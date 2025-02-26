// Helper function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get the JSON file name from the URL parameter and append `.json` if needed
const fileParam = getQueryParam('yosintv');
const jsonFile = fileParam ? `${fileParam}.json` : 'default.json'; // Default to 'default.json' if no parameter provided

const container = document.getElementById('live-container');

// Show countdown message function
const countdownDiv = document.createElement('div');
countdownDiv.className = 'error-message'; // Apply same style as the error message
countdownDiv.innerHTML = "Live Links Loading in 6 sec...";
container.appendChild(countdownDiv);

// Countdown function starts from here 
let countdown = 6;
const countdownInterval = setInterval(() => {
  countdown--;
  countdownDiv.innerHTML = `Live Links Loading in ${countdown} sec...`;
  
  if (countdown === 0) {
    clearInterval(countdownInterval);
    loadLiveLinks(); // Call the function to fetch and display links
  }
}, 1000);

// Function to fetch JSON and display events
function loadLiveLinks() {
  fetch(jsonFile)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      container.innerHTML = ''; // Clear countdown message

      // Loop through each event and create a link
      data.events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'livee';
        eventDiv.style.cssText = data.styles.livee; // Apply styles from JSON
        eventDiv.innerHTML = `
          <div class="livee-name" style="${data.styles.liveeName}">
            ${event.name}
          </div>
        `;

        // Add click functionality to navigate to the event link in the same tab
        eventDiv.addEventListener('click', () => {
          window.location.href = event.link; // Redirect to the link in the same tab
        });

        container.appendChild(eventDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);

      // Display the fallback message if there's an error
      container.innerHTML = ''; // Clear countdown message
      const errorMessageDiv = document.createElement('div');
      errorMessageDiv.className = 'error-message';
      errorMessageDiv.innerHTML = "Please Check Later, Match Not Started!";
      container.appendChild(errorMessageDiv);
    });
}
