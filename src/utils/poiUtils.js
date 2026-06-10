/**
 * Categorizes a GeoJSON feature based on specific OSM tags.
 * @param {Object} feature - The GeoJSON feature to categorize.
 * @returns {string} The assigned category.
 */

export function getPoiCategory(props) {

  if (props.historic) {
    return 'Historic Sites';
  } else if (props.tourism === 'museum' || props.tourism === 'artwork') {
    return 'Cultural Sites';
  } else if (props.railway === 'station') {
    return 'Transportation';
  } else if (props.man_made) {
    return 'Industrial / Man-Made';
  } else if (props.tourism === 'attraction') {
    return 'Tourism';
  }
  return 'Other';
}

/**
 * Processes a GeoJSON object to add category properties to all features.
 * @param {Object} geojson - The GeoJSON object to process.
 * @returns {Object} The processed GeoJSON object.
 */
export function processPois(geojson) {
  if (!geojson || !geojson.features) return geojson;

  return {
    ...geojson,
    features: geojson.features.map(feature => ({
      ...feature,
      properties: {
        ...feature.properties,
        category: getPoiCategory(feature.properties)
      }
    }))
  };
}
