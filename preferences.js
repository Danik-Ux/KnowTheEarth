// Function to save user preferences to DynamoDB
async function saveUserPreferences(userId, mapView, favoriteLocations, selectedTheme) {
    await DataStore.save(
        new UserPreferences({
            userId: userId,
            mapView: mapView,
            favoriteLocations: favoriteLocations,
            selectedTheme: selectedTheme
        })
    );
}

// Function to load user preferences from DynamoDB
async function loadUserPreferences(userId) {
    const userPreferences = await DataStore.query(UserPreferences, c => c.userId('eq', userId));
    return userPreferences.length ? userPreferences[0] : null;
}

// Function to apply user preferences when the map loads
async function applyUserPreferences() {
    const userId = 'current-user-id'; // Replace with actual user ID logic
    const preferences = await loadUserPreferences(userId);

    if (preferences) {
        // Apply map view
        if (preferences.mapView === 'Satellite') {
            // Set map to satellite view
            L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=fd61b9e0c69c4e14bebd50a9a968348c">Sentinel Hub</a>'
            }).addTo(map);
        }
        // Add other conditions for different preferences as needed
    }
}
