document.addEventListener('DOMContentLoaded', () => {
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function renderLiveTracker(matchId) {
    const liveTrackerDiv = document.getElementById('live-tracker');
    if (!liveTrackerDiv) {
      console.error('Error: <div id="live-tracker"> not found in the DOM');
      return;
    }
    console.log(`Rendering live tracker with matchId: ${matchId}`);
    liveTrackerDiv.innerHTML = ''; // Clear previous content
    const iframe = document.createElement('iframe');
    iframe.src = `https://widgets-livetracker.nami.com/en/football?profile=g9rzlugz3uxie81&trend=0&id=${matchId}`;
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.onerror = () => console.error('Error: Failed to load iframe content');
    liveTrackerDiv.appendChild(iframe);
  }

  // Initialize live tracker only if id is provided in URL
  const matchId = getQueryParam('id');
  if (matchId) {
    console.log(`Initial matchId from URL: ${matchId}`);
    renderLiveTracker(matchId);
  } else {
    console.log('No matchId provided in URL, skipping live tracker rendering');
  }

  const fileParam = getQueryParam('yosintv');
  const jsonFile = fileParam ? `https://yosintv11.pages.dev/${fileParam}.json` : 'https://yosintv11.pages.dev/default.json';

  fetch(jsonFile)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const container = document.getElementById('live-container');
      if (!container) {
        console.error('Error: <div id="live-container"> not found in the DOM');
        return;
      }

      data.events.forEach(event => {
        // For single link events
        if (event.link) {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'livee';
          eventDiv.style.cssText = data.styles.livee;

          // Use flex container with name and optional note
          eventDiv.innerHTML = `
            <div class="livee-name" style="${data.styles.liveeName}">${event.name}</div>
            <div class="livee-note" style="${data.styles.liveeNote || ''}">${event.note || ''}</div>
          `;

          eventDiv.addEventListener('click', () => {
            window.location.href = event.link;
          });
          container.appendChild(eventDiv);
        }

        // For multiple links events
        if (event.links) {
          event.links.forEach((link, index) => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'livee';
            eventDiv.style.cssText = data.styles.livee;

            eventDiv.innerHTML = `
              <div class="livee-name" style="${data.styles.liveeName}">Link ${index + 1} - ${event.name}</div>
              <div class="livee-note" style="${data.styles.liveeNote || ''}">${event.note || ''}</div>
            `;

            eventDiv.addEventListener('click', () => {
              window.location.href = link;
            });
            container.appendChild(eventDiv);
          });
        }
      });
    })
    .catch(err => {
      console.error('Error fetching JSON:', err);
      const container = document.getElementById('live-container');
      if (container) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = "Please Check Later, Match Not Started!";
        container.appendChild(errorDiv);
      } else {
        console.error('Error: <div id="live-container"> not found for error message');
      }
    });
});
