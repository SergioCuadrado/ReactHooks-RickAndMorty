import React, { useContext } from 'react';
import Characters from './components/Characters';
import Header from './components/Header';

import './App.css';
import ThemeContext from './context/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  let backgroundColor = theme ? 'backgroundDark' : 'backgroundLight';

  return (
    <div className={`App ${backgroundColor}`}>
      <Header />
      <Characters />
    </div>
  );
}

export default App;
