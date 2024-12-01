import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Opcional, para adicionar estilos específicos ao Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/armas">Armas</Link>
        </li>
        <li className="navbar-item">
          <Link to="/archs">Arquimonstro</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
