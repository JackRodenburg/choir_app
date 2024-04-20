document.addEventListener('DOMContentLoaded', function() {
    fetchSongs();
});

async function fetchSongs() {
    const apiKey = 'AIzaSyB_ShIZ__WL6phV8QzBk67WjbP7eJBfVWc'; // Your API key
    const sheetId = '1Ax4xrPWpD-Q_G3Y5MapMZPNB_oniX9G2r2YymLdDX6o'; // Your Sheet ID
    const range = 'Sheet1!A:B'; // Adjust based on where your data is located in the sheet

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
    const data = await response.json();
    displaySongs(data.values);
}

function displaySongs(songs) {
    const songList = document.getElementById('song-list');
    songList.innerHTML = ''; // Clear existing entries
    songs.forEach(song => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = song[0]; // Assuming song name is in the first column
        a.href = song[1]; // Assuming URL is in the second column
        a.target = "_blank"; // Opens in a new tab
        li.appendChild(a);
        songList.appendChild(li);
    });
}

function filterSongs() {
    const searchInput = document.getElementById('search-box').value.toLowerCase();
    const songList = document.querySelectorAll('#song-list li');
    songList.forEach(function(song) {
        const songText = song.textContent.toLowerCase();
        song.style.display = songText.includes(searchInput) ? '' : 'none';
    });
}
