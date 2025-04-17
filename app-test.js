// Helper: Get query param from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get file name from ?yosintv=
const fileParam = getQueryParam('yosintv');
const jsonFile = fileParam ? `${fileParam}.json` : 'default.json';

// Fetch the JSON and render links
fetch(jsonFile)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const container = document.getElementById('live-container');

    data.events.forEach(event => {
      event.links.forEach((link, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'livee';
        eventDiv.style.cssText = data.styles.livee;

        eventDiv.innerHTML = `
          <div class="livee-name" style="${data.styles.liveeName}">
            Link ${index + 1} - ${event.name}
          </div>
        `;

        eventDiv.addEventListener('click', () => {
          window.location.href = link;
        });

        container.appendChild(eventDiv);
      });
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
