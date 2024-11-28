// Helper function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get the JSON file name from the URL parameter and append `.json` if needed
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
  });
