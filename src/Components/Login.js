// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import '../css/Login.css'; // Assurez-vous de créer un fichier Form.css pour les styles

// const Login = () => {
//   const[email,setEmail]=useState();
//   const[password,setPassword]=useState();
//   const[redirect,setRedirect]=useState();

//   const submit = async (e) => {
//     e.preventDefault();
//     await fetch(
//         'http://localhost:8000/api/login',
//         {
//             method:'POST',
//             headers:{'content-Type':'application/json'},
//             credentials:'include',
//             body:JSON.stringify(
//                 {
//                     email,
//                     password
//                 }
//             )
//         }
//     )

//     setRedirect(true);
//   }


//   if(redirect){
//     return <Navigate to="/Visualiser" />
//   }

//   return (
//     <div className="Mycontainer Main-login">
//       <div className="Mycolumn bg-image image">
//       </div>
//       <div className="Mycolumn">
//             <div className='login'>
//                 <h3 class="display-4">Se connecter</h3>
//                 <p class="text-muted mb-4">Merci de remplire vos donnees </p>
//                 <form onSubmit={submit}>
//                     <div class="MyMyform-group mb-3">
//                         <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" onChange={(e)=>setEmail(e.target.value)}/>
//                     </div>
//                     <div class="MyMyform-group mb-3">
//                         <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" onChange={(e)=>setPassword(e.target.value)}/>
//                     </div>
//                     <div class="Myform-group Myform-check mb-3">
//                         <input id="rememberMe" type="checkbox" class="form-check-input"/>
//                         <label for="rememberMe" class="form-check-label">Se souvenir de moi</label>
//                     </div>
//                     <button type="submit" class="Mybtn ">SIGN IN</button>
//                 </form>
//             </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../ProtectionComponent/auth-context';
// import '../css/Login.css'; // Ensure the CSS file exists for styling

// const Login = () => {
//   const { isLogin } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [Error,setError]=useState('');
//   const navigate = useNavigate();

  

//   const submit = async (e) => {
//     e.preventDefault();
//     const response = await fetch(
//         'http://localhost:8000/api/login',
//         {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//             body: JSON.stringify({ email, password })
//         }
//     );

//     if (response.ok) {
//       // const token = response.data.token;
//       // document.cookie = token=token; 

//       const data = await response.json();
//       isLogin(data.jwt);
//       navigate('/Visualiser'); // Navigate to another route      
//     } else {
//       alert("Login failed! Check your credentials.");
//     }
//   }

//   return (
//     <div className="Mycontainer Main-login">
//       <div className="Mycolumn bg-image image"></div>
//       <div className="Mycolumn">
//         <div className='login'>
//             <h3 className="display-4">Se connecter</h3>
//             <p className="text-muted mb-4">Merci de remplir vos données</p>
//             <form onSubmit={submit}>
//                 <div className="MyMyform-group mb-3">
//                     <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div className="MyMyform-group mb-3">
//                     <input id="inputPassword" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <div className="Myform-group Myform-check mb-3">
//                     <input id="rememberMe" type="checkbox" className="form-check-input" />
//                     <label htmlFor="rememberMe" className="form-check-label">Se souvenir de moi</label>
//                 </div>
//                 <button type="submit" className="Mybtn ">SIGN IN</button>
//             </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../ProtectionComponent/auth-context';
// import '../css/Login.css'; // Ensure the CSS file exists for styling

// const Login = () => {
//   const { isLogin } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         'http://localhost:8000/api/login',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({ email, password })
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         isLogin(data.jwt);
//         navigate('/Visualiser');
//       } else {
//         setError('Email ou mot de passe incorrect.');
//       }
//     } catch (err) {
//       setError('Login failed due to server error');
//     }
//   }

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   }

//   return (
//     <div className="Mycontainer Main-login">
//       <div className="Mycolumn bg-image image"></div>
//       <div className="Mycolumn">
//         <div className='login'>
//           <h3 className="display-4">Se connecter</h3>
//           <p className="text-muted mb-4">Merci de remplir vos données</p>
//           <form onSubmit={submit}>
//             <div className="MyMyform-group mb-3">
//               <input
//                 id="inputEmail"
//                 type="email"
//                 placeholder="Email address"
//                 required
//                 autoFocus
//                 className={`form-control rounded-pill border-0 shadow-sm px-4 ${error ? 'is-invalid' : ''}`}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="MyMyform-group mb-3">
//               <input
//                 id="inputPassword"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 required
//                 className={`form-control rounded-pill border-0 shadow-sm px-4 text-primary ${error ? 'is-invalid' : ''}`}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {error && <div className="invalid-feedback">{error}</div>}
//             </div>
//             <div className="Myform-group Myform-check mb-3">
//               <input 
//                 id="AfficherMdp" 
//                 type="checkbox" 
//                 className="form-check-input" 
//                 onChange={toggleShowPassword}
//               />
//               <label htmlFor="AfficherMdp" className="form-check-label">Afficher le mot de passe</label>
//             </div>
//             <button type="submit" className="Mybtn">SIGN IN</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from './router/auth';
import axios from 'axios';
import '../css/Login.css'; // Ensure the CSS file exists for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { 
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        setToken(token); 
        navigate('/Visualiser');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
    } catch (err) {
      setError('Login failed due to server error');
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="Mycontainer Main-login">
      <div className="Mycolumn bg-image image"></div>
      <div className="Mycolumn">
        <div className='login'>
          <h3 className="display-4">Se connecter</h3>
          <p className="text-muted mb-4">Merci de remplir vos données</p>
          <form onSubmit={submit}>
            <div className="MyMyform-group mb-3">
              <input
                id="inputEmail"
                type="email"
                placeholder="Email address"
                required
                autoFocus
                className={`form-control rounded-pill border-0 shadow-sm px-4 ${error ? 'is-invalid' : ''}`}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="MyMyform-group mb-3">
              <input
                id="inputPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className={`form-control rounded-pill border-0 shadow-sm px-4 text-primary ${error ? 'is-invalid' : ''}`}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
            <div className="Myform-group Myform-check mb-3">
              <input 
                id="AfficherMdp" 
                type="checkbox" 
                className="form-check-input" 
                onChange={toggleShowPassword}
              />
              <label htmlFor="AfficherMdp" className="form-check-label">Afficher le mot de passe</label>
            </div>
            <button type="submit" className="Mybtn">SIGN IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

