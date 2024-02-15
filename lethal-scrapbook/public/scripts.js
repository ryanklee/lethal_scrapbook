document.addEventListener('DOMContentLoaded', function() {
  const startNewGameButton = document.getElementById('startNewGame');
  const startNewGameButton = document.getElementById('startNewGame');
  const runsTable = document.getElementById('runs-table');
  const pagination = document.getElementById('pagination');
  const gameForm = document.getElementById('game-form');
  const moonForm = document.getElementById('moon-form');
  const facilityForm = document.getElementById('facility-form');
  const entranceForm = document.getElementById('entrance-form');
  const continueGameButton = document.getElementById('continueGame');

  startNewGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '/game-logging.html'; // Redirect to the game logging page for a new game
  });
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
