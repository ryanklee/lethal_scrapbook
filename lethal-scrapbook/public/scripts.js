document.addEventListener('DOMContentLoaded', function () {
  fetch('/runs?page=1&limit=1') // Fetch only the last update
row
      .then(response => response.json())
      .then(data => {
          if (data.length > 0) {
              const latestData = data[0];
              const latestDataDiv =
document.getElementById('latestData');
              latestDataDiv.textContent = `Game ID:
${latestData.GameID}, Moon ID: ${latestData.MoonID}, Day:
${latestData.Day}, Scrap Collected:
${latestData.ScrapCollected}`;
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
});