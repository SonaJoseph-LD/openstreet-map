function Sidebar({ selectedCategory, onCategoryChange }) {
  const categories = [
    'All',
    'Historic Sites',
    'Cultural Sites',
    'Tourism',
    'Transportation',
    'Industrial / Man-Made',
    'Other'
  ];

  return (
    <aside className="sidebar">
      <h1>Kaiserslautern Historical Map</h1>
      
      <div className="filter-section">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select 
          id="category-filter" 
          value={selectedCategory} 
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
          ))}
        </select>
        {selectedCategory !== 'All' && (
          <button 
            className="clear-filter"
            onClick={() => onCategoryChange('All')}
          >
            Remove Filter
          </button>
        )}
      </div>

      <div className="description">
        <p>
          This project visualizes the industrial and cultural history of Kaiserslautern. 
          Explore various sites including historical factories, workers' settlements, 
          and significant cultural landmarks.
        </p>
        <p>
          Use the layer control on the map to toggle different data layers and 
          historical overlays.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
