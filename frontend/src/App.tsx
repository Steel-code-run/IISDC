import React from 'react';
import './App.css';
import Search from "./components/UI/Search/Search";

function App() {
  return (
    <div className="App" data-testid="App">
      <Search list={['информационные технологии', 'гуманитарные науки', 'архитектура','гуманитарные науки', 'архитектура','экономика', 'агрономия', 'математика']}/>

    </div>
  );
}

export default App;
