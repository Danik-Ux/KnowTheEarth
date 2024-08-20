import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

function initializeMap() {
    // Initialize the map
    var map = L.map('map', {
        fullscreenControl: true,
        zoomsliderControl: true,
    }).setView([0, 0], 2);

    L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=fd61b9e0c69c4e14bebd50a9a968348c">Sentinel Hub</a>'
    }).addTo(map);

    var markers = L.markerClusterGroup();

    var marker1 = L.marker([51.5, -0.09]).bindPopup('Marker 1');
    var marker2 = L.marker([51.495, -0.083]).bindPopup('Marker 2');
    var marker3 = L.marker([51.49, -0.1]).bindPopup('Marker 3');

    markers.addLayer(marker1);
    markers.addLayer(marker2);
    markers.addLayer(marker3);

    map.addLayer(markers);

    marker1.bindTooltip("I am a tooltip for Marker 1").openTooltip();

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
}

// Call initializeMap once the page is fully loaded
window.onload = initializeMap;

export default withAuthenticator(initializeMap);
