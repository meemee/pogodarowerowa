import React from 'react';
import './App.css';
import CitySearch from './containers/CitySearch';

export default function App () {
    return (
      <div className="App">
        <header className="App-header">
          <CitySearch/>
        </header>
      </div>
    );
}