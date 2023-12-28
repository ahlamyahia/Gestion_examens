import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { Helmet } from 'react-helmet';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import EtudiantsEdit from "./components/etudiants/edit";
import EtudiantsCreate from "./components/etudiants/create";
import EtudiantsList from "./components/etudiants/index";

import SallesList from "./components/salles/index";
import SallesEdit from "./components/salles/edit";
import SallesCreate from "./components/salles/create";
import FilieresList from "./components/filieres/index";
import FilieresCreate from "./components/filieres/create";
import FilieresEdit from "./components/filieres/edit";


import ExamensList from './components/examens/index';
import ExamenCreate from './components/examens/create';
import ExamenEdit from './components/examens/edit';

import ProfesseursList from "./components/professeurs/index";
import ProfesseursCreate from "./components/professeurs/create";
import ProfesseursEdit from "./components/professeurs/edit";
import SidBar from "./components/sidBar/SidBar";
import ProtectedRoutes from './routes/ProtectedRoutes';
import Login from './components/login/Login';
import RequireAuth from './components/login/RequireAuth';



function App() {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route element={<RequireAuth/>}>
          <Route path='/dashboard' element={<ProtectedRoutes />}>
            <Route path="etudiant/create" element={<EtudiantsCreate />} />
            <Route path="etudiant/edit/:id" element={<EtudiantsEdit />} />

            <Route path="etudiantList" element={<EtudiantsList />} />
            <Route path="salles" element={<SallesList />} />
            <Route path="professeurs" element={<ProfesseursList />} />
            <Route path="salles/edit/:id" element={<SallesEdit />} />
            
            <Route path="salles/create" element={<SallesCreate />} />
            <Route path="professeurs/create" element={<ProfesseursCreate />} />
            <Route path="professeurs/edit/:id" element={<ProfesseursEdit />} />
            <Route path="examens" element={<ExamensList />} />
            <Route path="examens/create" element={<ExamenCreate />} />
            <Route path="examens/edit/:id" element={<ExamenEdit />} />
            <Route path="filieres" element={<FilieresList />} />
            <Route path="filieres/create" element={<FilieresCreate />} />
            <Route path="filieres/edit/:id" element={<FilieresEdit />} />
          </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
