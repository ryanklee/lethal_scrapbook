document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('run-form');
  const runsTable = document.getElementById('runs-table');
  const pagination = document.getElementById('pagination');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
      gameId: form.gameId.value,
      moonId: form.moonId.value,
      date: form.date.value,
      scrapCollected: form.scrapCollected.value,
      quotaAtTimeOfRun: form.quotaAtTimeOfRun.value,
      crewFatalities: form.crewFatalities.value
    };
    fetch('/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      // Handle response
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  function loadRuns(page = 1) {
    fetch(`/runs?page=${page}`)
      .then(response => response.json())
      .then(data => {
        // Populate table and pagination
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  loadRuns();
});
