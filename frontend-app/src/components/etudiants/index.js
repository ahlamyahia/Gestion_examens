import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import logo from '../../assets/fstbm-logo.jpeg';

const EtudiantsList = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [search, setSearch] = useState(null);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getEtudiants();
    getFilieres();
  }, [search, selectedFiliere, currentPage]);

  const getEtudiants = () => {
    axios
      .get('http://localhost:8000/api/etudiants', {
        params: {
          search: search,
          filiere_id: selectedFiliere,
          page: currentPage + 1, // Ajoutez 1 pour la pagination
        },
      })
      .then((res) => {
        setEtudiants(res.data);
        setTotalPages(res.data.meta.last_page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFilieres = () => {
    axios
      .get("http://localhost:8000/api/etudiants/filieres")
      .then((res) => {
        setFilieres(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteEtudiant = (id) => {
    axios
      .delete(`http://localhost:8000/api/etudiants/${id}`)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Etudiant supprimé!',
        });
        getEtudiants();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const saveExcelEtudiant = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post('http://localhost:8000/api/etudiants/import_excel', formData);
      console.log(response.data); 
      getEtudiants();
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

  const exporterEnPDF = (etudiant) => {
    const doc = new jsPDF();
    const imgData = logo;


const pdfWidth = doc.internal.pageSize.width;
const pdfHeight = doc.internal.pageSize.height;

// Calculer la position horizontale pour centrer le logo
const logoWidth = 50; // Largeur du logo
const logoX = (pdfWidth - logoWidth) / 2;

doc.addImage(imgData, 'JPEG', logoX, 20, logoWidth, 20); // Centrer le logo horizontalement

doc.setLineWidth(0.5);
doc.setDrawColor(0, 0, 0);
doc.line(10, 45, pdfWidth - 10, 45);

let x = 10;
let y = 50;

doc.setFontSize(16);
doc.setFont('helvetica', 'bold');
doc.setTextColor('#000000');
doc.text('Attestation de scolarité', x + 60, y);
y += 20;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#000000');
    doc.setFontSize(12);
    doc.text(`Le Doyen de la faculté des Sciences et Technique Beni Mellal atteste que l'étudiant ${etudiant.nom} ${etudiant.prenom}`, x, y);
    y += 7;

    doc.text(`Code Nationale de l'Etudiant(CNE): ${etudiant.cne}`, x, y);
    y += 7;

    doc.text(`Numero de carte Nationale(CNIE) : ${etudiant.cin}`, x, y);
    y += 7;

    doc.text(`Numero Appoge : ${etudiant.num_apogee}`, x, y);
    y += 7;

    doc.text(`Né le : ${etudiant.date_naissance}`, x, y);
    y += 7;

    doc.text('est régulièrement inscrit à la faculté des Sciences et Technique de Beni Mellal', x, +y);
    y += 7;
    

    doc.text(`pour l'année universitaire 2022/2023`, x, +y);
    y += 7;
  
    doc.text(`Filière : ${etudiant.filiere.name }`, x, y);
    y += 7;

    doc.text(`Fait à Beni Mellal le ${new Date().toLocaleDateString("fr-FR")}`, pdfWidth / 2, y, { align: 'center' });
    y += 7;
    doc.text('Le Doyen', pdfWidth / 2, y, { align: 'center' });

    doc.save(`${etudiant.nom}-${etudiant.prenom}.pdf`);
  };
  
  
  return (
    
    <div className="container" >
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h2>Liste des etudiants</h2>
      </div>
      <div className="card-header">
      <form id="mainFormExamens" onSubmit={saveExcelEtudiant}>
          <div className="form-group">
          <table className="table">
              <tr>
                <label className="btn btn-success" style={{ margin: '5px' }}>
                  Selectionner un fichier
                  <input style={{ display: 'none' }} type="file" name="select_etudiants_file" />
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
            <nav className="navbar navbar-light bg-light">
              <form>
                <div>
                  <select
                    value={selectedFiliere}
                    name="filiere"
                    className="form-control"
                    aria-label="Default select example"
                    onChange={(e) => setSelectedFiliere(e.target.value)}
                  >
                    <option>Filtrer par filiére</option>
                    {filieres.map((filiere) => (
                      <option key={filiere.id} value={filiere.id}>{filiere.name}</option>
                    ))}
                  </select>
                </div>
              </form>
            </nav>
            <div className="d-flex justify-content-end">
              <Link to="/dashboard/etudiant/create" className="btn btn-primary">Ajouter +</Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">Num_Appoge</th>
                  <th scope="col">CNE</th>
                  <th scope="col">NOM</th>
                  <th scope="col">PRENOM</th>
                  <th scope="col">Date_naissance</th>
                  <th scope="col">CIN</th>
                  <th scope="col">Filiere</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {etudiants.data && etudiants.data.map((etudiant) => (
                  <tr key={etudiant.id}>
                    <th scope="row">#{etudiant.id}</th>
                    <td>{etudiant.num_apogee}</td>
                    <td>{etudiant.cne}</td>
                    <td>{etudiant.nom}</td>
                    <td>{etudiant.prenom}</td>
                    <td>{etudiant.date_naissance}</td>
                    <td>{etudiant.cin}</td>
                    <td>{etudiant.filiere.name }</td>
                    <td>
                      
                    <Link to={`/dashboard/etudiant/edit/${etudiant.id}`} className="fas fa-file-edit"></Link>
                    <i
                className="fas fa-trash"
                onClick={() => deleteEtudiant(etudiant.id)}
                style={{ cursor: "pointer", color: "red" }}  
              ></i>
              <i
                className="fa-solid fa-download"
                onClick={() => exporterEnPDF(etudiant)}
                style={{ cursor: "pointer", color: "grey" }} 
              ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          
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
  );
};

export default EtudiantsList;
