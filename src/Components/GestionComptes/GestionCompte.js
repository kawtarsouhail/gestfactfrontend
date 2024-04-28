import React, { useState, useEffect} from 'react';
import '../../css/GestionCompte.css'; // Assurez-vous d'avoir ce fichier CSS dans le même dossier
import TableUsers from '../../Components/GestionComptes/TableUsers'
import axios from 'axios'; 
import Swal from 'sweetalert2';



const GestionCompte = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [TableVisible, setTableVisible] = useState(false);
  const [activeBoxId, setActiveBoxId] = useState(null); 
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({}); 

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

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value)); 
      };

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/afficher');
            if (response.data) {
              setUsers(response.data);
            } else {
              console.error('No users data found', response);
            }
          } catch (error) {
            console.error('Error fetching users', error);
          }
        };
    
          fetchUsers();
      }, []);
      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setErrors({});  // Réinitialise les erreurs existantes
        try {
            const response = await axios.post('http://localhost:8000/api/register', formData);
            Swal.fire({
              title: 'Succès!',
              text: 'Inscription réussie!',
              icon: 'success',
              confirmButtonColor: '#3085d6',  
             // confirmButtonText:'OK'
          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.href = '/GestionCompte'; 
              }
          });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);  
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
        <form className="form form-add-user" onSubmit={handleSubmit}>
            <div className="form-add-row">
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input name='name' id="nom" type="text" placeholder="Nom"  />
                    {errors.name && <div className="error">{errors.name[0]}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Adresse Email</label>
                    <input  name='email' id="email" type="email" placeholder="Adresse Email"  />
                    {errors.email && <div className="error">{errors.email[0]}</div>}
                </div>
            </div>
            <div className="form-add-row form-add-row-select">
              <div className="form-group">
                    <label htmlFor="password2">Rôle</label>
                    <select name="role" id="role">
                     <option value="" disabled selected><center>[Choisir un rôle]</center></option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Utilisateur">Utilisateur</option>
                    </select>
                    {errors.role && <div className="error">{errors.role[0]}</div>}
              </div>
            </div>
            <div className="form-add-row">
                <div className="form-group">
                    <label htmlFor="password1">Mot de passe</label>
                    <input name='password' id="password1" type="password" placeholder="Mot de passe"  />
                    {errors.password && <div className="error">{errors.password[0]}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirmer le mot de passe</label>
                    <input  name='password_confirmation'  id="password2" type="password" placeholder="Mot de passe"  />
                    {errors.password_confirmation && <div className="error">{errors.password_confirmation[0]}</div>}
                </div>
            </div>
            <button type="submit">Enregistrer</button>
        </form>
      )}

      {TableVisible && (
        <div>
            <select
            id="itemsPerPageSelect"
            onChange={(e) => handleItemsPerPageChange(e)}
            title="Nombre de colonnes"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <TableUsers data={users} itemsPerPage={itemsPerPage} />
        </div>
        
      )}
    </div>
  );
}

export default GestionCompte;