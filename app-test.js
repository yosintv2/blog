event.links.forEach((link, index) => {
  const eventDiv = document.createElement('div');
  eventDiv.className = 'livee';
  eventDiv.style.cssText = data.styles.livee; // Apply styles from JSON

  eventDiv.innerHTML = `
    <div class="livee-name" style="${data.styles.liveeName}">
      Link ${index + 1} - ${event.name}
    </div>
  `;

  // Create a clickable link
  const a = document.createElement('a');
  a.href = link;
  a.target = '_blank';  // Open in new tab
  a.style.textDecoration = 'none';
  a.style.color = 'inherit';

  // Add click functionality for opening in a new tab with CTRL + Click
  a.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(link, '_blank'); // Ensure new tab opens with CTRL or CMD + Click
    } else {
      window.location.href = link; // Normal behavior
    }
  });

  // Append the anchor tag to the eventDiv
  eventDiv.appendChild(a);
  container.appendChild(eventDiv);
});
