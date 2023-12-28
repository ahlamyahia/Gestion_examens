import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useParams, useNavigate } from 'react-router-dom';
const SallesEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    capacite: '',
    nombresSurveillant: '',
  });

  useEffect(() => {
    getSalles();
  }, []);

  const getSalles = () => {
    axios
      .get(`http://localhost:8000/api/salles/${id}`)
      .then((res) => {
        setForm(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateSalles = (e) => {
    e.preventDefault(); 
    axios
      .put(`http://localhost:8000/api/salles/${id}`, form)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Salle  modifiée!',
        });
        navigate('/dashboard/salles');
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Modifier une salle</h3>
            </div>
            <div className="card-body">
              <form onSubmit={updateSalles}>
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
                  <label htmlFor="capacite" className="col-md-4 col-form-label text-md-right mb-2">
                    Capacité
                  </label>
                  <div className="col-md-6">
                    <input
                      id="capacite"
                      name="capacite"
                      value={form.capacite}
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                    /></div>
               <label htmlFor="nombresSurveillant" className="col-md-4 col-form-label text-md-right mb-2">
               nombresSurveillant
                  </label>
                  <div className="col-md-6">
                    <input
                      id="nombresSurveillant"
                      name="nombresSurveillant"
                      value={form.nombresSurveillant}
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                    /></div>
                </div>
              
                <div className="form-group row mb-0 mt-4">
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary mr-2">
                      Modifier
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

export default SallesEdit;
