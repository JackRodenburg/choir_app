document.addEventListener('DOMContentLoaded', function() {
    fetchSongs();
});

let fuse; // This will hold our Fuse.js instance

async function fetchSongs() {
    const apiKey = 'AIzaSyB_ShIZ__WL6phV8QzBk67WjbP7eJBfVWc';
    const sheetId = '1Ax4xrPWpD-Q_G3Y5MapMZPNB_oniX9G2r2YymLdDX6o';
    const range = 'Sheet1!A:B';

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
    const data = await response.json();
    setupFuse(data.values);
    displaySongs(data.values);
}

function setupFuse(songs) {
    const options = {
        includeScore: true,
        threshold: 0.5, // More forgiving
        distance: 1000, // Allows characters to be far apart
        minMatchCharLength: 1, // Even single character matches are considered
        keys: ['0'] // Assuming song names are in the first column of each row
    };
    fuse = new Fuse(songs, options);
}

function displaySongs(songs) {
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';
    songs.forEach(song => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = song[0];
        a.href = song[1];
        a.target = "_blank";
        li.appendChild(a);
        songList.appendChild(li);
    });
}

function filterSongs() {
    const searchInput = document.getElementById('search-box').value;
    const results = fuse.search(searchInput);
    const songList = document.getElementById('song-list');
    songList.innerHTML = ''; // Clear previous results
    results.forEach(result => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = result.item[0];
        a.href = result.item[1];
        a.target = "_blank";
        li.appendChild(a);
        songList.appendChild(li);
    });
}
