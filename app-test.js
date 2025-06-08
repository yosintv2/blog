<script>
  fetch('data.json')
    .then(response => response.json())
    .then(dataArr => {
      const data = dataArr[0]; // Your JSON is an array, get first object
      const container = document.getElementById('live-container');

      data.events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.style.cssText = data.styles.livee;
        eventDiv.className = 'livee';

        // Create clickable area to go to event.link
        eventDiv.addEventListener('click', () => {
          window.location.href = event.link;
        });

        // Inner HTML with name and note
        eventDiv.innerHTML = `
          <div style="${data.styles.liveeName}">${event.name}</div>
          <div style="${data.styles.liveeNote}">${event.note || ''}</div>
        `;

        // Optional hover effect
        eventDiv.addEventListener('mouseenter', () => {
          eventDiv.style.boxShadow = data.styles.liveeHover;
        });
        eventDiv.addEventListener('mouseleave', () => {
          eventDiv.style.boxShadow = 'none';
        });

        container.appendChild(eventDiv);
      });
    })
    .catch(err => {
      document.getElementById('live-container').innerText = "Please Check Later, Match Not Started!";
      console.error(err);
    });
</script>
