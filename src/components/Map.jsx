import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import GeoJsonLayer from './Layers/GeoJsonLayer';
import PolygonLayer from './Layers/PolygonLayer';
import SettlementsLayer from './Layers/SettlementsLayer';
import RouteLayer from './Layers/RouteLayer';
import { processPois } from '../utils/poiUtils';

// Data imports
import rawPois from '../data/pois.json';

// Fix for default marker icon issue in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Map({ selectedCategory, directions }) {
  const center = [49.444, 7.768]; // Kaiserslautern center
  
  // Process and filter data
  const pois = processPois(rawPois);
  
  const filteredPois = {
    ...pois,
    features: selectedCategory === 'All' 
      ? pois.features 
      : pois.features.filter(f => f.properties.category === selectedCategory)
  };

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Historical (OpenHistoricalMap)">
          <TileLayer
            attribution='Historical Data &copy; <a href="https://www.oldmapsonline.org/">OldMapsOnline</a>'
            url="https://wmts.oldmapsonline.org/maps/1c386e04-51a7-4797-b810-0310b232bdd0/2026-06-09T20:02:16.576464Z/{z}/{x}/{y}.png?key=gVFmp1niUwxdVPqX6fXn"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Points of Interest">
          <GeoJsonLayer 
            key={selectedCategory} 
            data={filteredPois} 
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Industrial Sites">
          <PolygonLayer />
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Settlements (Building Land)">
          <SettlementsLayer />
        </LayersControl.Overlay>
      </LayersControl>

      {directions && <RouteLayer data={directions} />}
    </MapContainer>
  );
}

export default Map;
