document.addEventListener('DOMContentLoaded', function() {
    fetchSongs();
});

let fuse; // This will hold our Fuse.js instance

async function fetchSongs() {
    const apiKey = 'AIzaSyB_ShIZ__WL6phV8QzBk67WjbP7eJBfVWc'; // Your API key
    const sheetId = '1Ax4xrPWpD-Q_G3Y5MapMZPNB_oniX9G2r2YymLdDX6o'; // Your Sheet ID
    const range = 'Sheet1!A:B'; // Adjust based on where your data is located in the sheet

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
    const data = await response.json();
    displaySongs(data.values);

    // Initialize Fuse with the song data
    const options = {
        includeScore: true, // Consider the score to filter by relevance
        keys: ['title'], // Define which keys to search in the objects
        threshold: 0.3 // Threshold for search results, lower is stricter
    };
    // Prepare the song data for Fuse by mapping it to a suitable structure
    fuse = new Fuse(data.values.map(song => ({ title: song[0], url: song[1] })), options);
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
    const searchInput = document.getElementById('search-box').value;
    const results = fuse.search(searchInput); // Use Fuse to search
    const songList = document.getElementById('song-list');
    songList.innerHTML = ''; // Clear previous results
    results.forEach(result => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = result.item.title;
        a.href = result.item.url;
        a.target = "_blank";
        li.appendChild(a);
        songList.appendChild(li);
    });
}
