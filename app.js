import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

document.addEventListener('DOMContentLoaded', async function() {
    try {
        await Auth.currentAuthenticatedUser();
        // User is authenticated, continue loading the map
        initializeMap();
    } catch {
        // User is not authenticated, redirect to login page
        window.location.href = 'login.html';
    }
});

function initializeMap() {
    // Your existing map initialization code
}

// Initialize the map
var map = L.map('map', {
    fullscreenControl: true, // Enable fullscreen control
    zoomsliderControl: true, // Enable zoomslider control
}).setView([0, 0], 2);

// Load and display tile layers on the map
L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=fd61b9e0c69c4e14bebd50a9a968348c">Sentinel Hub</a>'
}).addTo(map);

// Initialize the marker cluster group
var markers = L.markerClusterGroup();

// Add markers to the map (example)
var marker1 = L.marker([51.5, -0.09]).bindPopup('Marker 1');
var marker2 = L.marker([51.495, -0.083]).bindPopup('Marker 2');
var marker3 = L.marker([51.49, -0.1]).bindPopup('Marker 3');

// Add markers to the cluster group
markers.addLayer(marker1);
markers.addLayer(marker2);
markers.addLayer(marker3);

// Add the marker cluster group to the map
map.addLayer(markers);

// Add popups or tooltips (example)
marker1.bindTooltip("I am a tooltip for Marker 1").openTooltip();

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
