import React,{useState} from 'react';
import Table from './Table';
import '../../css/Visualiser.css'
const Suivi = () => {
  const [filtrageItem,setItemFiltrage]=useState('Valeur:');
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [payeeOrImpayee, setPayeeOrImpayee] = useState('');
  const [remiseNum, setRemiseNum] = useState('');
  const [totalMontant, setTotalMontant] = useState(0);
  const data = [];


  const handleChangefiltrage = (e) => {
    e.preventDefault();
    setItemFiltrage(e.target.value);
    setRemiseNum(''); // Réinitialise lorsque l'option de filtrage change
    setTotalMontant(0); // Réinitialise le total
  };
  
  const handleRemiseNumChange = (e) => {
    setRemiseNum(e.target.value);
    // Ici, vous pouvez également inclure la logique pour filtrer et calculer le total
    calculateTotal(e.target.value);
  };
  
  const calculateTotal = (remiseNum) => {
    const filteredData = data.filter(item => item.columnX === remiseNum); // Remplacez `columnX` par la colonne réelle
    const total = filteredData.reduce((acc, item) => acc + parseFloat(item.montant), 0); // Assurez-vous que `montant` est le champ correct
    setTotalMontant(total);
  };
  

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value)); // Convertir la valeur en nombre entier
  };  

  const renderInputOrSelect = () => {
    if (filtrageItem === 'Nº De Remise:') {
      return (
        <input
          type="text"
          className="form-control"
          id="remiseNumInput"
          placeholder="Entrer Valeur"
          value={remiseNum}
          onChange={(e) => setRemiseNum(e.target.value)}
        />
      );
    } else {
      // Default case: other text inputs
      return (
        <input
          type="text"
          className="form-control"
          id="textInput"
          placeholder="Enter value"
          disabled={filtrageItem === 'Valeur :'}
        />
      );
    }
  };
  


  return (
    <div className="Visualiser">
      <center>
        <h2>Suivi des paiements</h2>
      </center>
      <div className="form-group">
        <label htmlFor="selectOption">Element de Filtrage:</label>
        <select
          id="selectOption"
          className="form-control"
          onChange={(e) => handleChangefiltrage(e)}
        >
          <option value="Valeur :" disabled>[Choisir Element de Filtrage]</option>
          <option value="Nº De Remise:">Nº De Remise</option>
          <option value="Nº De Cheque :">Nº De Cheque</option>
        </select>
        <label htmlFor="textInput">{filtrageItem}</label>
        {renderInputOrSelect()}
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
      </div>
      <div  className='total-montant'>
        {filtrageItem === 'Nº De Remise:' && (
          <div>Total du montant encaissé : {totalMontant.toFixed(2)} Dh</div>
        )}
      </div>

      <Table data={data} itemsPerPage={itemsPerPage} />
      
    </div>
  );
};

export default Suivi;
