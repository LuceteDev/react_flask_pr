import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="main-header">
      <div className="background-container">
        <img
          src="/imges/wine_images/wine.jpg"
          alt="Wine img"
          className="header-image"
        />
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <div className={`menu_area ${isOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/story">Story</Link>
            </li>
            <li>
              <Link to="/wines">Wines</Link>
            </li>
            <li>
              <Link to="/board">Board</Link>
            </li>
          </ul>
        </div>
        <div className="main-text">
          <h1>WINE</h1>
          <h2>신이 인간에게 준 최고의 선물 "와인"</h2>
          <p>God's best gift "wine"</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
