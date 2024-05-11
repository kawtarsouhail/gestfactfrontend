import React, { useState } from 'react';
import '../css/invoice.css';
import axios from '../Components/router/axiosInstance';
import Swal from 'sweetalert2';

const Invoice = () => {
  const [formData, setFormData] = useState({
    NumFacture: "",
    NomClient: "",
    NumBonLiv: "",
    dateBonLiv: "",
    TypeValidation: "",
    NumBonCommande:"",
    MontantHT: "",
    DateFacture: "",
    Taux: "",
   // TVA: "",
  //MontantTTC: "",
    NomEmetteur: "",
    TypeContrat: "contrat",
    EtabliPar: "",
    EtaPayement: "PAYEE",
    ModeReg: "ESPÈCE",
    MontantEnc: "",
    NumRemise: "",
    NumCheque: "",
  });
  const [emetteurList, setEmetteurList] = useState([]);
   // État pour suivre les champs qui doivent afficher un input au lieu d'un select
   const [dynamicInputs, setDynamicInputs] = useState({});

   // Cette version de 'handleChange' distingue les changements d'état entre les ‘select’ et les ‘input’.
const handleChange = (event) => {
  const { name, value, type } = event.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Mettre à jour uniquement sur changements provenant d'un élément 'select'
  if (type === 'select-one') {
    setDynamicInputs(prev => ({ ...prev, [name]: value === 'Autre' }));
  }
};

  
  //    // Gérez la transformation de select en input ici
  //    if (value === 'Autre') {
  //      setDynamicInputs(prev => ({ ...prev, [name]: true }));
  //    } else {
  //      setDynamicInputs(prev => ({ ...prev, [name]: true }));
  //    }
  //  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };


  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'NomEmetteur') {
      let emetteurs = JSON.parse(localStorage.getItem('emetteurs') || '[]');
      if (value && !emetteurs.includes(value)) {
        emetteurs.push(value);
        localStorage.setItem('emetteurs', JSON.stringify(emetteurs));
      }
    }
  };

  const handleFocus = (e) => {
    const name = e.target.name;
    if (name === 'NomEmetteur') {
      const storedEmetteurs = JSON.parse(localStorage.getItem('emetteurs') || '[]');
      setEmetteurList(storedEmetteurs);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:8000/api/enregistrerFacture', formData);
      Swal.fire({
        icon: 'success',
        title: 'Enregistrement réussi',
        text: 'Les données ont été enregistrées avec succès.'
      });
      setFormData({
        NumFacture: '',
        NomClient: '',
        NumBonLiv: '',
        dateBonLiv: '',
        TypeValidation: '',
        NumBonCommande:'',
        dateValidation: '',
        MontantHT: '',
        DateFacture: '',
        Taux: '',
        //TVA: '',
        //MontantTTC: '',
        NomEmetteur: '',
        TypeContrat: 'contrat',
        EtabliPar: '',
        EtaPayement: 'PAYEE',
        ModeReg: 'ESPÈCE',
        MontantEnc: '',
        NumRemise: '',
        NumCheque: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la facture:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'enregistrement des données. Veuillez réessayer.'
      });
    }
  };

  const fieldsConfig = [
    { label: 'Nº de Facture', type: 'text', min: '0', name: 'NumFacture' },
    { label: 'Date de Facture', type: 'date', name: 'DateFacture' },
    { label: 'Nom Client', type: 'text', name: 'NomClient' },
    { label: 'Nº Bon de livraison', type: 'text', min: '0', name: 'NumBonLiv' },
    { label: 'Date de Livraison', type: 'date', name: 'dateBonLiv' },
    { label: 'Type de validation', type: 'select', options: ['[Choisir Type Validation]','WhatsApp', 'Bon de Commande', 'Bon accord','Autre'], name: 'TypeValidation' },
   // { label: 'DatBon de Commande', type: 'date', name: 'dateBonCommande' },
    { label: 'Date de validation', type: 'date', name: 'dateValidation' },
    { label: 'Montant HT', type: 'number', min: '0', name: 'MontantHT' },
    { label: 'Taux', type: 'select',options: ['[Taux %]', '0','20','Autre'], name: 'Taux' },
    { label: 'Emetteur', type: 'text', name: 'NomEmetteur' },
    { label: 'Type de contrat', type: 'select', options: ['[Choisir Type de contrat]', 'contrat', 'Ponctuel','Autre'], name: 'TypeContrat' },
    { label: 'Etablit Par', type: 'text', name: 'EtabliPar' },
    { label: 'PAYEE / IMPAYEE', type: 'select', options: ['[Choisir PAYEE / IMPAYEE]', 'PAYEE', 'IMPAYEE','Avance','Autre'], name: 'EtaPayement' },
    { label: 'Mode de reglement', type: 'select', options: ['[MODE DE REGLEMENT]', 'ESPÈCE', 'CHÈQUE', 'VIREMENT','VIREMENT ESPECE','PAR EFFET','Autre'], name: 'ModeReg' },
    { label: 'Montant encaisse', type: 'number', min: '0', name: 'MontantEnc' }
  ];
  
  return (
    <div className='invoice'>
      <center><h1>Nouvelle Facture</h1></center>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          {fieldsConfig.map((field, index) => (
            <div key={index} className='item'>
              <label>{field.label}</label>
              {dynamicInputs[field.name] ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
                
              ) : field.type === 'select' ? (
                <select
                  className='selectFact'
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                >
                  {field.options.map((option, optionIndex) => (
                    <option
                      key={optionIndex}
                      value={option}
                      disabled={option.startsWith('[') && option !== formData[field.name]}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                
                <input
                  type={field.type === 'sting' ? 'text' : field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onFocus={field.name === 'NomEmetteur' ? handleFocus : undefined}
                  onBlur={field.name === 'NomEmetteur' ? handleBlur : undefined}
                  list={field.name === 'NomEmetteur' ? "emetteur-options" : undefined}
                  min={field.min}
                  required
                />
              )}
              {field.name === 'NomEmetteur' && (
                <datalist id="emetteur-options">
                  {emetteurList.map((emetteur, idx) => (
                    <option key={idx} value={emetteur} />
                  ))}
                </datalist>
              )}
            </div>
          ))}
          {formData.TypeValidation === 'Bon de Commande' && (
            <>
              <div className='item'>
                <label>Num de Bon Commande</label>
                <input
                  type="text"
                  name="NumBonCommande"
                  value={formData.NumBonCommande}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          {/* Champs conditionnels pour le mode de paiement par chèque */}
          {formData.ModeReg === 'CHÈQUE' && (
            <>
              <div className='item'>
                <label>Numéro de Remise</label>
                <input
                  type="text"
                  name="NumRemise"
                  value={formData.NumRemise}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='item'>
                <label>Numéro de Chèque</label>
                <input
                  type="text"
                  name="NumCheque"
                  value={formData.NumCheque}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
        </div>
        <div className="button-container">
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default Invoice;