import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
const SallesCreate = () => {
  const [form, setForm] = useState({
    name: '',
    capacite: '',
    nombresSurveillant: '',
  });
  const navigate = useNavigate();

  const storeSalle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/salles', {
        name: form.name,
        capacite: form.capacite,
        nombresSurveillant: form.nombresSurveillant,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Salle  crée!',
        });
        navigate('/dashboard/salles');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h3>Ajouter une salle</h3>
          </div>
          <div className="card-body">
                <form onSubmit={storeSalle}>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right mb-2">
                      NOM
                    </label>
                    <div className="col-md-6">
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        type="text"
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="capacite" className="col-md-4 col-form-label text-md-right mb-2">
                      CapaciteEtudiant
                    </label>
                    <div className="col-md-6">
                      <input
                        id="capacite"
                        name="capacite"
                        value={form.capacite}
                        type="text"
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="nombresSurveillant"
                      className="col-md-4 col-form-label text-md-right mb-2"
                    >
                      NombreSurveillant
                    </label>
                    <div className="col-md-6">
                      <input
                        id="nombresSurveillant"
                        name="nombresSurveillant"
                        value={form.nombresSurveillant}
                        type="text"
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-0 mt-4">
  <div className="col-md-6 offset-md-4 mb-2">
    <button type="submit" className="btn btn-primary mr-2">
      Ajouter
    </button>
    <Link to="/dashboard/salles" className="btn2 btn btn-primary">
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

export default SallesCreate;
