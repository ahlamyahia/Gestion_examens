import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate ,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const ExamenEdit  = () => {
    const { id } = useParams();
  const [form, setForm] = useState({
    jour: '',
    heure: '',
    salle_id: '',
    professeur_id: '',
  });
const Navigate=useNavigate();
  const [salles, setSalles] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    getExamens();
    getSalles();
    getProfesseurs();
  }, []);

  const getExamens = () => {
    axios
      .get(`http://localhost:8000/api/examens/${id}`)
      .then((res) => {
        setForm(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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


    const handleInputChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const updateExamens = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/examens/${id}`, {
        jour: form.jour,
        heure: form.heure,
        salle_id: form.salle_id,
        professeur_id: form.professeur_id,
      })
      .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Examen modifié!',
          });
        Navigate('/dashboard/examens')
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
              <h3>Modifier</h3>
            </div>
            <div className="card-body">
              <form onSubmit={updateExamens}>
                <div className="form-group row">
                  <label htmlFor="jour" className="col-md-4 col-form-label text-md-right mb-2">
                    Jour
                  </label>
                  <div className="col-md-6">
                    <input
                      id="jour"
                      name="jour"
                      value={form.jour}
                      onChange={handleInputChange}
                      type="text"
                      className="form-control"
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
                      name="heure"
                      value={form.heure}
                      onChange={handleInputChange}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="salle" className="col-md-4 col-form-label text-md-right mb-2">
                    Salle
                  </label>
                  <div className="col-md-6">
                    <select
                      id="salle_id"
                      name="salle_id"
                      value={form.salle_id}
                      onChange={handleInputChange}
                      className="form-control"
                      aria-label="Default select example"
                    >
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
                      id="professeur_id"
                      name="professeur_id"
                      value={form.professeur_id}
                      onChange={handleInputChange}
                      className="form-control"
                      aria-label="Default select example"
                    >
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
                      Modifier
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

export default ExamenEdit ;
