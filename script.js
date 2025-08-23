// Demo region list
const regions = [
  "Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore",
  "London", "New York", "Tokyo", "Beijing", "Paris",
  "Sydney", "Cairo", "Toronto", "Berlin", "Mexico City"
];

// Explore button functionality
function exploreData() {
  alert("Redirecting to global air quality data...");
}

// Search function
function searchRegion() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let resultsBox = document.getElementById("results");
  resultsBox.innerHTML = "";

  if (input.length === 0) {
    resultsBox.style.display = "none";
    return;
  }

  let matches = regions.filter(region => region.toLowerCase().includes(input));

  if (matches.length > 0) {
    resultsBox.style.display = "block";
    matches.forEach(region => {
      let li = document.createElement("li");
      li.textContent = region;
      li.onclick = () => selectRegion(region);
      resultsBox.appendChild(li);
    });
  } else {
    resultsBox.style.display = "none";
  }
}

// script.js - toggles dropdown, closes on outside click or Esc

document.addEventListener('DOMContentLoaded', () => {
  const toggles = Array.from(document.querySelectorAll('.dropdown-toggle'));

  // Toggle single dropdown (and close any others)
  function toggleMenu(button) {
    const dropdown = button.closest('.dropdown');
    const menu = dropdown.querySelector('.dropdown-menu');

    // Close all first
    closeAllMenus();

    // If it was closed, open it
    const wasOpen = menu.classList.contains('show');
    if (!wasOpen) {
      menu.classList.add('show');
      menu.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-expanded', 'true');
    }
  }

  // Close all dropdown menus
  function closeAllMenus() {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      menu.classList.remove('show');
      menu.setAttribute('aria-hidden', 'true');
      const btn = menu.closest('.dropdown').querySelector('.dropdown-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  // Attach click handlers to toggles
  toggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // don't let document click handler immediately close it
      toggleMenu(btn);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    // if click is NOT inside any .dropdown, close all
    if (!e.target.closest('.dropdown')) {
      closeAllMenus();
    }
  });

  // Close by pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeAllMenus();
    }
  });

  // Optional: close the dropdown when a menu link is clicked (so mobile UX is nice)
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => closeAllMenus());
  });
});


