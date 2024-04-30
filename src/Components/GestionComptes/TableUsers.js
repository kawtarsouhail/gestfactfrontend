import React, { useState } from 'react';
import '../../css/Table.css'; // Import custom CSS file for styling
import axios from 'axios';


const TableUsers= ({ data: initialData, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [data, setData] = useState(initialData);
  const baseURL = 'http://localhost:8000/api'; 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
 password_confirmation: ''
  });
  
  const handleShowModal = (rowData) => {
    setSelectedRow(rowData);
    setFormData({
      name: rowData.name,
      email: rowData.email,
      role: rowData.role,
      password: '',  
   password_confirmation: ''
    });
  };
 
  
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/supprimer/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  };
  
  const handleDeleteRow = async () => {
    try {
      await deleteUser(rowToDelete.id); 
      setData(data.filter(item => item.id !== rowToDelete.id)); 
      setRowToDelete(null); 
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };
  
  
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.password_confirmation) {
    alert("Les mots de passe ne correspondent pas!");
    return;
  }
  try {
    const updatedData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password ,
      password_confirmation: formData.password_confirmation ,
    };
    const response = await axios.put(`${baseURL}/modifier/${selectedRow.id}`, updatedData);
    if (response.data) {
      // Mettre à jour les données dans le tableau ou notifier l'utilisateur du succès
      handleCloseModal();
      console.log("Utilisateur mis à jour avec succès: ", response.data);
    }
  } catch (error) {
    console.error('Échec de mise à jour de l’utilisateur: ', error.response.data);
  }
};
// Ajouter cette fonction pour mettre à jour le champ du mot de passe lorsque l'utilisateur le modifie
// const handlePasswordChange = (e) => {
//   const { name, value } = e.target;
//   setFormData(prevState => ({
//     ...prevState,
//     [name]: value
//   }));
// };
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

 
  const handleCloseModal = () => {
    setSelectedRow(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      password: '',
      password_confirmation: ''
    });
  };
  
  // const handleCloseModal = () => {
  //   setSelectedRow(null);
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
          <p>Voulez-vous vraiment supprimer ce compte  {rowToDelete.name}?</p>
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
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.role}</td>
        <td>***********</td>
        <td>
          <div className='actions'>
            <span class="tooltip">
              <svg onClick={() => handleShowModal(item)} xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="#78c2ff" d="m21.561 5.318l-2.879-2.879A1.495 1.495 0 0 0 17.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06M11.5 14.672L9.328 12.5l6.293-6.293l2.172 2.172zm-2.561-1.339l1.756 1.728L9 15zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289c-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29c.464-.19.896-.347 1.188-.64L16 13zm2.5-11.328L16.328 5.5l1.293-1.293l2.171 2.172z"></path></svg>
              <span class="tooltiptext">Modifier</span>
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
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className='modal-items'>
              <div className="modal-item">
                <label>Nom:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-item">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-item">
                <label>Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>Choose a role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Utilisateur">Utilisateur</option>
                </select>
              </div>
              <div className="modal-item">
                <label>Mot de passe:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-item">
                <label>Confirmer Mot de passe:</label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit">Enregistrer</button>
          </form>
        </div>
      </div>
    );
  };
  

  return (
    <div className="table-container">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Nom</th>
            <th>Adresse Email</th>
            <th>Role</th>
            <th>Mot de passe</th>
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

export default TableUsers;
