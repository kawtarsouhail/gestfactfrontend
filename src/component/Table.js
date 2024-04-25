import React, { useState } from 'react';
import '../css/Table.css'; // Import custom CSS file for styling

const TableWithData = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
const [selectedRow, setSelectedRow] = useState(null);

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

  //const handleDeleteRow = () => {

  //};

  const renderTableData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item, index) => (
      <tr key={startIndex + index}>
        <td>{item.column1}</td>
        <td>{item.column2}</td>
        <td>{item.column3}</td>
        <td>{item.column4}</td>
        <td>{item.column5}</td>
        <td>
          <button className="btn btn-primary" onClick={() => handleShowModal(item)}>Plus d'infos</button>
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
            <p>Nº de Facture: <span className="facture">{selectedRow.column1}</span></p>
          </div>
          <div className="modal-item">
            <p>Nom Client: <span className="client">{selectedRow.column2}</span></p>
          </div>
          <div className="modal-item">
            <p>Nº Bon de livraison: <span className="bon">{selectedRow.column3}</span></p>
          </div>
          <div className="modal-item">
            <p>Type de validation: <span className="validation">{selectedRow.column4}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column5}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column7}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column8}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column9}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column10}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column11}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column12}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column13}</span></p>
          </div>
          <div className="modal-item">
            <p>Mode de Règlement: <span className="reglement">{selectedRow.column13}</span></p>
          </div>
        </div>
        {/* <div className='modal-delete' >
          <center>
            <button onClick={handleDeleteRow}> Supprimer</button>
          </center>
          
        </div> */}
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
    </div>
  );
};

export default TableWithData;


// import React, { useState } from 'react';

// const Table = ({ data, itemsPerPage }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };

//   const handleShowModal = (rowData) => {
//     setSelectedRow(rowData);
//   };

//   const handleCloseModal = () => {
//     setSelectedRow(null);
//     setIsDeleteModalOpen(false);  // Fermer également le modal de suppression si ouvert
//   };

//   const handleDeleteRow = () => {
//     setIsDeleteModalOpen(true); // Afficher le modal de confirmation
//   };

//   const confirmDelete = () => {
//     console.log("Suppression de la ligne:", selectedRow); // Logique de suppression ici
//     setIsDeleteModalOpen(false);
//     setSelectedRow(null);
//     // TODO: Supprimer la ligne de la base de données ou de la source de données
//   };

//     const renderPagination = () => {
//     const pages = [];
//     const maxPagesToShow = 5;
//     const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//     const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
//           <button className="page-link" onClick={() => handleChangePage(i)}>{i}</button>
//         </li>
//       );
//     }

//     const previousButton = (
//       <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//         <button className="page-link" onClick={() => handleChangePage(currentPage - 1)}>Previous</button>
//       </li>
//     );

//     const nextButton = (
//       <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//         <button className="page-link" onClick={() => handleChangePage(currentPage + 1)}>Next</button>
//       </li>
//     );

//     return (
//       <nav>
//         <ul className="pagination">
//           {previousButton}
//           {pages}
//           {nextButton}
//         </ul>
//       </nav>
//     );
//   };
 
//   // Render des lignes de la table avec pagination
//   const renderTableData = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return data.slice(startIndex, endIndex).map((item, index) => (
//       <tr key={startIndex + index}>
//         <td>{item.column1}</td>
//         <td>{item.column2}</td>
//         <td>{item.column3}</td>
//         <td>{item.column4}</td>
//         <td>{item.column5}</td>
//         <td>
//           <button className="btn btn-primary" onClick={() => handleShowModal(item)}>Plus d'infos</button>
//         </td>
//       </tr>
//     ));
//   };

//   // Render du modal de détails
//   const renderModal = () => {
//     if (!selectedRow) return null;

//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <span className="close" onClick={handleCloseModal}>&times;</span>
//           <h2>Details</h2>
//         <div className='modal-items'>
//           <div className="modal-item">
//             <p>Nº de Facture: <span className="facture">{selectedRow.column1}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Nom Client: <span className="client">{selectedRow.column2}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Nº Bon de livraison: <span className="bon">{selectedRow.column3}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Type de validation: <span className="validation">{selectedRow.column4}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column5}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column7}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column8}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column9}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column10}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column11}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column12}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column13}</span></p>
//           </div>
//           <div className="modal-item">
//             <p>Mode de Règlement: <span className="reglement">{selectedRow.column13}</span></p>
//           </div>
//         </div>
//           <div className="modal-delete">
//             <center>
//               <button onClick={handleDeleteRow}>Supprimer</button>
//             </center>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Render du modal de confirmation de suppression
//   const renderDeleteConfirmationModal = () => {
//     if (!isDeleteModalOpen) return null;

//     return (
//       <div className="modal-supprimer">
//         <div className="modal-content">
//           <span className="close" onClick={handleCloseModal}>&times;</span>
//           <h2>Confirmer la suppression</h2>
//           <p>Êtes-vous sûr de vouloir supprimer cet enregistrement ?</p>
//           <button onClick={confirmDelete}>Confirmer</button>
//           <button onClick={handleCloseModal}>Annuler</button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="table-container">
//       <table className="table">
//       <thead className="thead-dark">
//           <tr>
//             <th>Nº de Facture</th>
//             <th>Nom Client</th>
//             <th>Nº Bon de livraison</th>
//             <th>Type de validation</th>
//             <th>Mode de Règlement</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {renderTableData()}
//         </tbody>
//       </table>
//       {renderPagination()}
//       {renderModal()}
//       {renderDeleteConfirmationModal()}
//     </div>
//   );
// };

// export default Table;





