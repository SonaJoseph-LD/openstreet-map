# Kaiserslautern Historical Map - OpenStreetMap Visualizer

An interactive React application designed to visualize the industrial and cultural history of Kaiserslautern, Germany. This tool overlays modern geographic data with historical map layers, providing a window into the city's urban development and heritage.

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18 or higher recommended.
- **npm**: Usually comes with Node.js.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd openstreet-map
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## ✨ Features

### 1. Advanced Road-Following Routing
Unlike standard tools that draw straight lines between points, this application uses the **OSRM (Open Source Routing Machine)** to generate precise routes that follow the actual road network of Kaiserslautern. Routes are displayed in high-visibility **yellow**.

### 2. Searchable POI Selection
Finding specific locations is easy with our custom **Searchable Select** components. Simply type the name of a Point of Interest (POI) to filter through the extensive database of historical and cultural sites.

### 3. Auto-Discovery Trails
Generate a route connecting all significant sites within a category with a single click. Select a category (e.g., *Historic Sites*) and use the **"Route Through All"** button to instantly plan a comprehensive discovery tour.

### 4. Temporal Map Layers
Toggle between a modern **OpenStreetMap** basemap and a high-resolution **Historical Layer** (OpenHistoricalMap) to see how the city has changed over time.

### 5. Interactive Data Overlays
- **Points of Interest**: Categorized markers for museums, historical landmarks, transportation hubs, and more.
- **Industrial Sites**: Polygons highlighting the city's rich industrial backbone.
- **Settlements**: Visualizing residential expansion and historical building zones.

---

## 🛠️ How to Use

### Finding a Route
1. Navigate to the **"Get Directions"** section in the sidebar.
2. Click on **"Select start point..."** and type the name of your starting location.
3. Select your destination in the **"To:"** field.
4. Click **"Get Directions"**. The map will automatically zoom to show the calculated yellow path following the roads.
5. Use **"Clear Route"** to reset the map.

### Filtering the Map
1. Use the **"Filter by Category"** dropdown at the top of the sidebar.
2. Selecting a category will hide all unrelated markers on the map.
3. Use the **Layers Control** (top-right of the map) to toggle between Modern and Historical basemaps, or to turn off specific data overlays like "Industrial Sites."

### Generating Category Trails
1. Select a category from the filter (e.g., *Cultural Sites*).
2. A green **"Route Through All [Category]"** button will appear.
3. Click it to generate a continuous path connecting the top 10 most significant sites in that domain.

---

## 📦 Tech Stack
- **React 19** & **Vite**
- **Leaflet** & **React-Leaflet**
- **OSRM API** for road-network routing
- **GeoJSON** for spatial data management
- **Vanilla CSS** for responsive design
