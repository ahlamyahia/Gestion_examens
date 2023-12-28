
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const EtudiantEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filieres, setFilieres] = useState([]);
  const [form, setForm] = useState({
    num_apogee: '',
    cne: '',
    nom: '',
    prenom: '',
    date_naissance: '',
    cin: '',
    filiere_id: '',
  });

  useEffect(() => {
    getFilieres();
    getEtudiants();
  }, []);

  const getFilieres = () => {
    axios.get('http://localhost:8000/api/etudiants/filieres')
      .then((res) => {
        setFilieres(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getEtudiants = () => {
    axios.get(`http://localhost:8000/api/etudiants/${id}`)
      .then((res) => {
        const formData = res.data.data;
        setForm({
          num_apogee: formData.num_apogee,
          cne: formData.cne,
          nom: formData.nom,
          prenom: formData.prenom,
          date_naissance: new Date(formData.date_naissance),  // Utiliser new Date()
          cin: formData.cin,
          filiere_id: formData.filiere_id,
        });
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  };
  


  const format_date = (value) => {
    if (value) {
      return moment(String(value)).format('YYYYMMDD');
    }
  };
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };


  const updateEtudiants = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/etudiants/${id}`, {
        num_apogee: form.num_apogee,
        cne: form.cne,
        nom: form.nom,
        prenom: form.prenom,
        date_naissance: format_date(form.date_naissance),
        cin: form.cin,
        filiere_id: form.filiere_id,
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Etudiant modifié!',
        });
       navigate('/dashboard/etudiantList');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  const handleDateChange = (date) => {
    setForm({ ...form, date_naissance: date });
  };

  const handleFiliereChange = (e) => {
    setForm({ ...form, filiere_id: e.target.value });
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>Modifier un étudiant</h2>
            </div>

            <div className="card-body">
              <form onSubmit={updateEtudiants}>
                <div className="form-group row">
                  <label htmlFor="date_naissance" className="col-md-4 col-form-label text-md-right mb-2">
                    Date-naissance
                  </label>
                  <div className="col-md-6">
                    <DatePicker
                      selected={form.date_naissance}
                      onChange={handleDateChange}
                      className="form-control"
                    />
                  </div>
                  <label htmlFor="num_apogee" className="col-md-4 col-form-label text-md-right mb-2">
 Num_Appoge
</label>
<div className="col-md-6">
            <input
              id="num_apogee"
              name="num_apogee"
              value={form.num_apogee}
              type="text"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="cne" className="col-md-4 col-form-label text-md-right mb-2">
 CNE
</label>
<div className="col-md-6">
            <input
              id="cne"
              name="cne"
              value={form.cne}
              type="text"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor="nom" className="col-md-4 col-form-label text-md-right mb-2">
  NOM
</label>
<div className="col-md-6">
            <input
              id="nom"
              name="nom"
              value={form.nom}
              type="text"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="prenom" className="col-md-4 col-form-label text-md-right mb-2">
  Prenom
</label>
<div className="col-md-6">
            <input
              id="prenom"
              name="prenom"
              value={form.prenom}
              type="text"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

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
            />
          </div>
          <div className="form-group row">
  <label htmlFor="filiere_id" className="col-md-4 col-form-label text-md-right mb-2">Filiere</label>
  <div className="col-md-6">
    <select
      id="filiere_id"
      name="filiere_id"
      value={form.filiere_id}
      onChange={handleFiliereChange}
      className="form-control"
    >    <option>Selectionner une filiere </option>
      {filieres.map((filiere) => (
        <option key={filiere.id} value={filiere.id}>{filiere.name}</option>
      ))}
    </select>
  </div>
</div>
<div className="form-group row mb-0 mt-4">
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary mr-2">
                    Modifier
                    </button>
                    <Link to="/dashboard/etudiantList" className="btn2 btn btn-primary">
                      Quitter
                    </Link>
                  </div>
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

export default EtudiantEdit;