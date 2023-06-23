import React from 'react';
import './App.scss';
import './styles/Pagination.scss';
import PageAuth from "./pages/PageAuth/PageAuth";
import {Route, Routes, useNavigate} from "react-router-dom";
import PageHome from "./pages/PageHome/PageHome";
import PageGrants from "./pages/PageGrants/PageGrants";
import PageVacancies from "./pages/PageVacancies/PageVacancies";
import PageInternships from "./pages/PageInternships/PageInternships";
import PageCompetition from "./pages/PageCompetition/PageCompetition";
import PagePost from "./pages/PagePost/PagePost";

function App() {

    return (
        <div className="App" data-testid="App">
            <Routes>
                <Route path={'/'} element={<PageAuth/>}/>
                <Route path={'/home'} element={<PageHome/>}/>
                <Route path={'/grants'} element={<PageGrants/>}/>
                <Route path={'/competitions'} element={<PageCompetition/>}/>
                <Route path={'/post'} element={<PagePost/>}/>
                {/*<Route path={'/vacancies'} element={<PageVacancies/>}/>*/}
                {/*<Route path={'/internships'} element={<PageInternships/>}/>*/}

            </Routes>

        </div>
    );
}

export default App;
