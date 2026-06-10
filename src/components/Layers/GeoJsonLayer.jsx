import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

function GeoJsonLayer({ data, style }) {
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const { name, description, historic, tourism, amenity, man_made } = feature.properties;
      
      let popupContent = `<div class="poi-popup">`;
      if (name) popupContent += `<strong>${name}</strong><br/>`;
      
      const type = historic || tourism || amenity || man_made;
      if (type) popupContent += `<small>Type: ${type}</small><br/>`;
      
      if (description) popupContent += `<p>${description}</p>`;
      
      // Add a few more interesting properties if they exist
      const interestingKeys = ['website', 'opening_hours', 'phone', 'addr:street', 'addr:housenumber'];
      interestingKeys.forEach(key => {
        if (feature.properties[key]) {
          popupContent += `<div><strong>${key.replace('addr:', '')}:</strong> ${feature.properties[key]}</div>`;
        }
      });
      
      popupContent += `</div>`;
      layer.bindPopup(popupContent);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Historic Sites': return 'red';
      case 'Cultural Sites': return 'blue';
      case 'Tourism': return 'green';
      case 'Transportation': return 'gray';
      case 'Industrial / Man-Made': return 'purple';
      case 'Other': return '#3388ff';
      default: return '#3388ff';
    }
  };

  const pointToLayer = (feature, latlng) => {
    const color = getCategoryColor(feature.properties.category);

    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  };

  const featureStyle = (feature) => {
    if (style) return style;
    
    const color = getCategoryColor(feature.properties.category);
    
    return {
      color: color,
      fillColor: color,
      fillOpacity: 0.4,
      weight: 2
    };
  };

  return (
    <GeoJSON 
      data={data} 
      style={featureStyle} 
      onEachFeature={onEachFeature}
      pointToLayer={pointToLayer}
    />
  );
}

export default GeoJsonLayer;
