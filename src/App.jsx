import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Legend from './components/Legend';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="app-container">
      <Sidebar 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <main className="map-wrapper">
        <Map selectedCategory={selectedCategory} />
        <Legend />
      </main>
    </div>
  );
}

export default App;
