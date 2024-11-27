// Helper function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get the JSON file name from the URL parameter
const jsonFile = getQueryParam('yosintv') || 'default.json'; // Fallback to 'default.json' if no parameter provided

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

      // Add click functionality to open the event link
      eventDiv.addEventListener('click', () => {
        window.open(event.link, '_blank');
      });

      container.appendChild(eventDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });
