import React, {useEffect, useState } from 'react';
import '../../css/Table.css'; // Import custom CSS file for styling
import axios from 'axios';
const TableWithData = ({ data: initialData, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    fetch('http://localhost:8000/api/getFacture')
      .then(response => response.json())
      .then(data => setData(data.donnees))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const deleteFacture = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteFacture/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete Invoice:', error);
      throw error;
    }
  };
  const handleDeleteRow = async () => {
    try {
      await deleteFacture(rowToDelete.id); 
      setData(data.filter(item => item.id !== rowToDelete.id)); 
      setRowToDelete(null); 
    } catch (error) {
      console.error('Failed to delete Invoice:', error);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleShowModal = (rowData) => {
    setSelectedRow(rowData);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  // const handleDeleteRow = () => {
  //   // Implémentez la logique de suppression ici, par exemple:
  //   setData(data.filter(item => item !== rowToDelete));
  //   setRowToDelete(null); // Fermer le modal après suppression
  // };
  
  const handleShowDeleteModal = (item) => {
    setRowToDelete(item);
  };  

  const renderDeleteConfirmationModal = () => {
    if (!rowToDelete) return null;
  
    return (
      <div className="modal-delete">
        <div className="modal-content">
          <span className="close" onClick={() => setRowToDelete(null)}>&times;</span>
          <h2>Confirmation de suppression</h2>
          <p>Voulez-vous vraiment supprimer cette facture {rowToDelete.column1}?</p>
          <div className='btns' style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className='btn-delete' onClick={handleDeleteRow} style={{ marginRight: '10px'}}>Supprimer</button>
            <button onClick={() => setRowToDelete(null)}>Annuler</button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderTableData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item, index) => (
      <tr key={startIndex + index}>
        <td>{item.NumFacture}</td>
        <td>{item.client.NomClient}</td>
        <td>{item.bon_livraison.NumBonLiv}</td>
        <td>{item.bon_livraison.TypeValidation}</td>
        <td>{item.ModeReg}</td>
        <td>
          <div className='actions'>
            <span class="tooltip">
              <svg onClick={() => handleShowModal(item)}  xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><g fill="none"><rect width={28} height={28} x={2} y={2} fill="#00a6ed" rx={4}></rect><path fill="#fff" d="M16 9.971a1.978 1.978 0 1 0 0-3.956a1.978 1.978 0 0 0 0 3.956m1.61 3.747a1.75 1.75 0 1 0-3.5 0v10.59a1.75 1.75 0 1 0 3.5 0z"></path></g></svg>
              <span class="tooltiptext">Plus d'infos</span>
            </span>
            <span class="tooltip">
              <svg onClick={() => handleShowDeleteModal(item)}  xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#00a6ed" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m5 5h-2.5l-1-1h-3l-1 1H7v2h10zM9 18h6a1 1 0 0 0 1-1v-7H8v7a1 1 0 0 0 1 1"></path></svg>
              <span class="tooltiptext">Supprimer</span>
            </span>
          </div>
        </td>
      </tr>
    ));
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
          <button className="page-link" onClick={() => handleChangePage(i)}>{i}</button>
        </li>
      );
    }

    const previousButton = (
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handleChangePage(currentPage - 1)}>Previous</button>
      </li>
    );

    const nextButton = (
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handleChangePage(currentPage + 1)}>Next</button>
      </li>
    );

    return (
      <nav>
        <ul className="pagination">
          {previousButton}
          {pages}
          {nextButton}
        </ul>
      </nav>
    );
  };
  

  const renderModal = () => {
    if (!selectedRow) return null;

    return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <h2>Details</h2>
        <div className='modal-items'>
          <div className="modal-item">
            <p>Nº de Facture: <span className="facture">{selectedRow.NumFacture}</span></p>
          </div>
          <div className="modal-item">
            <p>Nom Client: <span className="client">{selectedRow.client.NomClient}</span></p>
          </div>
          <div className="modal-item">
            <p>Nº Bon de livraison: <span className="bon">{selectedRow.bon_livraison.NumBonLiv}</span></p>
          </div>
          <div className="modal-item">
            <p>Type de validation: <span className="validation">{selectedRow.bon_livraison.TypeValidation}</span></p>
          </div>
          <div className="modal-item">
            <p>Date de Bon Livraison: <span className="validation">{selectedRow.bon_livraison.dateBonLiv}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.ModeReg}</span></p>
          </div>
          <div className="modal-item">
            <p>Date de Facture: <span className="reglement">{selectedRow.DateFacture}</span></p>
          </div>
          <div className="modal-item">
            <p>Montant HT: <span className="reglement">{selectedRow.MontantHT}</span></p>
          </div>
          <div className="modal-item">
            <p>Taux: <span className="reglement">{selectedRow.Taux}</span></p>
          </div>
          <div className="modal-item">
            <p>TVA: <span className="reglement">{selectedRow.TVA}</span></p>
          </div>
          <div className="modal-item">
            <p>Montant TTC: <span className="reglement">{selectedRow.MontantTTC}</span></p>
          </div>
          <div className="modal-item">
            <p>Type de Contrat: <span className="reglement">{selectedRow.TypeContrat}</span></p>
          </div>
          <div className="modal-item">
            <p>EtabliPar: <span className="reglement">{selectedRow.EtabliPar}</span></p>
          </div>
          <div className="modal-item">
            <p>EtaPayement: <span className="reglement">{selectedRow.EtaPayement}</span></p>
          </div>
          <div className="modal-item">
              <p>Numero de Cheque: <span className="reglement">{selectedRow?.cheque?.NumCheque ?? 'null'}</span></p>
          </div>
          <div className="modal-item">
              <p>Numero de Remise: <span className="reglement">{selectedRow?.remise?.NumRemise ?? 'null'}</span></p>
          </div>
          <div className="modal-item">
              <p>Montant Encaissé: <span className="reglement">{selectedRow?.remise?.MontantEnc ?? 'null'}</span></p>
          </div>
        </div>

      </div>
    </div>
    );
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Nº de Facture</th>
            <th>Nom Client</th>
            <th>Nº Bon de livraison</th>
            <th>Type de validation</th>
            <th>Mode de Règlement</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
      {renderPagination()}
      {renderModal()}
      {renderDeleteConfirmationModal()}
    </div>
  );
};

export default TableWithData;
