// Initialize Leaflet Map
var map = L.map('map').setView([20.5937, 78.9629], 5); // India center

// Search functionality
document.getElementById("searchBtn").addEventListener("click", function () {
  const region = document.getElementById("regionSearch").value;
  if (!region) return;

  // Call Nominatim API
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${region}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        map.setView([lat, lon], 8); // zoom into region
      } else {
        alert("Region not found!");
      }
    })
    .catch(err => console.error("Error:", err));
});


// Add OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fire hotspot markers array
let fireMarkers = [];

// Load fire data from JSON
function loadFireData() {
  fetch('fire_nrt_SV-C2_651619.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(point => {
        let marker = L.marker([point.latitude, point.longitude], { icon: L.divIcon({ className: '', html: '<span style="color:red;font-size:20px;">🔥</span>' }) })
          .bindPopup(`
            <h4>🔥 Fire Detected</h4>
            <p><b>Date:</b> ${point.acq_date}</p>
            <p><b>Brightness:</b> ${point.brightness}</p>
            <p><b>Confidence:</b> ${point.confidence}</p>
          `)
          .addTo(map);
        fireMarkers.push(marker);
      });
    });
}

// Toggle Crop Burning Layer
document.getElementById('cropToggle').addEventListener('change', function (e) {
  if (e.target.checked) {
    loadFireData();
  } else {
    fireMarkers.forEach(m => map.removeLayer(m));
    fireMarkers = [];
  }
});

// Charts
new Chart(document.getElementById('lineChart'), {
  type: 'line',
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ label: "PM2.5", data: [65, 78, 85, 70, 90, 100, 95], borderColor: "blue", fill: false }]
  }
});

new Chart(document.getElementById('barChart'), {
  type: 'bar',
  data: { labels: ["Delhi", "Mumbai", "Chennai"], datasets: [{ label: "NO2 Levels", data: [45, 30, 20] }] }
});

new Chart(document.getElementById('pieChart'), {
  type: 'pie',
  data: { labels: ["Traffic", "Industry", "Crop Burning"], datasets: [{ data: [40, 35, 25], backgroundColor: ["red", "orange", "green"] }] }
});
