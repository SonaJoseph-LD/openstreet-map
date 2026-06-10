import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

function GeoJsonLayer({ data, style, type }) {
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(`
        <strong>${feature.properties.name}</strong><br/>
        ${feature.properties.description || ''}
      `);
    }
  };

  const pointToLayer = (feature, latlng) => {
    // Basic styling for point features if needed
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: style.fillColor || 'green',
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  };

  return (
    <GeoJSON 
      data={data} 
      style={style} 
      onEachFeature={onEachFeature}
      pointToLayer={type === 'point' ? pointToLayer : undefined}
    />
  );
}

export default GeoJsonLayer;
