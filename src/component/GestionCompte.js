import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/GestionCompte.css';

const GestionCompte = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [activeBoxId, setActiveBoxId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
     //const token = localStorage.getItem('auth_token');
      try {
        const response = await axios.get('http://localhost:8000/api/afficher', {
          /*headers: {
            Authorization: `Bearer ${token}` // Proper Authorization header
          }*/
        });
        if (response.data) {
          setUsers(response.data); // Mettez à jour le state avec response.data directement
        } else {
          console.error('No users data found', response);
        }
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
  
    if (localStorage.getItem('auth_token')) {
      fetchUsers();  // Fetch des utilisateurs uniquement si le token existe
    } else {
      console.log("No auth token found. User is not logged in.");
    }
  }, []);  

  // Calculate the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBoxClick = (boxId) => {
    setActiveBoxId(boxId); 
    if (boxId === 'create') {
      setTableVisible(false);
      setFormVisible(true); 
    } else if (boxId === 'manage') {
      setFormVisible(false);
      setTableVisible(true); 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data); 
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        console.log(validationErrors);
      } else {
        console.error('Erreur lors de l\'inscription :', error);
      }
    }
  };
  return (
    <div className="GestionCompte">
      <div className={`container ${formVisible ? "smaller" : ""}`}>
        <div className={`box add ${activeBoxId === 'create' ? 'active' : ''} ${activeBoxId !== null ? 'active-top' : ''}`} onClick={() => handleBoxClick('create')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 10h3m3 0h-3m0 0V7m0 3v3M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8"></path></svg>
          <div>Créer un utilisateur</div>
        </div>
        <div className={`box management ${activeBoxId === 'manage' ? 'active' : ''} ${activeBoxId !== null ? 'active-top' : ''}`} onClick={() => handleBoxClick('manage')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="5em" viewBox="0 0 2048 2048"><path fill="white" d="M1148 1152q-83-62-179-95t-201-33q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-120 35-231t101-205t156-167t204-115q-56-35-100-82t-76-104t-47-119t-17-129q0-106 40-199t110-162T569 41T768 0t199 40t162 110t110 163t41 199q0 66-16 129t-48 119t-76 103t-101 83q60 23 113 54v152zM384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149m1664 768v768H1024v-768h256v-256h512v256zm-640 0h256v-128h-256zm512 384h-128v128h-128v-128h-256v128h-128v-128h-128v256h768zm0-256h-768v128h768z"></path></svg>
          <div>Editer les comptes</div>
        </div>
      </div>
      {formVisible && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input id="nom" name="name" type="text" placeholder="Nom" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Adresse Email</label>
              <input id="email" name="email" type="email" placeholder="Adresse Email" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password1">Mot de passe</label>
              <input id="password1" name="password" type="password" placeholder="Mot de passe" required />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirmer le mot de passe</label>
              <input id="password2" name="password_confirmation" type="password" placeholder="Mot de passe" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="role">Rôle</label>
            <select id="role" name="role" required>
              <option value="">Sélectionnez un rôle</option>
              <option value="admin">Sup Admin</option>
              <option value="admin">Admin</option>
              <option value="user">Utilisateur</option>
            </select>
          </div>
          <button type="submit">Enregistrer</button>
        </form>
      )}

      {tableVisible && (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(user => ( 
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>**************</td>                 
                  <td>
                  <div className="action-icons">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="#78c2ff" d="m21.561 5.318l-2.879-2.879A1.495 1.495 0 0 0 17.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06M11.5 14.672L9.328 12.5l6.293-6.293l2.172 2.172zm-2.561-1.339l1.756 1.728L9 15zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289c-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29c.464-.19.896-.347 1.188-.64L16 13zm2.5-11.328L16.328 5.5l1.293-1.293l2.171 2.172z"></path></svg>
                             <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="#78c2ff" d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8s8-3.582 8-8s-3.581-8-8-8m3.707 10.293a.999.999 0 1 1-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 0 1-1.414 0a.999.999 0 0 1 0-1.414L10.586 12L8.293 9.707a.999.999 0 1 1 1.414-1.414L12 10.586l2.293-2.293a.999.999 0 1 1 1.414 1.414L13.414 12z"></path></svg>
                 </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GestionCompte;
