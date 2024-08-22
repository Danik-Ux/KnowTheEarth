// Import necessary modules at the top of the file
import { DataStore } from '@aws-amplify/datastore';
import { UserPreferences } from './models'; // Ensure this path is correct based on where your models are located

// Your existing imports and code here...

// Redirect to AWS Cognito Hosted UI for authentication
if (!window.location.href.includes('code=')) {
    window.location.href = 'https://knowtheearth.auth.us-west-2.amazoncognito.com/login?client_id=14rnop7mqm59es8ku2h5m9vkaa&response_type=code&scope=email+openid+phone&redirect_uri=https://main.d3hwxvxjqggka.amplifyapp.com';
} else {
    // Assuming the user is authenticated, you can now run your map initialization code

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

    // Your existing marker cluster code here...

    // Add form submission for saving a new location to map and preferences
    document.getElementById('savePreferences').addEventListener('click', async () => {
        const mapView = document.getElementById('mapViewSelect').value;
        const userId = 'current-user-id'; // Replace with logic to get the current user's ID

        // Save the user preferences to DynamoDB
        await saveUserPreferences(userId, mapView, [], 'default'); // Assuming an empty array for favorite locations and a default theme for now
    });

    // Call this function when the map page loads to apply saved user preferences
    applyUserPreferences();
}
