// Initialize Map
var map = L.map('map').setView([26.6, 80.4], 8);

// Add OpenStreetMap Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Example polygon for a river region
var riverPolygon = L.polygon([
  [26.4, 80.2],
  [26.4, 80.6],
  [26.8, 80.6],
  [26.8, 80.2]
], { color: 'red' }).addTo(map);

riverPolygon.bindPopup("<b>River Ganga</b><br>Pollution Level: High");

// Handle Filters
document.getElementById("pollutant").addEventListener("change", function () {
  alert("Selected Pollutant: " + this.value);
});

// Download CSV Report
document.getElementById("downloadBtn").addEventListener("click", function () {
  var csv = "Pollutant,Value\nNitrate,45\nPhosphate,30";
  var blob = new Blob([csv], { type: "text/csv" });
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "water_report.csv";
  link.click();
});

// Pollution Trend Chart
var ctx1 = document.getElementById("trendChart").getContext("2d");
new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [{
      label: "Pollution Level",
      data: [30, 45, 50, 70, 65],
      borderColor: "blue",
      fill: false
    }]
  }
});

// Sources of Pollution Pie Chart
var ctx2 = document.getElementById("sourceChart").getContext("2d");
new Chart(ctx2, {
  type: "pie",
  data: {
    labels: ["Industry", "Agriculture", "Sewage"],
    datasets: [{
      data: [50, 30, 20],
      backgroundColor: ["#0088FE", "#00C49F", "#FF8042"]
    }]
  }
});
