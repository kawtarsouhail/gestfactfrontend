import React, { useState } from 'react';
import axios from 'axios'; // Importez Axios
import '../css/Login.css'; 

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
        // Définir le cookie avec une expiration dans 7 jours (exprimée en secondes)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        document.cookie = `auth_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
        // Rediriger l'utilisateur vers la page principale après la connexion réussie
        window.location.href = '/GestionCompte';
      } else {
        setError(response.data.message || 'Une erreur s\'est produite.');
      }
    } catch (error) {
      setError('Une erreur s\'est produite.');
    }
    
  };
  
  return (
    <div className="Mycontainer Main-login">
      <div className="Mycolumn bg-image image">
      </div>
      <div className="Mycolumn">
        <div className='login'>
          <h3 class="display-4">Se connecter</h3>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="MyMyform-group mb-3">
              <input id="inputEmail" type="email" placeholder="Adresse email" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="MyMyform-group mb-3">
              <input id="inputPassword" type="password" placeholder="Mot de passe" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="Myform-group Myform-check mb-3">
              <input id="rememberMe" type="checkbox" className="form-check-input"/>
              <label htmlFor="rememberMe" className="form-check-label">Se souvenir de moi</label>
            </div>
            <button type="submit" className="Mybtn">CONNEXION</button>
          </form>
        </div>
      </div>
    </div>
  );
};
  
export default Login;
