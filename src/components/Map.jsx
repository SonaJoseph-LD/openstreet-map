import { MapContainer, TileLayer, LayersControl, Polyline } from 'react-leaflet';
import GeoJsonLayer from './Layers/GeoJsonLayer';

// Data imports
import industrialSites from '../data/industrial-sites.json';
import workersSettlements from '../data/workers-settlements.json';
import culturalSites from '../data/cultural-sites.json';

// Fix for default marker icon issue in Leaflet + React
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Map() {
  const center = [49.444, 7.768]; // Kaiserslautern center
  
  const industrialStyle = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    weight: 2
  };

  const workersStyle = {
    color: 'blue',
    fillColor: '#30f',
    fillOpacity: 0.5,
    weight: 2
  };

  const routePath = [
    [49.448, 7.765],
    [49.445, 7.770],
    [49.440, 7.748]
  ];

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Historical Map Overlay (Placeholder)">
          <TileLayer
            attribution='Historical Data'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Industrial Sites">
          <GeoJsonLayer data={industrialSites} style={industrialStyle} />
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Workers' Settlements">
          <GeoJsonLayer data={workersSettlements} style={workersStyle} />
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Cultural Sites">
          <GeoJsonLayer data={culturalSites} style={{ fillColor: 'green' }} type="point" />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Historical Route">
          <Polyline positions={routePath} color="orange" weight={4} dashArray="10, 10" />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default Map;
