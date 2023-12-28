import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

const SallesList = () => {
  const [salles, setSalles] = useState([]);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    getSalles();
  }, [search, currentPage]);
  
  const getSalles = () => {
    const queryString = qs.stringify({
      search: search,
      page: currentPage + 1,
    });
  
    axios.get(`http://localhost:8000/api/salles?${queryString}`)
      .then(res => {
        console.log(res.data.data);
        setSalles(res.data.data);
        setTotalPages(res.data.meta.last_page);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  

  const deleteSalle = (id) => {
    axios.delete(`http://localhost:8000/api/salles/${id}`)
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Salle supprimée!',
        });
        getSalles();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    
    <div className="container">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h2>Liste des salles</h2>
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
              <Link to="/dashboard/salles/create" className="btn btn-primary">Ajouter +</Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead className="head">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">NOM</th>
                  <th scope="col">CapaciteEtudiant</th>
                  <th scope="col">NombreSurveillant</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {salles.map((salle) => (
                  <tr key={salle.id}>
                    <th scope="row">#{salle.id}</th>
                    <td>{salle.name}</td>
                    <td>{salle.capacite}</td>
                    <td>{salle.nombresSurveillant}</td>
                    <td>
                    <Link to={`/dashboard/salles/edit/${salle.id}`} className="fas fa-file-edit"></Link>

                 
                  <i 
                  className="fas fa-trash"
                onClick={() => deleteSalle(salle.id)}
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

export default SallesList;