document.addEventListener('DOMContentLoaded', function() {
  function fetchLatestData() {
    fetch('/runs?page=1&limit=1') // Fetch only the last updated row
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latestData = data[0]; // Get the last row
          const latestDataDiv = document.getElementById('latestData');
          latestDataDiv.innerHTML = JSON.stringify(latestData, null, 2); // Display data as formatted JSON
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  fetchLatestData(); // Call the function to fetch and display data
  const startNewGameButton = document.getElementById('startNewGame');
  function fetchLatestData() {
    fetch('/runs?page=1&limit=1') // Fetch only the last updated row
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latestData = data[0]; // Get the last row
          const latestDataDiv = document.getElementById('latestData');
          latestDataDiv.innerHTML = JSON.stringify(latestData, null, 2); // Display data as formatted JSON
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  fetchLatestData(); // Call the function to fetch and display data
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

  continueGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    const gameId = document.getElementById('continueGameId').value;
    if (gameId) {
      window.location.href = `/game-logging.html?gameId=${gameId}`; // Redirect to the game logging page with the specified game ID
    }
  });
  });

  continueGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    const gameId = document.getElementById('continueGameId').value;
    if (gameId) {
      window.location.href = `/game-logging.html?gameId=${gameId}`; // Redirect to the game logging page with the specified game ID
    }
  });

  function loadRuns(page = 1) {
    fetch(`/runs?page=${page}`)
      .then(response => response.json())
      .then(data => {
        const runsTableBody = document.querySelector('#runsTable tbody');
        runsTableBody.innerHTML = ''; // Clear existing rows
        data.forEach(run => {
          const row = runsTableBody.insertRow();
          row.innerHTML = `
            <tr>
              <td>${run.RunID}</td>
              <td>${run.GameID}</td>
              <td>${run.MoonID}</td>
              <td>${run.Date}</td>
              <td>${run.ScrapCollected}</td>
              <td>${run.QuotaAtTimeOfRun}</td>
              <td>${run.CrewFatalities}</td>
            </tr>
          `;
        });

  continueGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    const gameId = document.getElementById('continueGameId').value;
    if (gameId) {
      window.location.href = `/game-logging.html?gameId=${gameId}`; // Redirect to the game logging page with the specified game ID
    }
  });
        // TODO: Implement pagination based on total number of runs
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  continueGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    const gameId = document.getElementById('continueGameId').value;
    if (gameId) {
      window.location.href = `/game-logging.html?gameId=${gameId}`; // Redirect to the game logging page with the specified game ID
    }
  });
  }

  function fetchLatestData(endpoint, callback) {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          callback(data[data.length - 1]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  continueGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    const gameId = document.getElementById('continueGameId').value;
    if (gameId) {
      window.location.href = `/game-logging.html?gameId=${gameId}`; // Redirect to the game logging page with the specified game ID
    }
  });
  }

  function setDefaultGame(data) {
    gameForm.startDate.value = data.StartDate;
    gameForm.finalQuota.value = data.FinalQuota;
  }

  function setDefaultMoon(data) {
    moonForm.moonName.value = data.Name;
  }

  function setDefaultFacility(data) {
    facilityForm.facilityMoonId.value = data.MoonID;
  }

  function setDefaultEntrance(data) {
    entranceForm.entranceFacilityId.value = data.FacilityID;
    entranceForm.entranceType.value = data.Type;
  }

  function setDefaultStrategy(data) {
    strategyForm.strategyDescription.value = data.Description;
  }

  fetchLatestData('/games', setDefaultGame);
  fetchLatestData('/moons', setDefaultMoon);
  fetchLatestData('/facilities', setDefaultFacility);
  fetchLatestData('/entrances', setDefaultEntrance);
  fetchLatestData('/strategies', setDefaultStrategy);

  loadRuns();
});
