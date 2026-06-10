import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, '../data/pois.json');
const outputPath = path.resolve(__dirname, '../data/pois.json');

function processGeoJSON() {
    try {
        console.log('Reading data from:', inputPath);
        const rawData = fs.readFileSync(inputPath, 'utf8');
        const geojson = JSON.parse(rawData);

        console.log(`Initial features count: ${geojson.features.length}`);

        geojson.features = geojson.features.map(feature => {
            const props = feature.properties;
            let category = 'Other';

            // Rules provided by the user
            if (props.historic) {
                category = 'Historic Sites';
            } else if (props.tourism === 'museum' || props.tourism === 'artwork') {
                category = 'Cultural Sites';
            } else if (props.railway === 'station') {
                category = 'Transportation';
            } else if (props.man_made) {
                category = 'Industrial / Man-Made';
            } else if (props.tourism === 'attraction') {
                category = 'Tourism';
            }

            // Update properties with the new category
            feature.properties = {
                ...props,
                category: category
            };

            return feature;
        });

        fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2));
        console.log(`Success! Processed ${geojson.features.length} features.`);
        console.log(`Exported cleaned GeoJSON to: ${outputPath}`);
    } catch (error) {
        console.error('Error processing GeoJSON:', error.message);
    }
}

processGeoJSON();
