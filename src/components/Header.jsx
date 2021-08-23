import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import '../styles/header.css';

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setTheme(!theme);
  };

  return (
    <div className="Header">
      <h1>React Hooks</h1>
      <button className="button" type="button" onClick={() => handleClick()}>
        {theme ? 'Dark Mode' : 'Light Mode'}
      </button>
    </div>
  );
};

export default Header;
