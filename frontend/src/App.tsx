import React from 'react';
import './App.scss';
import PageAuth from "./pages/PageAuth/PageAuth";
import {Route, Routes, useNavigate} from "react-router-dom";
import PageHome from "./pages/PageHome/PageHome";

function App() {
    const navigate = useNavigate()
    React.useEffect(() => {
        (window.localStorage.getItem('token'))
            ? navigate('/home')
            : navigate('/auth')
    },[])

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
