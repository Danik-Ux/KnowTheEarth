import { DataStore } from '@aws-amplify/datastore';
import { Location } from './models';

document.getElementById('locationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const locationName = document.getElementById('locationName').value;
    const coordinates = document.getElementById('coordinates').value;
    
    // Save the data to DynamoDB via DataStore
    await DataStore.save(
        new Location({
            name: locationName,
            coordinates: coordinates,
            createdAt: new Date().toISOString()
        })
    );

    // Optionally, add the marker to the map
    const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
    L.marker([lat, lng]).addTo(map).bindPopup(locationName);
});
