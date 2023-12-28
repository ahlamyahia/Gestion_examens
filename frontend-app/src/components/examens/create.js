import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const ExamenCreate = () => {
  const navigate = useNavigate();
  const [salles, setSalles] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [form, setForm] = useState({
    jour: '',
    heure: '',
    salle_id: '',
    professeur_id: '',
  });

  useEffect(() => {
    getProfesseurs();
    getSalles();
  }, []);

  const getSalles = () => {
    axios
      .get('http://localhost:8000/api/examens/salles')
      .then((res) => {
        setSalles(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getProfesseurs = () => {
    axios
      .get('http://localhost:8000/api/examens/professeurs')
      .then((res) => {
        setProfesseurs(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSelectChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const storeExamens = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/examens/', {
        jour: form.jour,
        heure: form.heure,
        salle_id: form.salle_id,
        professeur_id: form.professeur_id,
      })
      .then((res) => {
   
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Examen ajouté!',
          });
        navigate('/dashboard/examens'); // Rediriger vers la page des examens après l'ajout
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>Ajouter un examen</h2>
            </div>
            <div className="card-body">
              <form onSubmit={storeExamens}>
                <div className="form-group row">
                  <label htmlFor="jour" className="col-md-4 col-form-label text-md-right mb-2">
                    Jour
                  </label>
                  <div className="col-md-6">
                    <input
                      id="jour"
                      type="text"
                      className="form-control"
                      value={form.jour}
                      onChange={(e) => setForm({ ...form, jour: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="heure" className="col-md-4 col-form-label text-md-right mb-2">
                    Heure
                  </label>
                  <div className="col-md-6">
                    <input
                      id="heure"
                      type="text"
                      className="form-control"
                      value={form.heure}
                      onChange={(e) => setForm({ ...form, heure: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group row">
        <label htmlFor="salle" className="col-md-4 col-form-label text-md-right mb-2">
          Salle
        </label>
        <div className="col-md-6">
          <select
            name="salle_id"
            value={form.salle_id}
            onChange={handleSelectChange}
            className="form-control"
            aria-label="Default select example"
          ><option>Selectionner  </option>
            {salles.map((salle) => (
              <option key={salle.id} value={salle.id}>
                {salle.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="responsable" className="col-md-4 col-form-label text-md-right mb-2">
          Responsable
        </label>
        <div className="col-md-6">
          <select
            name="professeur_id"
            value={form.professeur_id}
            onChange={handleSelectChange}
            className="form-control"
            aria-label="Default select example"
          ><option>Selectionner </option>

            {professeurs.map((professeur) => (
              <option key={professeur.id} value={professeur.id}>
                {professeur.professeur}
              </option>
            ))}
          </select>
        </div>
      </div>
                <div className="form-group row mb-0 mt-4">
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary mr-2">
                      Ajouter
                    </button>
                    <Link to="/dashboard/examens" className="btn2 btn btn-primary">
                      Quitter
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamenCreate;
