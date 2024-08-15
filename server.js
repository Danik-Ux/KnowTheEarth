const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8080;

const CLIENT_ID = '988965763799-pmdsmehdoodlofphi9n352r2cl281hjr.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/auth/google', async (req, res) => {
    const token = req.body.id_token;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        console.log('User ID:', userid);
        console.log('User Email:', payload['email']);
        res.send('User authenticated successfully!');
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(401).send('Authentication failed');
    }
});

app.post('/addLocation', (req, res) => {
    const { location } = req.body;
    const coordinates = getLocationCoordinates(location);

    console.log(`Location added: ${location}, Coordinates: ${coordinates.lat}, ${coordinates.lng}`);

    res.send(coordinates);
});

function getLocationCoordinates(location) {
    return {
        lat: -25.2744,
        lng: 133.7751
    };
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
