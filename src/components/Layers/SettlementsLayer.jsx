import { GeoJSON } from 'react-leaflet';
import settlementData from '../../data/settlements.json';

const SettlementsLayer = () => {
  const settlementStyle = {
    fillColor: '#3498db',
    color: '#2980b9',
    fillOpacity: 0.35,
    weight: 2
  };

  const onEachSettlement = (feature, layer) => {
    const name = feature.properties?.name || "Workers' Settlement";
    layer.bindTooltip(name, { sticky: true, direction: 'auto' });
  };

  return (
    <GeoJSON 
      key="wfs-settlement-layer" 
      data={settlementData} 
      style={settlementStyle} 
      onEachFeature={onEachSettlement} 
    />
  );
};

export default SettlementsLayer;
