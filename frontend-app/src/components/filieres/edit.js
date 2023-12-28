import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const FilieresEdit = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [form, setForm] = useState({
    name: '',
    type_id: '',
    departement_id: '',
    professeur_id: '',
  });
  const [types, setTypes] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    getFilieres();
    getTypes();
    getDepartements();
    getProfesseurs();
  }, []);

  const getFilieres = () => {
    axios
      .get(`http://localhost:8000/api/filieres/${id}`)
      .then((res) => {
        setForm(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const getTypes = async () => {
    try {
      const typesData = await axios.get(`http://localhost:8000/api/filieres/types`);
      setTypes(typesData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDepartements = async () => {
    try {
      const departementsData = await axios.get(`http://localhost:8000/api/filieres/departements`);
      setDepartements(departementsData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfesseurs = async () => {
    try {
      const professeursData = await axios.get(`http://localhost:8000/api/professeurs`);
      setProfesseurs(professeursData.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateFilieres = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/filieres/${id}`, form);
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Filiére ajouté!',
      });
      navigate('/dashboard/filieres');
    } catch (error) {
      console.error(error);
    }
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
              <h3>Modifier une filiere</h3>
            </div>

            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); updateFilieres(); }}>
                <div className="form-group row">
                  <label htmlFor="name" className="col-md-4 col-form-label text-md-right mb-2">
                    Nom
                  </label>
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
                  <label htmlFor="type_id" className="col-md-4 col-form-label text-md-right mb-2">
                    Type
                  </label>
                  <div className="col-md-6">
                    <select
                      value={form.type_id }
                      name="type_id"
                      id="type_id"
                      className="form-control"
                      onChange={handleInputChange}
                      aria-label="Select type"
                    >
                      {types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                      
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="department_id" className="col-md-4 col-form-label text-md-right mb-2">
                    Departement
                  </label>
                  <div className="col-md-6">
                    <select
                      value={form.departement_id}
                      id="departement_id"
                      name="departement_id"
                      className="form-control"
                      onChange={handleInputChange}
                    >
                      {departements.map((departement) => (
                        <option key={departement.id} value={departement.id}>
                          {departement.name}
                        </option>
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
                      value={form.professeur_id}
                      name="professeur_id"
                      id="professeur_id"
                      className="form-control"
                      onChange={handleInputChange}
                    >
                      { professeurs.map((professeur) => (
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
                    <Link to="/dashboard/filieres" className="btn2 btn btn-primary">
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

export default FilieresEdit;