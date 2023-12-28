import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import qs from 'query-string';


const FilieresList = () => {
  const [filieres, setFilieres] = useState({});
  const navigate=useNavigate();
  const [types, setTypes] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getFilieres();
    getTypes();
    getDepartements();
    getProfesseurs();
  }, [search, currentPage]);
  

  const getFilieres = () => {
    const queryString = qs.stringify({
      search: search,
      page: currentPage + 1,
    });
  
    axios.get(`http://localhost:8000/api/filieres?${queryString}`)
      .then(res => {
        console.log(res.data);
        setFilieres(res.data);
        setTotalPages(res.data.meta.last_page);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const getTypes = () => {
    axios.get(`http://localhost:8000/api/filieres/types`)
      .then(res => {
        console.log(res.data); 
        setTypes(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getDepartements = () => {
    axios.get(`http://localhost:8000/api/filieres/departements`)
      .then(res => {
        console.log(res.data); 
        setDepartements(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getProfesseurs = () => {
    axios.get(`http://localhost:8000/api/filieres/professeurs`)
      .then(res => {
        console.log(res.data); 
        setProfesseurs(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteFiliere = (id) => {
    axios.delete(`http://localhost:8000/api/filieres/${id}`)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Filiére suprimée!',
        });
        navigate('/dashboard/filieres');
        getFilieres();
      })
      .catch(error => console.error(error));
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h2>Liste des filières</h2>
      </div>

      <div className="row">
        <div className="card mx-auto">
          <div className="row">
            <nav className="navbar navbar-light bg-light">
              <form>
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
              <Link to="/dashboard/filieres/create" className="btn btn-primary">Ajouter +</Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead className="head">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">NOM</th>
                  <th scope="col">Type</th>
                  <th scope="col">Département</th>
                  <th scope="col">Responsable</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {filieres.data && filieres.data.map((filiere) => (
  <tr key={filiere.id}>
    <th scope="row">#{filiere.id}</th>
    <td>{filiere.name}</td>
    <td>{filiere.type && filiere.type.name}</td>
    <td>{filiere.departement && filiere.departement.name}</td>
    <td>{filiere.professeur && filiere.professeur.professeur}</td> 
    
    <td>
      <a href={`/dashboard/filieres/edit/${filiere.id}`}  className="fas fa-file-edit"></a>
      
      <i 
         className="fas fa-trash"
          onClick={() => deleteFiliere(filiere.id)}
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
          <div className="row mt-2">
            <div className="col-sm-6 offset-5">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilieresList;