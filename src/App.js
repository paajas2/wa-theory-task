import React from 'react';
import Gallery from './components/Gallery';
import './css/App.css';

function App() {
  return (
    <div className="app">
      <div className="title-container">
        <h1>Dog Gallery</h1>
        <h2>Thank you for the course!</h2>
      </div>
      <Gallery />
    </div>
  );
}

export default App;
