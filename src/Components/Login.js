import React, { useState } from 'react';
import axios from 'axios'; // Importez Axios
import '../css/Login.css'; 
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/login', { 
        email,
        password,
      });
      
      if (response.status === 200) {
        const token = response.data.token;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        document.cookie = `auth_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
        window.location.href = '/GestionCompte';
      } else {
        setError(response.data.message || 'Une erreur s\'est produite.');
      }
    } catch (error) {
      console.error(error); // Affiche l'erreur dans la console
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la connexion.',
        });
      }
    }
  };
  
  

  return (
    <div className="Mycontainer Main-login">
      <div className="Mycolumn bg-image image"></div>
      <div className="Mycolumn">
        <div className='login'>
            <h3 className="display-4">Se connecter</h3>
            <p className="text-muted mb-4">Merci de remplir vos données</p>
            <form onSubmit={handleLogin}>
                <div className="MyMyform-group mb-3">
                    <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="MyMyform-group mb-3">
                    <input id="inputPassword" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="Myform-group Myform-check mb-3">
                    <input id="rememberMe" type="checkbox" className="form-check-input" />
                    <label htmlFor="rememberMe" className="form-check-label">Se souvenir de moi</label>
                </div>
                <button type="submit" className="Mybtn ">SIGN IN</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login
