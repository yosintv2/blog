function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const fileParam = getQueryParam('yosintv');
const jsonFile = fileParam ? `${fileParam}.json` : 'default.json';

fetch(jsonFile)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const container = document.getElementById('live-container');

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
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = "Please Check Later, Match Not Started!";
    container.appendChild(errorDiv);
  });
