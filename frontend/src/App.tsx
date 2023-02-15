import React from 'react';
import './App.scss';
import PageAuth from "./pages/PageAuth/PageAuth";
import {Route, Routes} from "react-router-dom";
import PageHome from "./pages/PageHome/PageHome";

function App() {
  return (
    <div className="App" data-testid="App">
        <Routes>
            <Route path={'/auth'} element={<PageAuth/>} />
            <Route path={'/home'} element={<PageHome/>} />
        </Routes>
    </div>
  );
}

export default App;
