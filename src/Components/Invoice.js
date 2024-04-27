// export default Invoice;
import React, { useState } from 'react';
import '../css/invoice.css'; // Assurez-vous de créer un fichier Form.css pour les styles

const Invoice = () => {
  const [formData, setFormData] = useState({
    NumRemise: '',
    NumeCHeque: '',
    modeReglement: '',
    montantEncaisse: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Tableau de configuration des champs
  const fieldsConfig = [
    { label: 'Nº de Facture', type: 'number' },
    { label: 'Nom Client', type: 'text',  },
    { label: 'Nº Bon de livraison', type: 'number' },
    { label: 'Date de Livraison', type: 'date' },
    { label: 'Type de validation', type: 'select', options: ['[Choisir Type de validation ]','WhatsApp', 'Bon de Commande', 'Bon accord'] },
    { label: 'Montant HT', type: 'number' },
    { label: 'Date de Facture', type: 'date' },
    { label: 'Taux', type: 'number' },
    { label: 'TVA', type: 'number' },
    { label: 'Montant TTC', type: 'number' },
    { label: 'EMETTEUR', type: 'select', options: ['[Choisir Emetteur ]','Contract', 'Ponctuel']  },
    { label: 'Type de Contract', type: 'select', options: ['[Choisir Type de contrat ]','Contract', 'Ponctuel'] },
    { label: 'Etablit Par', type: 'text' },
    { label: 'PAYEE / IMPAYEE', type: 'select', options: ['[Choisir Etat de payement]','PAYEE', 'IMPAYEE'] },
    { name: 'modeReglement', label: 'MODE DE REGLEMENT', type: 'select', options: ['[MODE DE REGLEMENT]', 'ESPÈCE', 'CHÈQUE', 'VIREMENT', 'PAR EFFET'] },
    { name: 'NumeCHeque', label: 'N° Chèque', type: 'text' },
    { name: 'NumRemise', label: 'N° Remise', type: 'text' },
    { name: 'montantEncaisse', label: 'MONTANT ENCAISSÉ', type: 'number' }


  ];
  return (
    <div className='invoice'>
      <center><h1>Nouvelle Facture</h1></center>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          {fieldsConfig.map((field, index) => (
            <div key={index} className='item' style={{
                display:
                  (field.name === 'NumeCHeque' || field.name === 'NumRemise' || field.name === 'montantEncaisse') &&
                  formData.modeReglement !== 'CHÈQUE' ? 'none' : ''
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