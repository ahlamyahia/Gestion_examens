import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

const ExamensList = () => {
  const [examens, setExamens] = useState({});
  const [salles, setSalles] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [search, setSearch] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    getExamens();
    getSalles();
    getProfesseurs();
  },[search, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1); // La pagination commence souvent à 0, alors ajoutez 1
  };

  const getExamens = () => {
    axios.get('http://localhost:8000/api/examens', { params: { search, page: currentPage } })
      .then(res => {
        setExamens(res.data);
        setTotalPages(res.data.meta.last_page);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const getSalles = () => {
    axios.get('http://localhost:8000/api/examens/salles')
      .then(res => {
        setSalles(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getProfesseurs = () => {
    axios.get('http://localhost:8000/api/examens/professeurs')
      .then(res => {
        setProfesseurs(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteExamen = (id) => {
    axios.delete(`http://localhost:8000/api/examens/${id}`)
      .then(res => {
        // show success message
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Examen supprimé!',
          });
        getExamens();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const saveExcelExamen = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post('http://localhost:8000/api/examens/import_excel', formData);
      console.log(response.data); 
      getExamens();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Fichier importé",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Erreur lors de l\'importation du fichier Excel :', error);
    }
  };
  
  return (
    <div className="container">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h2>Liste des examens</h2>
      </div>
      <div className="card-header">
        <form id="mainFormExamens" onSubmit={saveExcelExamen}>
          <div className="form-group">
            <table className="table">
              <tr>
                <label className="btn btn-success" style={{ margin: '5px' }}>
                  Sélectionner un fichier
                  <input style={{ display: 'none' }} type="file" name="select_examens_file" />
                </label>
                <button type="submit" className="btn btn-primary">
                  Importer
                </button>
              </tr>
            </table>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="card mx-auto">
          <div className="row">
            <nav className="navbar navbar-light bg-light">
              <form className="nv">
                <input
                  className="form-control mb-2"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher"
                  aria-label="search"
                />
              </form>
            </nav>
            <div className="d-flex justify-content-end">
              <Link to= "/dashboard/examens/create" className="btn btn-primary">Ajouter +</Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead className="head">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">Jour</th>
                  <th scope="col">Heure</th>
                  <th scope="col">Salle</th>
                  <th scope="col">Professeur</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {examens.data && examens.data.map(examen => (
                  <tr key={examen.id}>
                    <th scope="row">#{examen.id}</th>
                    <td>{examen.jour}</td>
                    <td>{examen.heure}</td>
                    <td>{examen.salle.name}</td>
                    <td>{examen.professeur.professeur}</td>
                    <td>
                      <Link to={`/dashboard/examens/edit/${examen.id}`}  className="fas fa-file-edit" />
                     
                      <i 
                  className="fas fa-trash"
                onClick={() => deleteExamen(examen.id)} 
                style={{ cursor: "pointer", color: "red" }}  
              ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row mt-2">
            <div className="col-sm-6 offset-5">
            <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
            </div>
          </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ExamensList;
