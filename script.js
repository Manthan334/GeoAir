const apiKey = 'YOUR_OPENAQ_API_KEY'; // Use your actual key

async function searchRegion() {
    const input = document.getElementById("searchInput").value;
    const resultsBox = document.getElementById("results");
    resultsBox.innerHTML = "";

    if (!input.trim()) {
        resultsBox.style.display = "none";
        return;
    }

    try {
        const url = `https://api.openaq.org/v3/cities?limit=10&order_by=city&sort=asc&city=${encodeURIComponent(input)}`;
        const resp = await fetch(url, {
            headers: { 'X-API-Key': apiKey }
        });
        const data = await resp.json();
        const matches = data.results.map(r => r.city);

        if (matches.length) {
            resultsBox.style.display = "block";
            matches.forEach(city => {
                const li = document.createElement("li");
                li.textContent = city;
                li.onclick = () => selectRegion(city);
                resultsBox.appendChild(li);
            });
        } else {
            resultsBox.style.display = "none";
        }
    } catch (err) {
        console.error(err);
    }
}

async function selectRegion(city) {
    document.getElementById("searchInput").value = city;
    document.getElementById("results").style.display = "none";
    fetchAQData(city);
}

async function fetchAQData(city) {
    const container = document.getElementById("aqData");
    container.innerHTML = `<p>Loading air quality for <strong>${city}</strong>...</p>`;
    try {
        const url = `https://api.openaq.org/v3/latest?city=${encodeURIComponent(city)}`;
        const resp = await fetch(url, { headers: { 'X-API-Key': apiKey } });
        const data = await resp.json();

        if (!data.results.length) {
            container.innerHTML = `<p>No data found for <strong>${city}</strong>.</p>`;
            return;
        }

        let html = `<h3>Latest measurements for ${city}:</h3><ul>`;
        data.results[0].measurements.forEach(m => {
            html += `<li>${m.parameter.toUpperCase()}: ${m.value} ${m.unit}</li>`;
        });
        html += "</ul>";
        container.innerHTML = html;
    } catch (err) {
        console.error(err);
        container.innerHTML = `<p>Error fetching data for <strong>${city}</strong>.</p>`;
    }
}
