import React,{useState} from 'react';
import Table from './Table';
import '../../css/Visualiser.css'
const Visualiser = () => {
  const [filtrageItem,setItemFiltrage]=useState('Valeur:');
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [payeeOrImpayee, setPayeeOrImpayee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleChangefiltrage=(e)=>{
    e.preventDefault();
    setItemFiltrage(e.target.value);
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value)); // Convertir la valeur en nombre entier
  };  

  const renderInputOrSelect = () => {
    if (filtrageItem === 'Payée/Impayée :') {
      return (
        <select
          id="payeeOrImpayeeSelect"
          className="form-control"
          value={payeeOrImpayee}
          onChange={(e) => setPayeeOrImpayee(e.target.value)}
        >
          <option value="">[Choisir]</option>
          <option value="Payée">Payée</option>
          <option value="Impayée">Impayée</option>
        </select>
      );
    } else {
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

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    // Logique supplémentaire si nécessaire
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    // Logique supplémentaire si nécessaire
  };

  const data = [

  ];


  return (
    <div className="Visualiser">
      <center>
        <h2>Visualiser Facture</h2>
      </center>
      <div className="form-group">
        <label htmlFor="selectOption">Element de Filtrage:</label>
        <select
          id="selectOption"
          className="form-control"
          onChange={(e) => handleChangefiltrage(e)}
        >
          <option value="Valeur :">[Choisir Element de Filtrage]</option>
          <option value="Nº de Facture :">Nº de Facture</option>
          <option value="Nom Client :">Nom Client</option>
          <option value="Payée/Impayée :">Payée/Impayée</option>
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
      <div className="date-filters">
          <label htmlFor="startDate">De :</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            onChange={(e) => handleStartDateChange(e)}
          />

          <label htmlFor="endDate">À :</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            onChange={(e) => handleEndDateChange(e)}
          />
      </div>
      <Table data={data} itemsPerPage={itemsPerPage} />
      
    </div>
  );
};

export default Visualiser;
