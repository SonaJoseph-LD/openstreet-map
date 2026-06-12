import { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';
import rawData from '../../data/polygons.json';

const PolygonLayer = () => {
  const factoryCollection = useMemo(() => {
    const factories = [];

    rawData.features.forEach(feature => {
      if (feature.properties && feature.properties.landuse === 'industrial') {
        factories.push(feature);
      }
    });

    return {
      type: "FeatureCollection",
      features: factories
    };
  }, []);

  const factoryStyle = {
    fillColor: '#e74c3c',
    color: '#c0392b',
    fillOpacity: 0.35,
    weight: 2
  };

  const onEachFactory = (feature, layer) => {
    const name = feature.properties?.name || "Factory Site";
    layer.bindTooltip(name, { sticky: true, direction: 'auto' });
  };

  return (
    <GeoJSON 
      key="factory-layer" 
      data={factoryCollection} 
      style={factoryStyle} 
      onEachFeature={onEachFactory} 
    />
  );
};

export default PolygonLayer;
