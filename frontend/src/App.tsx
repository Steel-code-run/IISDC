import React from 'react';
import './App.css';
import Search from "./components/UI/Search/Search";

function App() {
  return (
    <div className="App" data-testid="App">
      <Search list={['testtesttesttesttesttesttesttesttesttesttesttesttest', 'testtesttest', 'asdasd', 'rrrrra']}/>

    </div>
  );
}

export default App;
