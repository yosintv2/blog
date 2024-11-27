// Fetch the JSON file and render events
fetch('data.json')
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
