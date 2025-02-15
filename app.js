// Helper function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get the JSON file name from the 'yosintv' parameter
const fileParam = getQueryParam('yosintv');
const jsonFile = fileParam ? `${fileParam}.json` : 'default.json'; // Default to 'default.json' if no parameter provided

// Fetch the JSON file and render events
fetch(jsonFile)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('live-container');

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
    const container = document.getElementById('live-container');
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.className = 'error-message';
    errorMessageDiv.innerHTML = "Please Check Later, Match Not Started!";
    container.appendChild(errorMessageDiv);
  });

// Update the "No Lag - TeamName" inside the live-container dynamically
const teamNameElement = document.createElement('div');
teamNameElement.className = 'team-name'; // Optional: Add class for styling

const teamName = fileParam ? fileParam.replace(/-/g, ' ') : 'TeamName'; // Replace hyphens with spaces if needed
teamNameElement.innerText = `${teamName}`;

// Append it to the live-container
const container = document.getElementById('live-container');
container.insertBefore(teamNameElement, container.firstChild); // Insert at the top of the container
