function Legend() {
  const items = [
    { label: 'Industrial Sites', color: 'red' },
    { label: "Workers' Settlements", color: 'blue' },
    { label: 'Cultural Sites', color: 'green' },
    { label: 'Route', color: 'orange' }
  ];

  return (
    <div className="map-legend">
      <h4>Legend</h4>
      {items.map((item) => (
        <div key={item.label} className="legend-item">
          <span 
            className="legend-color" 
            style={{ backgroundColor: item.color }}
          ></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
