import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password
            });
        
            localStorage.setItem('token', response.data.token);
            console.log('Logged in:', response.data.user);
        
            window.location.href = '/admin';

            // Optionally, you can display a SweetAlert here before redirecting
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'You have been successfully logged in!',
                didClose: () => {
                    window.location.href = '/admin';
                }
            });
        } catch (error) {
            console.error('Login Error:', error);
        
            // Récupérer le message d'erreur de la réponse ou afficher un message par défaut
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'An unexpected error occurred. Please try again later.';
        
            // Afficher une alerte d'erreur de connexion avec SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
            });
        }
    };    

    return (
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex bg-image"></div>
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4">Login</h3>
                                    <p className="text-muted mb-4">Please fill in your credentials to login.</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-3">
                                            <input id="inputEmail" type="email" placeholder="Email address" required autoFocus className="form-control rounded-pill border-0 shadow-sm px-4"  onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="inputPassword" type="password" placeholder="Password" required className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"  onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;










