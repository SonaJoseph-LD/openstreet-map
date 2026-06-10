import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Legend from './components/Legend';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="map-wrapper">
        <Map />
        <Legend />
      </main>
    </div>
  );
}

export default App;
