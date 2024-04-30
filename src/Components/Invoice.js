import React, { useState } from 'react';
import '../css/invoice.css'; 
import axios from 'axios';
import Swal from 'sweetalert2';

const Invoice = () => {
  const [formData, setFormData] = useState({
    NumFacture: '',
    NomClient: '',
    NumBonLiv: '',
    NomEmetteur: '',
    dateBonLiv: '',
    TypeValidation: '',
    MontantHT: '',
    DateFacture: '',
    Taux: '',
    TVA: '',
    MontantTTC: '',
    TypeContrat: '',
    EtabliPar: '',
    EtaPayement: '',
    ModeReg: '',
    NumCheque: '',
    NumRemise: '',
    MontantEnc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/enregistrerFacture', formData);
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Enregistrement réussi',
        text: 'Les données ont été enregistrées avec succès.'
      });
      setFormData({
        NumFacture: '',
        NomClient: '',
        NumBonLiv: '',
        NomEmetteur:'',
        dateBonLiv: '',
        TypeValidation: '',
        MontantHT: '',
        DateFacture: '',
        Taux: '',
        TVA: '',
        MontantTTC: '',
        TypeContrat: '',
        EtabliPar: '',
        EtaPayement: '',
        ModeReg: '',
        NumCheque: '',
        NumRemise: '',
        MontantEnc: ''
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
    { label: 'Nº de Facture', type: 'text', name: 'NumFacture' },
    { label: 'Nom Client', type: 'text', name: 'NomClient' },
    { label: 'Nº Bon de livraison', type: 'text', name: 'NumBonLiv' },
    { label: 'Date de Livraison', type: 'date', name: 'dateBonLiv' },
    { label: 'Type de validation', type: 'select', name: 'TypeValidation', options: ['[Choisir Type de validation ]', 'WhatsApp', 'Bon de Commande', 'Bon accord'] },
    { label: 'Montant HT', type: 'number', name: 'MontantHT' },
    { label: 'Date de Facture', type: 'date', name: 'DateFacture' },
    { label: 'Taux', type: 'number', name: 'Taux' },
    { label: 'TVA', type: 'number', name: 'TVA' },
    { label: 'Montant TTC', type: 'number', name: 'MontantTTC' },
    { label: 'EMETTEUR', type: 'select', name: 'NomEmetteur', options: ['[Choisir Emetteur ]', 'Contract', 'Ponctuel'] },
    { label: 'Type de Contract', type: 'select', name: 'TypeContrat', options: ['[Choisir Type de contrat ]', 'Contract', 'Ponctuel'] },
    { label: 'Etablit Par', type: 'text', name: 'EtabliPar' },
    { label: 'PAYEE / IMPAYEE', type: 'select', name: 'EtaPayement', options: ['[Choisir Etat de payement]', 'PAYEE', 'IMPAYEE'] },
    { label: 'MODE DE REGLEMENT', type: 'select', name: 'ModeReg', options: ['[MODE DE REGLEMENT]', 'ESPÈCE', 'CHÈQUE', 'VIREMENT', 'PAR EFFET'] },
    { label: 'N° Chèque', type: 'text', name: 'NumCheque' },
    { label: 'N° Remise', type: 'text', name: 'NumRemise' },
    { label: 'MONTANT ENCAISSÉ', type: 'number', name: 'MontantEnc' }
  ];
  return (
    <div className='invoice'>
      <center><h1>Nouvelle Facture</h1></center>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          {fieldsConfig.map((field, index) => (
            <div key={index} className='item' style={{
                display:
                  (field.name === 'NumCheque' || field.name === 'NumRemise' || field.name === 'MontantEnc') &&
                  formData.ModeReg !== 'CHÈQUE' ? 'none' : ''
            }}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                >
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.trim()}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.label}
                />
              )}
            </div>
          ))}
        </div>
        <div className="button-container">
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default Invoice;