// Initialize the map and set default view
var map = L.map('map').setView([0, 0], 2);

// Load and display tile layers on the map
L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=fd61b9e0c69c4e14bebd50a9a968348c">Sentinel Hub</a>'
}).addTo(map);

// Handle the form submission for adding a location
document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var location = document.getElementById('location').value;
    fetch('/addLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location: location })
    })
    .then(response => response.json())
    .then(data => {
        var latlng = [data.lat, data.lng];
        map.setView(latlng, 10);
        L.marker(latlng).addTo(map);
    });
});

// Handle Google OAuth2 Sign-In
function handleCredentialResponse(response) {
    fetch('/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: response.credential })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Handle the response from the server
        alert(data); // Display an alert with the server's response
    });
}
if (!sessionStorage.getItem('user')) {
    window.location.href = 'auth.html';
}

// Initialize Google Sign-In on window load
window.onload = function () {
    google.accounts.id.initialize({
        client_id: '988965763799-pmdsmehdoodlofphi9n352r2cl281hjr.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" }  // Customize the button appearance
    );
    google.accounts.id.prompt(); // Display the One Tap prompt automatically
};
