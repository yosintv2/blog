document.addEventListener('DOMContentLoaded', () => {

  // --- Helper: Get URL query parameters ---
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // --- Render Live Tracker iframe ---
  function renderLiveTracker(matchId) {
    const liveTrackerDiv = document.getElementById('live-tracker');
    if (!liveTrackerDiv) {
      console.error('Error: <div id="live-tracker"> not found in the DOM');
      return;
    }
    console.log(`Rendering live tracker with matchId: ${matchId}`);
    liveTrackerDiv.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://widgets-livetracker.nami.com/en/football?profile=g9rzlugz3uxie81&trend=0&id=${matchId}`;
    iframe.style.width = '100%';
    iframe.style.height = '300px';
    iframe.style.border = 'none';
    iframe.onerror = () => console.error('Error: Failed to load iframe content');
    liveTrackerDiv.appendChild(iframe);
  }

  // --- Initialize Live Tracker if matchId exists ---
  const matchId = getQueryParam('id');
  if (matchId) renderLiveTracker(matchId);

  // --- Determine JSON file ---
  const fileParam = getQueryParam('yosintv');
  const jsonFile = fileParam ? `https://blog.cricfoot.net/${fileParam}.json` : 'https://blog.cricfoot.net/default.json';

  // --- Fetch JSON ---
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

      // --- Render each event ---
      data.events.forEach(event => {
        // Single link
        if (event.link) {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'livee';
          eventDiv.style.cssText = data.styles.livee;
          eventDiv.innerHTML = `<div class="livee-name" style="${data.styles.liveeName}">${event.name}</div>`;
          eventDiv.addEventListener('click', () => window.open(event.link, '_blank'));
          eventDiv.addEventListener('mouseover', () => eventDiv.style.cssText += data.styles.liveeHover);
          eventDiv.addEventListener('mouseout', () => eventDiv.style.cssText = data.styles.livee);
          container.appendChild(eventDiv);
        }

        // Multiple links
        if (event.links) {
          event.links.forEach((link, index) => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'livee';
            eventDiv.style.cssText = data.styles.livee;
            eventDiv.innerHTML = `<div class="livee-name" style="${data.styles.liveeName}">${event.name} - Link ${index + 1}</div>`;
            eventDiv.addEventListener('click', () => window.open(link, '_blank'));
            eventDiv.addEventListener('mouseover', () => eventDiv.style.cssText += data.styles.liveeHover);
            eventDiv.addEventListener('mouseout', () => eventDiv.style.cssText = data.styles.livee);
            container.appendChild(eventDiv);
          });
        }

        // Optional: Countdown for events with "start"
        if (event.start) {
          const countdownId = `countdown-${Math.random().toString(36).substring(2, 9)}`;
          const countdownDiv = document.createElement('div');
          countdownDiv.id = countdownId;
          countdownDiv.style.cssText = "margin-top:5px;color:white;text-align:center;";
          container.appendChild(countdownDiv);

          function startCountdown(startTime, elementId) {
            function updateCountdown() {
              const now = new Date();
              const start = new Date(startTime);
              const diff = start - now;

              if (diff <= 0) {
                document.getElementById(elementId).textContent = 'Live Now';
                clearInterval(timer);
                return;
              }

              const hours = Math.floor(diff / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);

              document.getElementById(elementId).textContent = `Starts in: ${hours}h ${minutes}m ${seconds}s`;
            }

            updateCountdown();
            const timer = setInterval(updateCountdown, 1000);
          }

          startCountdown(event.start, countdownId);
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
      }
    });

  // --- Fetch and Render Commentary ---
  const urlParams = new URLSearchParams(window.location.search);
  const matchIdCommentary = urlParams.get('id') || '105786';
  const apiUrl = `https://corsproxy.io/?url=https://www.cricbuzz.com/api/cricket-match/commentary/${matchId}`;

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const commentaryContainer = document.getElementById('commentary-container');
      if (!commentaryContainer) {
        console.error('Error: <div id="commentary-container"> not found in the DOM');
        return;
      }
      commentaryContainer.innerHTML = '';

      // Assuming data.commentary is an array of commentary entries
      (data.commentary || []).forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'commentary';
        commentDiv.style.cssText = 'margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; color: #333;';
        commentDiv.innerHTML = `<div class="comment-text">${comment.text || 'No commentary text available'}</div>`;
        commentaryContainer.appendChild(commentDiv);
      });
    })
    .catch(err => {
      console.error('Error fetching commentary:', err);
      const commentaryContainer = document.getElementById('commentary-container');
      if (commentaryContainer) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Unable to load commentary. Please try again later.';
        commentaryContainer.appendChild(errorDiv);
      }
    });
});
