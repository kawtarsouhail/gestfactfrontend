import React from 'react';
import '../css/Menu.css';
import logoImage from '../Ressources/brighten.png'; 

export default function Menu() {
    return (
        <>
            <div className="Menu sidebar">
                <header>
                    <div className="LOGO">
                        <img src={logoImage} alt="Logo_ofppt"/> 
                    </div>
                    <div className="Profil">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24"><path fill="#78c2ff" d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19M12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4"/></svg>
                        </div>
                        <div className="Infos-css">
                            <a href="#" className="Profil-Link-css" >
                                <p>Ayman Nadim</p>
                            </a>
                            <small><div className="green-circle"></div>SUPER ADMIN </small>
                        </div>
                    </div>
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links-css">
                            <li className="nav-links-css"> 
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9em" height="2em" viewBox="0 0 24 24"><path fill="#ffff" d="M13 16H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m-4-6h2a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2m12 2h-3V3a1 1 0 0 0-.5-.87a1 1 0 0 0-1 0l-3 1.72l-3-1.72a1 1 0 0 0-1 0l-3 1.72l-3-1.72a1 1 0 0 0-1 0A1 1 0 0 0 2 3v16a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1M5 20a1 1 0 0 1-1-1V4.73l2 1.14a1.08 1.08 0 0 0 1 0l3-1.72l3 1.72a1.08 1.08 0 0 0 1 0l2-1.14V19a3 3 0 0 0 .18 1Zm15-1a1 1 0 0 1-2 0v-5h2Zm-7-7H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2"/></svg>
                                    <span className="text nav-text">Créer une facture</span>
                                </a>
                            </li>
                            <li className="nav-links-css"> 
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9em" height="2.5em" viewBox="0 0 50 50"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke="white" d="M25 29.167a4.167 4.167 0 1 0 0-8.334a4.167 4.167 0 0 0 0 8.334"/><path stroke="white" d="M43.75 25S37.5 37.5 25 37.5S6.25 25 6.25 25S12.5 12.5 25 12.5S43.75 25 43.75 25"/></g></svg>
                                    <span className="text nav-text visual">Visualiser les factures</span>
                                </a>
                            </li>
                            <li className="nav-links-css"> 
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.9em" height="2em" viewBox="0 0 24 24"><path fill="white" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m-1 14H5c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1m1-10H4V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1z"></path></svg>
                                    <span className="text nav-text">Suivi des paiement</span>
                                </a>
                            </li>
                            <li className="nav-links-css"> 
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.8em" viewBox="0 0 2048 2048"><path fill="white" d="M1148 1152q-83-62-179-95t-201-33q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-120 35-231t101-205t156-167t204-115q-56-35-100-82t-76-104t-47-119t-17-129q0-106 40-199t110-162T569 41T768 0t199 40t162 110t110 163t41 199q0 66-16 129t-48 119t-76 103t-101 83q60 23 113 54v152zM384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149m1664 768v768H1024v-768h256v-256h512v256zm-640 0h256v-128h-256zm512 384h-128v128h-128v-128h-256v128h-128v-128h-128v256h768zm0-256h-768v128h768z"></path></svg>
                                    <span className="text nav-text">Gestion des comptes</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="Mode-Deconnexion">
                        <div className="Mode">
                            <a href="#" >
                                <i class='bx bx-moon' ></i>
                            </a>
                        </div>
                        <div className="Deconnexion">
                            <a href="#">
                                <i class='bx bx-log-out'></i>
                            </a>
                        </div>
                </div>    
            </div>
            <div className="Mynav">
            <nav class="navbar">
                
                <div class="Nav-logo">
                    <img src={require('../Ressources/brighten.png')} alt="Logo_ofppt"/>
                </div>
                
                <ul class="nav-links-css">
                    <input type="checkbox" id="checkbox_toggle" />
                    <label for="checkbox_toggle" class="toggle">&#9776;</label>

                    <div class="Nav-menu">
                        <li className="nav-links-css"> 
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="#ffff" d="M13 16H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m-4-6h2a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2m12 2h-3V3a1 1 0 0 0-.5-.87a1 1 0 0 0-1 0l-3 1.72l-3-1.72a1 1 0 0 0-1 0l-3 1.72l-3-1.72a1 1 0 0 0-1 0A1 1 0 0 0 2 3v16a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1M5 20a1 1 0 0 1-1-1V4.73l2 1.14a1.08 1.08 0 0 0 1 0l3-1.72l3 1.72a1.08 1.08 0 0 0 1 0l2-1.14V19a3 3 0 0 0 .18 1Zm15-1a1 1 0 0 1-2 0v-5h2Zm-7-7H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2"/></svg>
                                    <span className="text nav-text">Créer une facture</span>
                                </a>
                        </li>
                        <li className="nav-links-css"> 
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 50 50"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke="white" d="M25 29.167a4.167 4.167 0 1 0 0-8.334a4.167 4.167 0 0 0 0 8.334"/><path stroke="white" d="M43.75 25S37.5 37.5 25 37.5S6.25 25 6.25 25S12.5 12.5 25 12.5S43.75 25 43.75 25"/></g></svg>
                                    <span className="text nav-text">Visualiser les factures</span>
                                </a>
                        </li>
                        <li className="nav-links-css"> 
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="white" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m-1 14H5c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1m1-10H4V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1z"></path></svg>
                                    <span className="text nav-text">Suivi des paiement</span>
                                </a>
                        </li>
                        <li className="nav-links-css"> 
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 2048 2048"><path fill="white" d="M1148 1152q-83-62-179-95t-201-33q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-120 35-231t101-205t156-167t204-115q-56-35-100-82t-76-104t-47-119t-17-129q0-106 40-199t110-162T569 41T768 0t199 40t162 110t110 163t41 199q0 66-16 129t-48 119t-76 103t-101 83q60 23 113 54v152zM384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149m1664 768v768H1024v-768h256v-256h512v256zm-640 0h256v-128h-256zm512 384h-128v128h-128v-128h-256v128h-128v-128h-128v256h768zm0-256h-768v128h768z"></path></svg>
                                    <span className="text nav-text">Gestion des comptes</span>
                                </a>
                        </li>
                        <li className="nav-links-css"> 
                        <div >
                                <div className="Deconnexion">
                                    <a href="#"><h5>Se deconnecter   <i class='bx bx-log-out'></i></h5>
                                        
                                    </a>
                                </div>
                            </div>
                        </li>

                    </div>
                </ul>
            </nav>
            </div>
        </>
    )
}