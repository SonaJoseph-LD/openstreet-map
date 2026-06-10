function Legend() {
  const items = [
    { label: 'Historic Sites', color: 'red' },
    { label: 'Cultural Sites', color: 'blue' },
    { label: 'Tourism', color: 'green' },
    { label: 'Transportation', color: 'gray' },
    { label: 'Industrial / Man-Made', color: 'purple' },
    { label: 'Other', color: '#3388ff' }
  ];

  return (
    <div className="map-legend">
      <h4>Legend</h4>
      {items.map((item) => (
        <div key={item.label} className="legend-item">
          <span 
            className="legend-color" 
            style={{ 
              backgroundColor: item.color,
              height: item.isLine ? '2px' : '16px',
              marginTop: item.isLine ? '7px' : '0'
            }}
          ></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
