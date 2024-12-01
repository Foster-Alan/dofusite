import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WeaponList from './components/WeaponList'; // Componente de Armas
import ArchList from './components/ArchList'; // Componente de Montarias

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/armas" element={<WeaponList />} />
          <Route path="/archs" element={<ArchList />} />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
