import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const FilieresCreate = () => {
  const [types, setTypes] = useState([]);
  const navigate=useNavigate();
  const [departements, setDepartements] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type_id: "",
    departement_id: "",
    professeur_id: "",
  });

  useEffect(() => {
    getTypes();
    getDepartements();
    getProfesseurs();
  }, []);

  const getTypes = () => {
    axios.get("http://localhost:8000/api/filieres/types")
      .then(res => setTypes(res.data))
      .catch(error => console.error(error));
  };

  const getDepartements = () => {
    axios.get("http://localhost:8000/api/filieres/departements")
      .then(res => setDepartements(res.data))
      .catch(error => console.error(error));
  };

  const getProfesseurs = () => {
    axios.get("http://localhost:8000/api/filieres/professeurs")
      .then(res => setProfesseurs(res.data))
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const storeFiliere = (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log("Form data:", form);
    if (form.name && form.type_id && form.departement_id && form.professeur_id) {
      axios.post("http://localhost:8000/api/filieres/", form)
        .then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Filiére ajouté!',
              });
              navigate('/dashboard/filieres');
        })
        .catch(error => console.error(error));
    } else {
      alert("Veuillez remplir tous les champs du formulaire");
    }
  };
  
  
  
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>Ajouter une Filiere</h2>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); storeFiliere(); }} >
                <div className="form-group row">
                  <label htmlFor="name" className="col-md-4 col-form-label text-md-right mb-2">NOM</label>
                  <div className="col-md-6">
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="type_id" className="col-md-4 col-form-label text-md-right mb-2">Type</label>
                  <div className="col-md-6">
                    <select
                      id="type_id"
                      name="type_id"
                      value={form.type_id}
                      onChange={handleInputChange}
                      className="form-control"
                    > <option>selectionner une type</option>
                      {types.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="departement_id" className="col-md-4 col-form-label text-md-right mb-2">Departement</label>
                  <div className="col-md-6">
                    <select
                      id="departement_id"
                      name="departement_id"
                      value={form.departement_id}
                      onChange={handleInputChange}
                      className="form-control"
                    > <option>selectionner une departement</option>
                      {departements.map(departement => (
                        <option key={departement.id} value={departement.id}>{departement.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="professeur_id" className="col-md-4 col-form-label text-md-right mb-2">
                    Responsable
                  </label>
                  <div className="col-md-6">
                    <select
                      id="professeur_id"
                      name="professeur_id"
                      value={form.professeur_id}
                      onChange={handleInputChange}
                      className="form-control"
                    
                    >
                      <option>selectionner une responsable</option>
                      {professeurs.map((professeur) => (
                         <option key={professeur.id} value={professeur.id}>{professeur.professeur} </option>))}
                    </select>
                  </div>
                </div>
                
                    
                <div className="form-group row mb-0 mt-4">
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary mr-2">Ajouter</button>
            
                    <a href="/dashboard/filieres" className="btn2 btn btn-primary">Quitter</a>
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

export default FilieresCreate;