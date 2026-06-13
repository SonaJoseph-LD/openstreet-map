import { Polyline, Popup, useMap } from 'react-leaflet';
import { useEffect, useMemo } from 'react';
import L from 'leaflet';

const RouteLayer = ({ data }) => {
  const map = useMap();

  const route = data ? data[0] : null; 
  
  const positions = useMemo(() => {
    if (!route || !route.trips) return [];
    
    const pos = [];
    // Use detailed geometry if available (from OSRM)
    if (route.geometry && route.geometry.coordinates) {
      route.geometry.coordinates.forEach(coord => {
        // GeoJSON is [lng, lat], Leaflet expects [lat, lng]
        pos.push([coord[1], coord[0]]);
      });
    } else {
      // Fallback to step coordinates (Legacy/SerpApi)
      route.trips.forEach(trip => {
        if (trip.details) {
          trip.details.forEach(detail => {
            if (detail.gps_coordinates) {
              pos.push([
                detail.gps_coordinates.latitude, 
                detail.gps_coordinates.longitude
              ]);
            }
          });
        }
      });
    }
    return pos;
  }, [route]);

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [80, 80] });
    }
  }, [positions, map]);

  if (!route || !route.trips || positions.length < 2) return null;

  const routeColor = "#f1c40f"; // Bright Yellow (Flat UI color)

  return (
    <>
      <Polyline 
        positions={positions} 
        color={routeColor} 
        weight={8} 
        opacity={0.6}
      />
      
      <Polyline 
        positions={positions} 
        color={routeColor} 
        weight={4} 
        opacity={1}
      >
        <Popup>
          <div className="route-popup">
            <strong>Route via {route.via}</strong>
            <p>Distance: {route.formatted_distance}</p>
            <p>Duration: {route.formatted_duration}</p>
          </div>
        </Popup>
      </Polyline>
    </>
  );
};

export default RouteLayer;
