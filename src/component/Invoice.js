// import React, { useState } from 'react';
// import '../css/invoice.css'; // Assurez-vous de créer un fichier Form.css pour les styles

// const Invoice = () => {
//   const [formData, setFormData] = useState({
//     input1: '',
//     input2: '',
//     // Ajoutez les autres champs d'entrée de la même manière
//     // input3: '', input4: '', ..., input16: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Ajoutez ici la logique pour soumettre le formulaire
//     console.log(formData);
//   };

//   return (
//         <div>
//             <center><h3>Facture</h3></center>
//             <form className="form" onSubmit={handleSubmit}>
//             <div className="input-container">
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Nº de Facture
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Nom Client
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Nº Bon de Livraison
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Date de Livraison
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>

//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Type de validation
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Montant Ht
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Date Facture
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Taux
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         TVA
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Montant TTC
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Emetteur
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         TypeContact
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Etablit Par 
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Payee/Impayee
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Mode Reglement
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 <div className='item'>
//                     <label htmlFor="Input1">
//                         Montant Encaisse
//                     </label>
//                     <input
//                     type="text"
//                     name="input1"
//                     value={formData.input1}
//                     onChange={handleChange}
//                     placeholder="Input 1"
//                     />
//                 </div>
//                 {/* Ajoutez d'autres champs d'entrée ici */}
//             </div>
//             <div className="button-container">
//                 <button type="submit">Submit</button>
//             </div>
//             </form>
//         </div>
//   );
// };

// export default Invoice;
import React, { useState } from 'react';
import '../css/invoice.css'; // Assurez-vous de créer un fichier Form.css pour les styles

const Invoice = () => {

  
  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    select1: '',
    date1: '',
    // Ajoutez les autres champs d'entrée de la même manière
    // input3: '', input4: '', ..., input16: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/enregistrerFacture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      // Gérer la logique post-soumission ici, par exemple un message à l'utilisateur
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
    }
  };
  

  // Tableau de configuration des champs
  const fieldsConfig = [
    { label: 'Nº de Facture', type: 'number' },
    { label: 'Nom Client', type: 'text',  },
    { label: 'Nº Bon de livraison', type: 'number' },
    { label: 'Date de Livraison', type: 'date' },
    { label: 'Type de validation', type: 'select', options: ['[Choisir Type de livraison ]','WhatsApp', 'Bon de Commande', 'Bon accord'] },
    { label: 'Montant HT', type: 'number' },
    { label: 'Date de Facture', type: 'date' },
    { label: 'Teaux', type: 'number' },
    { label: 'TVA', type: 'number' },
    { label: 'Montant TTC', type: 'number' },
    { label: 'EMETTEUR', type: 'select', options: ['[Choisir Type de livraison ]','Contract', 'Ponctuel']  },
    { label: 'Type de Contract', type: 'select', options: ['[Choisir Type de livraison ]','Contract', 'Ponctuel'] },
    { label: 'Etablit Par', type: 'text' },
    { label: 'PAYEE / IMPAYEE', type: 'select', options: ['[Choisir PAYEE / IMPAYEE]','PAYEE', 'IMPAYEE'] },
    { label: 'MODE DE REGLEMENT', type: 'select', options: ['[MODE DE REGLEMENT]','ESPÈCE', 'CHÈQUE ','VIREMENT','PAR EFFET'] },
    { label: 'MONTANT ENCAISSE', type: 'number',  },


  ];

return (
  <div className='invoice'>
    <center><h1>Nouvelle Facture</h1></center>
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-container">
        {/* Boucle pour générer les champs d'entrée */}
        {fieldsConfig.map((field, index) => (
          <div key={index} className='item'>
            <label htmlFor={field.label}>
              {field.label}
            </label>
            {/* Générez le champ d'entrée en fonction du type */}
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              >
                {/* Générez les options du select */}
                {field.options.map((option, optionIndex) => (
                  <option
                    key={optionIndex}
                    value={option}
                    disabled={option === '[MODE DE REGLEMENT]' || option === '[Choisir PAYEE / IMPAYEE]' || option === '[Choisir Type de livraison ]'}
                  >
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.label}
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
