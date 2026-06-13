import { useMemo, useState } from 'react';
import poisData from '../data/pois.json';
import SearchableSelect from './SearchableSelect';

function Sidebar({ 
  selectedCategory, 
  onCategoryChange, 
  onFetchDirections, 
  onClearDirections,
  onGenerateCategoryRoute,
  directions,
  isLoading,
  error 
}) {
  const [startId, setStartId] = useState('');
  const [endId, setEndId] = useState('');

  const categories = [
    'All',
    'Historic Sites',
    'Cultural Sites',
    'Tourism',
    'Transportation',
    'Industrial / Man-Made',
    'Other'
  ];

  // Extract POIs with names for the directions dropdowns
  const namedPois = useMemo(() => {
    return poisData.features
      .filter(f => f.properties.name)
      .sort((a, b) => a.properties.name.localeCompare(b.properties.name));
  }, []);

  const handleGetDirections = () => {
    const start = namedPois.find(f => f.id === startId);
    const end = namedPois.find(f => f.id === endId);
    if (start && end) {
      onFetchDirections(start, end);
    }
  };

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
        {selectedCategory !== 'All' && (
          <button 
            className="generate-trail-btn"
            onClick={() => onGenerateCategoryRoute(selectedCategory)}
            disabled={isLoading}
          >
            Route Through All {selectedCategory}
          </button>
        )}
      </div>

      <div className="directions-section">
        <h3>Get Directions</h3>
        
        <SearchableSelect 
          label="From:"
          options={namedPois}
          value={startId}
          onChange={setStartId}
          placeholder="Select start point..."
        />

        <SearchableSelect 
          label="To:"
          options={namedPois}
          value={endId}
          onChange={setEndId}
          placeholder="Select destination..."
        />

        <button 
          onClick={handleGetDirections}
          disabled={!startId || !endId || isLoading}
          className="get-directions-btn"
        >
          {isLoading ? 'Fetching Route...' : 'Get Directions'}
        </button>

        <button 
          onClick={onClearDirections}
          className="clear-directions-btn"
        >
          Clear Route
        </button>

        {error && <div className="error-message">{error}</div>}

        {directions && directions[0] && (
          <div className="route-details">
            <div className="route-summary">
              <span>{directions[0].formatted_distance}</span>
              <span>{directions[0].formatted_duration}</span>
            </div>
            <div className="route-steps">
              {directions[0].trips.map((trip, tIdx) => (
                <div key={tIdx}>
                  {trip.details.map((step, sIdx) => (
                    <div key={`${tIdx}-${sIdx}`} className="step-item">
                      <div className="step-text">
                        <div dangerouslySetInnerHTML={{ __html: step.title }} />
                        <span className="step-distance">{step.formatted_distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>


    </aside>
  );
}

export default Sidebar;
