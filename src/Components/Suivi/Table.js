
import React, { useState , useEffect} from 'react';
import axios from '../router/axiosInstance';
import '../../css/Table.css'; 
import { getToken } from '../router/auth';


const TableWithData = ({ data: initialData, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowToUpdate, setSelectedRowToUpdate] = useState(null);
  // const [rowToDelete, setRowToDelete] = useState(null);
  const [data, setData] = useState(initialData);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateAmount, setUpdateAmount] = useState('');
  const [role, setRole] = useState(null); 
  const [error, setError] = useState(null); 
  const [userCanUpdate, setuserCanUpdate] = useState(true);


  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();

        if (token) {
          const response = await axios.get('http://localhost:8000/api/user', {
          });
          setRole(response.data.role);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (role === 'Super Admin' || role === 'Admin') {
      setuserCanUpdate(true);
    } else if (role === 'Utilisateur') {
      setuserCanUpdate(false);
    } else {
      console.error('Unknown role');
    }
  }, [role]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);


  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleShowModal = (rowData) => {
    setSelectedRow(rowData);
    console.log(rowData)
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  // const handleDeleteRow = () => {
  //   // Implémentez la logique de suppression ici, par exemple:
  //   setData(data.filter(item => item !== rowToDelete));
  //   setRowToDelete(null); // Fermer le modal après suppression
  // };
  
  // const handleShowDeleteModal = (item) => {
  //   setRowToDelete(item);
  // };  

  // const renderDeleteConfirmationModal = () => {
  //   if (!rowToDelete) return null;
  
  //   return (
  //     <div className="modal-delete">
  //       <div className="modal-content">
  //         <span className="close" onClick={() => setRowToDelete(null)}>&times;</span>
  //         <h2>Confirmation de suppression</h2>
  //         <p>Voulez-vous vraiment supprimer cette facture {rowToDelete.column1}?</p>
  //         <div className='btns' style={{ textAlign: 'center', marginTop: '20px' }}>
  //           <button className='btn-delete' onClick={handleDeleteRow} style={{ marginRight: '10px'}}>Supprimer</button>
  //           <button onClick={() => setRowToDelete(null)}>Annuler</button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const handleShowUpdateModal = (item) => {
    // setSelectedRow(item); // Définissez la ligne sélectionnée sur l'élément cliqué
    setUpdateAmount(item.MontantEnc); // Initialisez l'input avec le montant actuel
    setUpdateModalVisible(true); // Affichez le modal
    setSelectedRowToUpdate(item);
  };
  
  const handleSaveUpdatedAmount = async () => {
    console.log(selectedRowToUpdate)
    const ItemId=selectedRowToUpdate.id;
    try {
      const updatedData = await axios.patch(`http://localhost:8000/api/factures/${ItemId}`, {
        MontantEnc: updateAmount
      });
  
      // Mettre à jour les données localement pour refléter le changement
      const updatedRows = data.map(item => 
        item.id === selectedRowToUpdate.id ? { ...item, MontantEnc: updateAmount } : item
      );
      setData(updatedRows);
      setUpdateModalVisible(false); // Fermer le modal
    } catch (error) {
      console.error('Failed to update amount', error);
    }
  };

  
  const renderUpdateModal = () => {
    if (!updateModalVisible) return null;
  
    return (
      <div className="modal Update-Modal">
        <div className="modal-content">
          <span className="close" onClick={() => setUpdateModalVisible(false)}>&times;</span>
          <h3>Modifier le Montant :</h3>
          <input
            type="number"
            value={updateAmount}
            onChange={e => setUpdateAmount(e.target.value)}
          />
          <button onClick={handleSaveUpdatedAmount}>Enregistrer</button>
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
        <td>{item.cheque?.NumCheque ?? 'null'}</td>
        <td>{item.remise?.NumRemise ?? 'null'}</td>
        <td>
          <span>{item.MontantEnc}</span>
          {/* {userCanUpdate && (
          <span class="tooltip">
            <svg onClick={() => handleShowUpdateModal(item)} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#78c2ff" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path></svg>
            <span class="tooltiptext">Modifier</span>
          </span>
          )} */}
        </td>
        <td>
          <div className='actions'>
            <span class="tooltip">
              <svg onClick={() => handleShowModal(item)}  xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><g fill="none"><rect width={28} height={28} x={2} y={2} fill="#00a6ed" rx={4}></rect><path fill="#fff" d="M16 9.971a1.978 1.978 0 1 0 0-3.956a1.978 1.978 0 0 0 0 3.956m1.61 3.747a1.75 1.75 0 1 0-3.5 0v10.59a1.75 1.75 0 1 0 3.5 0z"></path></g></svg>
              <span class="tooltiptext">Plus d'infos</span>
            </span>
            {/* <span class="tooltip">
              <svg onClick={() => handleShowDeleteModal(item)}  xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#00a6ed" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m5 5h-2.5l-1-1h-3l-1 1H7v2h10zM9 18h6a1 1 0 0 0 1-1v-7H8v7a1 1 0 0 0 1 1"></path></svg>
              <span class="tooltiptext">Supprimer</span>
            </span> */}
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
              <p>Nº de Facture: <span className="facture">{selectedRow.NumFacture ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Nom Client: <span className="client">{selectedRow.client?.NomClient ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Nº Bon de livraison: <span className="bon">{selectedRow.bon_livraison?.NumBonLiv ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Date de Livraison:<span className="dateLiv">{selectedRow.bon_livraison?.dateBonLiv ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Type de validation: <span className="validation">{selectedRow.bon_livraison?.TypeValidation ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Date de validation: <span className="dateValidation">{selectedRow.bon_livraison?.dateValidation ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>date Bon Commande: <span className="dateBonCommande">{selectedRow.bon_livraison?.dateBonCommande ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Montant HT: <span className="MontantHT">{selectedRow.MontantHT ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Date de Facture: <span className="dateFacture">{selectedRow.DateFacture ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Taux: <span className="Taux">{selectedRow.Taux ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>TVA: <span className="TVA">{selectedRow.TVA ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Montant TTC: <span className="MontantTTC">{selectedRow.MontantTTC ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Emetteur: <span className="reglement">{selectedRow.emetteur?.NomEmetteur ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Type de Contract: <span className="TypeContract">{selectedRow.TypeContrat ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Etablit Par: <span className="EtablitPar">{selectedRow.EtabliPar ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>PAYEE / IMPAYEE: <span className="EtatPayement">{selectedRow.EtaPayement ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Numéro de Remise: <span className="NumRemise">{selectedRow.remise?.NumRemise ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Numéro de Chèque: <span className="NumCheque">{selectedRow.cheque?.NumCheque ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Mode de Règlement: <span className="reglement">{selectedRow.ModeReg ?? 'null'}</span></p>
            </div>
            <div className="modal-item">
              <p>Montant encaisse: <span className="MontantEnc">{selectedRow.MontantEnc ?? 'null'} Dh</span></p>
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
            <th>Nº De Cheque</th>
            <th>Nº De Remise</th>
            <th>Montant Encaisse</th>
            <th><center>Plus d'Infos</center></th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
      {renderPagination()}
      {renderModal()}
      {/* {renderDeleteConfirmationModal()} */}
      {renderUpdateModal()}
    </div>
  );
};

export default TableWithData;
