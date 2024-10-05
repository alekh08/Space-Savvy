window.onload = function () {
  const orrery = document.getElementById('orrery');
  const loadNEOsButton = document.getElementById('loadNEOs');
  const apiKey = "V5nh6RaCUcnqAJZVfrOHJAHJKS9hntIiHraM0EKh"; // NASA API Key
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-07&api_key=${apiKey}`;

  // Function to fetch NEO data
  async function fetchNEOData() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayNEOData(data.near_earth_objects);
    } catch (error) {
      console.error("Error fetching NEO data:", error);
    }
  }

  // Function to display NEO data on the page
  function displayNEOData(neoObjects) {
    const neoDates = Object.keys(neoObjects);

    neoDates.forEach((date) => {
      const neos = neoObjects[date];

      neos.forEach((neo) => {
        createNEO(neo);
      });
    });
  }

  // Function to create and display NEO information in the Orrery
  function createNEO(neo) {
    const neoDiv = document.createElement('div');
    neoDiv.classList.add('neo-object');

    const neoInfo = document.createElement('div');
    neoInfo.classList.add('neo-info');
    neoInfo.innerHTML = `
      <p><strong>Name:</strong> ${neo.name}</p>
      <p><strong>Diameter:</strong> ${neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
      <p><strong>Velocity:</strong> ${neo.close_approach_data[0].relative_velocity.kilometers_per_hour.toFixed(2)} km/h</p>
      <p><strong>Miss Distance:</strong> ${neo.close_approach_data[0].miss_distance.kilometers.toFixed(2)} km</p>
    `;

    neoDiv.appendChild(neoInfo);
    orrery.appendChild(neoDiv);

    // Apply floating and orbiting animation
    const randomDuration = Math.random() * 15 + 5;
    neoDiv.style.animation = `orbit ${randomDuration}s infinite linear`;
    neoDiv.style.top = `${Math.random() * 80 + 10}%`;
    neoDiv.style.left = `${Math.random() * 80 + 10}%`;
  }

  // Event listener for the button click to load NEOs
  loadNEOsButton.addEventListener('click', function () {
    fetchNEOData();
  });
};
