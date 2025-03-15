import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import Diagnosis from './pages/Diagnosis';
import Evolution from './pages/Evolution';
import AISuggestions from './pages/AISuggestions';
import EditData from './pages/EditData';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import BusinessMap from './pages/BusinessMap';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de registo sem sidebar */}
        <Route path="/" element={<Registration />} />
        
        {/* Rotas com sidebar */}
        <Route element={<Layout />}>
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/evolution" element={<Evolution />} />
          <Route path="/ai-suggestions" element={<AISuggestions />} />
          <Route path="/edit-data" element={<EditData />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/business-map" element={<BusinessMap />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 