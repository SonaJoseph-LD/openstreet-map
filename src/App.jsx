import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Legend from './components/Legend';
import rawPois from './data/pois.json';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [directions, setDirections] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatInstruction = (maneuver) => {
    if (maneuver.instruction) return maneuver.instruction;
    
    const type = maneuver.type || '';
    const modifier = maneuver.modifier || '';
    
    switch (type) {
      case 'turn':
        return `Turn ${modifier.replace('_', ' ')}`;
      case 'new name':
        return `Continue onto ${maneuver.name || 'new road'}`;
      case 'depart':
        return 'Head towards your destination';
      case 'arrive':
        return 'You have arrived at your destination';
      case 'merge':
        return `Merge ${modifier.replace('_', ' ')}`;
      case 'ramp':
        return 'Take the ramp';
      case 'on ramp':
        return 'Take the on-ramp';
      case 'off ramp':
        return 'Take the off-ramp';
      case 'fork':
        return `Take the fork ${modifier.replace('_', ' ')}`;
      case 'end of road':
        return `At the end of the road, turn ${modifier.replace('_', ' ')}`;
      case 'continue':
        return 'Continue straight';
      case 'roundabout':
        return 'Enter the roundabout';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const fetchDirections = async (start, end, waypoints = []) => {
    setIsLoading(true);
    setError(null);

    try {
      // OSRM expects coordinates in [longitude, latitude] format
      const startCoord = typeof start === 'string' 
        ? start.split(',').reverse().join(',') 
        : `${start.geometry.coordinates[0]},${start.geometry.coordinates[1]}`;
      
      const endCoord = typeof end === 'string' 
        ? end.split(',').reverse().join(',') 
        : `${end.geometry.coordinates[0]},${end.geometry.coordinates[1]}`;

      let coords = startCoord;
      if (waypoints.length > 0) {
        coords += ';' + waypoints.map(wp => `${wp.lng},${wp.lat}`).join(';');
      }
      coords += `;${endCoord}`;

      const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=true`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch directions from OSRM');
      }

      const data = await response.json();

      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        // Map OSRM response to the structure expected by Sidebar and RouteLayer
        const mappedDirections = [{
          formatted_distance: (route.distance / 1000).toFixed(2) + ' km',
          formatted_duration: Math.round(route.duration / 60) + ' min',
          via: route.legs[0].summary || 'Road',
          geometry: route.geometry,
          trips: route.legs.map(leg => ({
            details: leg.steps.map(step => ({
              title: formatInstruction(step.maneuver),
              formatted_distance: step.distance > 1000 
                ? (step.distance / 1000).toFixed(1) + ' km' 
                : Math.round(step.distance) + ' m',
              gps_coordinates: {
                latitude: step.maneuver.location[1],
                longitude: step.maneuver.location[0]
              }
            }))
          }))
        }];
        
        setDirections(mappedDirections);
      } else {
        throw new Error('No route found');
      }
    } catch (err) {
      setError(err.message);
      console.error('Directions error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCategoryRoute = async (category) => {
    if (category === 'All') return;

    // Get named POIs in this category from the processed data
    const categoryPois = rawPois.features.filter(f => 
      f.properties.category === category && f.properties.name
    ).slice(0, 10); // Limit to 10 for API stability

    if (categoryPois.length < 2) {
      setError("Not enough points in this category to create a trail.");
      return;
    }

    const tour = {
      id: `auto-${category}`,
      name: `${category} Discovery Trail`,
      description: `An automatically generated route connecting significant ${category} sites in Kaiserslautern.`,
      color: "#2ecc71",
      waypoints: categoryPois.map(f => ({
        name: f.properties.name,
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0]
      }))
    };

    const start = `${tour.waypoints[0].lat},${tour.waypoints[0].lng}`;
    const end = `${tour.waypoints[tour.waypoints.length - 1].lat},${tour.waypoints[tour.waypoints.length - 1].lng}`;
    const middleWaypoints = tour.waypoints.slice(1, -1);

    await fetchDirections(start, end, middleWaypoints);
  };

  const clearDirections = () => {
    setDirections(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <Sidebar 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        onFetchDirections={fetchDirections}
        onClearDirections={clearDirections}
        onGenerateCategoryRoute={generateCategoryRoute}
        directions={directions}
        isLoading={isLoading}
        error={error}
      />
      <main className="map-wrapper">
        <Map 
          selectedCategory={selectedCategory} 
          directions={directions}
        />
        <Legend />
      </main>
    </div>
  );
}

export default App;
