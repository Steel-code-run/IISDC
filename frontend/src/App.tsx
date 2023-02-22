import React from 'react';
import './App.scss';
import PageAuth from "./pages/PageAuth/PageAuth";
import {Route, Routes, useNavigate} from "react-router-dom";
import PageHome from "./pages/PageHome/PageHome";
import PageGrants from "./pages/PageGrants/PageGrants";
import PageVacancies from "./pages/PageVacancies/PageVacancies";
import PageInternships from "./pages/PageInternships/PageInternships";
import PageCompetition from "./pages/PageCompetition/PageCompetition";

function App() {
    const navigate = useNavigate()
    React.useEffect(() => {
        (window.localStorage.getItem('token'))
            ? navigate('/home')
            : navigate('/auth')
    }, [])

    return (
        <div className="App" data-testid="App">
            <Routes>
                <Route path={'/auth'} element={<PageAuth/>}/>
                <Route path={'/home'} element={<PageHome/>}/>
                <Route path={'/grants'} element={<PageGrants/>}/>
                <Route path={'/vacancies'} element={<PageVacancies/>}/>
                <Route path={'/internships'} element={<PageInternships/>}/>
                <Route path={'/competitions'} element={<PageCompetition/>}/>

            </Routes>

        </div>
    );
}

export default App;
