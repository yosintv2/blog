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
    container.innerHTML = ''; // Clear previous content if any

    data.events.forEach(event => {
      // If event has a single link
      if (event.link) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'livee';
        eventDiv.style.cssText = data.styles.livee;
        eventDiv.innerHTML = `
          <div class="livee-name" style="${data.styles.liveeName}">
            ${event.name}
          </div>
        `;
        eventDiv.addEventListener('click', () => {
          window.location.href = event.link;
        });
        container.appendChild(eventDiv);

      } else if (event.links && Array.isArray(event.links)) {
        // Event with multiple links (each can be a string URL or an object with title, url, note)
        
        // Create a container for this event's multiple links
        const eventTitleDiv = document.createElement('div');
        eventTitleDiv.style.cssText = 'font-weight: bold; margin-top: 20px; color: white; font-family: Arial;';
        eventTitleDiv.textContent = event.name;
        container.appendChild(eventTitleDiv);

        event.links.forEach(linkItem => {
          // linkItem can be either a string or an object {title, url, note}
          let title, url, note;

          if (typeof linkItem === 'string') {
            url = linkItem.trim();
            title = url;
            note = '';
          } else if (typeof linkItem === 'object') {
            title = linkItem.title || '';
            url = linkItem.url || '';
            note = linkItem.note || '';
          }

          // Build the link div
          const linkDiv = document.createElement('div');
          linkDiv.className = 'livee';
          linkDiv.style.cssText = data.styles.livee;

          // Make entire div clickable
          linkDiv.addEventListener('click', () => {
            window.open(url, '_blank'); // open in new tab
          });

          // Add inner HTML with title and note
          linkDiv.innerHTML = `
            <div class="livee-name" style="${data.styles.liveeName}">
              ${title}
            </div>
            <div style="font-size: 14px; color: #ffa400; font-family: Arial; margin-top: 4px;">
              ${note}
            </div>
          `;

          container.appendChild(linkDiv);
        });
      }
    });
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);

    const container = document.getElementById('live-container');
    container.innerHTML = '<div class="error-message" style="color: red; font-weight: bold; text-align: center;">Please Check Later, Match Not Started!</div>';
  });
