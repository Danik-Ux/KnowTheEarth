import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import L from 'leaflet';
import 'leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.zoomslider/L.Control.Zoomslider.js';

Amplify.configure(awsExports);

function App() {
  // Initialize the map after the component mounts
  useEffect(() => {
    const map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 2,
      layers: [
        L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=fd61b9e0c69c4e14bebd50a9a968348c">Sentinel Hub</a>'
        })
      ]
    });

    // Add additional controls here
    L.control.fullscreen().addTo(map);
    L.control.zoomslider().addTo(map);

    // Add marker cluster group
    const markers = L.markerClusterGroup();
    markers.addLayer(L.marker([51.5, -0.09]));
    map.addLayer(markers);

  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Know the Earth</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
              <li className="nav-item">
                <AmplifySignOut />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="text-white text-center py-5">
        <div className="container">
          <h1>Welcome to Know The Earth</h1>
          <p className="lead">Explore the Earth’s geographical features in high resolution</p>
        </div>
      </header>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8">
            <div id="map" style="height: 500px;"></div>
          </div>
          <div className="col-lg-4">
            <h2>Interactive Features</h2>
            <p>Use the tools on the map to explore various geographical features.</p>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p>&copy; 2024 Know the Earth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default withAuthenticator(App);
