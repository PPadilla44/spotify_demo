const spotifyDataElem = document.getElementById("spotify-data")
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

async function getKeys() {
    const keys = await (await fetch("/api/keys")).json();
    return keys
}

async function getSpotifyToken() {
    const keys = await getKeys();
    const client_id = keys.CLIENT_ID;
    const client_secret = keys.CLIENT_SECRET;
    const code = urlParams.get("code")
    var redirect_uri = 'http://localhost:5000/dashboard'

    try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret))
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
        });
        const data = await res.json();
        const token = data.access_token;
        localStorage.setItem('spotify-token', token)
    } catch (err) {
        console.log(err);
    }
}
// getSpotifyToken()
async function searchSongs() {

    const token = localStorage.getItem("spotify-token");

    try {
        // const res = await fetch("https://api.spotify.com/v1/artists/6KImCVD70vtIoJWnq6nGn3", {
        const res = await fetch("https://api.spotify.com/v1/search?q=Harry&type=artist", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const data = await res.json();
        console.log(data);
        const items = data.artists.items;
        for (const item of items) {

            spotifyDataElem.innerHTML +=
                `
            <li class="list-group-item">
                <div class="d-flex gap-3 align-items-center">
                    <a href="${item.external_urls.spotify}" target="_blank">${item.name}</a>
                    <img src="${item.images[2].url}" height="100" alt="${item.name}">
                    <p>${item.popularity}</p>
                    <p>${item.genres.slice(0, 3)}</p>
                </div>
            </li>
            `
        }

    } catch (err) {
        console.log(err);
    }
}

// searchSongs();

async function getProfile() {

    const token = localStorage.getItem("spotify-token");

    try {
        const res = await fetch("https://api.spotify.com/v1/me/top/artists", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        const data = await res.json();

        const items = data.items;
        for (const item of items) {

            spotifyDataElem.innerHTML +=
                `
            <li class="list-group-item">
                <div class="d-flex gap-3 align-items-center">
                    <a href="${item.external_urls.spotify}" target="_blank">${item.name}</a>
                    <img src="${item.images[2].url}" height="100" alt="${item.name}">
                    <p>${item.popularity}</p>
                    <p>${item.genres.slice(0, 3)}</p>
                </div>
            </li>
            `
        }
    } catch (err) {
        console.log(err);
    }
}

getProfile();
