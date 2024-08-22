import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { createLocation } from './graphql/mutations';
import { generateClient } from "aws-amplify/api";

Amplify.configure(awsconfig);

const client = generateClient();

// Check if the user is authenticated
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (!code) {
    // Redirect to AWS Cognito Hosted UI for authentication if the user is not authenticated
    window.location.href = 'https://knowtheearth.auth.us-west-2.amazoncognito.com/login?client_id=14rnop7mqm59es8ku2h5m9vkaa&response_type=code&scope=email+openid+phone&redirect_uri=https://main.d3hwxvxjqggka.amplifyapp.com';
} else {


function initializeMap() {
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
    document.getElementById('locationForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const locationName = document.getElementById('location').value;
        const coordinates = "example, coordinates"; // Replace with actual coordinates from map interaction

        try {
            const newLocation = await client.graphql({
                query: createLocation,
                variables: {
                    input: {
                        name: locationName,
                        coordinates: coordinates,
                        createdAt: new Date().toISOString(),
                    }
                }
            });
            console.log('Location saved:', newLocation);
        } catch (error) {
            console.error('Error saving location:', error);
        }
    });
}
}