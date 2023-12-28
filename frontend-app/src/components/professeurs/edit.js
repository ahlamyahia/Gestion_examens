import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const ProfesseursEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    professeur: '',
    grade: '',
    cin: '',
    telephone: '',
  });

  useEffect(() => {
    getProfesseurs();
  }, []);

  const getProfesseurs = () => {
    axios
      .get(`http://localhost:8000/api/professeurs/${id}`)
      .then((res) => {
        setForm(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  const updateProfesseurs = (e) => {
    e.preventDefault(); 
    axios
      .put(`http://localhost:8000/api/professeurs/${id}`,form) 
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Professeur modifié!',
        });
        navigate('/dashboard/professeurs');
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value }); // Utilisez e.target.id ici
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Modifier un professeur</h3>
            </div>
            <div className="card-body">
              <form onSubmit={updateProfesseurs}>
                <div className="form-group row">
                <label htmlFor="professeur" className="col-md-4 col-form-label text-md-right mb-2">
  NOM
</label>
<div className="col-md-6">
  <input
    id="professeur"
    name="professeur"
    value={form.professeur}
    type="text"
    className="form-control"
    onChange={handleInputChange}
  />
</div>
                  <label htmlFor="grade" className="col-md-4 col-form-label text-md-right mb-2">
                    Grade
                  </label>
                  <div className="col-md-6">
                    <input
                      id="grade"
                      name="grade"
                      value={form.grade}
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                    /></div>
               <label htmlFor="cin" className="col-md-4 col-form-label text-md-right mb-2">
               CIN
                  </label>
                  <div className="col-md-6">
                    <input
                      id="cin"
                      name="cin"
                      value={form.cin}
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                    /></div>
                   <label htmlFor="telephone" className="col-md-4 col-form-label text-md-right mb-2">
  Téléphone
</label>
<div className="col-md-6">
  <input
    id="telephone"
    name="telephone"
    value={form.telephone}
    type="text"
    className="form-control"
    onChange={handleInputChange}
  />
</div>
                </div>
            
                <div className="form-group row mb-0 mt-4">
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary mr-2">
                      Modifier
                    </button>
                    <Link to="/dashboard/professeurs" className="btn2 btn btn-primary">
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

export default ProfesseursEdit;
