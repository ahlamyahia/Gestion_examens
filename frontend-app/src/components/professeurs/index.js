import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';


const ProfesseursList = () => {
  const [Professeurs, setProfesseurs] = useState([]);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getProfesseurs();
  }, [search, currentPage]);
  
  const getProfesseurs = () => {
    const queryString = qs.stringify({
      search: search,
      page: currentPage + 1,
    });
  
    axios.get(`http://localhost:8000/api/professeurs?${queryString}`)
      .then(res => {
        console.log(res.data.data); 
        setProfesseurs(res.data.data);
        setTotalPages(res.data.meta.last_page);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  
    const deleteProfesseur = (id) => {
      axios.delete(`http://localhost:8000/api/professeurs/${id}`)
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Professeur supprimé!',
          });
          getProfesseurs();
        })
        .catch(error => {
          console.log(error);
        });
    };
  return (
    
    <div className="container">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h2>Liste des Professeurs</h2>
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
              <Link to="/dashboard/professeurs/create" className="btn btn-primary">Ajouter +</Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead className="head">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">NOM</th>
                  <th scope="col">Grade</th>
                  <th scope="col">CIN</th>
                  <th scope="col">Telephone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Professeurs.map((Professeur) => (
                  <tr key={Professeur.id}>
                    <th scope="row">#{Professeur.id}</th>
                    <td>{Professeur.professeur}</td>
                    <td>{Professeur.grade}</td>
                    <td>{Professeur.cin}</td>
                    <td>{Professeur.telephone}</td>
                    <td>
                  <Link to={`/dashboard/professeurs/edit/${Professeur.id}`} className="fas fa-file-edit"></Link>
                  <i 
                  className="fas fa-trash"
                onClick={() => deleteProfesseur(Professeur.id)}
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

export default ProfesseursList;