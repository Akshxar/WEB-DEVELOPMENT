import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [dish, setDish] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  const [table3Data, setTable3Data] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedTable1Data = localStorage.getItem('table1Data');
    const storedTable2Data = localStorage.getItem('table2Data');
    const storedTable3Data = localStorage.getItem('table3Data');

    if (storedTable1Data) setTable1Data(JSON.parse(storedTable1Data));
    if (storedTable2Data) setTable2Data(JSON.parse(storedTable2Data));
    if (storedTable3Data) setTable3Data(JSON.parse(storedTable3Data));
  }, []);



  const addToBill = () => {
    const newItem = { id, price, dish, uniqueId: Date.now() };
    switch (selectedTable) {
      case 'table1':
        setTable1Data([...table1Data, newItem]);
        localStorage.setItem('table1Data', JSON.stringify([...table1Data, newItem])); // Use the updated state
        break;
      case 'table2':
        setTable2Data([...table2Data, newItem]);
        localStorage.setItem('table2Data', JSON.stringify([...table2Data, newItem])); // Use the updated state
        break;
      case 'table3':
        setTable3Data([...table3Data, newItem]);
        localStorage.setItem('table3Data', JSON.stringify([...table3Data, newItem])); // Use the updated state
        break;
      default:
        break;
    }
    // Reset input fields after adding to the bill
    setId('');
    setPrice('');
    setDish('');
  };

  const removeFromBill = (table, uniqueId) => {
    switch (table) {
      case 'table1':
        setTable1Data(table1Data.filter(item => item.uniqueId !== uniqueId));
        localStorage.setItem('table1Data', JSON.stringify(table1Data.filter(item => item.uniqueId !== uniqueId))); // Use the updated state
        break;
      case 'table2':
        setTable2Data(table2Data.filter(item => item.uniqueId !== uniqueId));
        localStorage.setItem('table2Data', JSON.stringify(table2Data.filter(item => item.uniqueId !== uniqueId))); // Use the updated state
        break;
      case 'table3':
        setTable3Data(table3Data.filter(item => item.uniqueId !== uniqueId));
        localStorage.setItem('table3Data', JSON.stringify(table3Data.filter(item => item.uniqueId !== uniqueId))); // Use the updated state
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Restaurant Billing System</h1>

      <div>
        <label>
           ID:
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Choose Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Choose Dish:
          <input type="text" value={dish} onChange={(e) => setDish(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Choose a Table:
          <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
            <option value="">Select Table</option>
            <option value="table1">Table 1</option>
            <option value="table2">Table 2</option>
            <option value="table3">Table 3</option>
          </select>
        </label>
      </div>

      <div>
        <button onClick={addToBill}>Add to Bill</button>
      </div>

      <div>
        <h2>Table 1</h2>
        <ul>
          {table1Data.map((item) => (
            <li key={item.uniqueId}>
              {`ID: ${item.id}, Price: ${item.price}, Dish: ${item.dish}`}
              <button onClick={() => removeFromBill('table1', item.uniqueId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Table 2</h2>
        <ul>
          {table2Data.map((item) => (
            <li key={item.uniqueId}>
              {`ID: ${item.id}, Price: ${item.price}, Dish: ${item.dish}`}
              <button onClick={() => removeFromBill('table2', item.uniqueId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Table 3</h2>
        <ul>
          {table3Data.map((item) => (
            <li key={item.uniqueId}>
              {`ID: ${item.id}, Price: ${item.price}, Dish: ${item.dish}`}
              <button onClick={() => removeFromBill('table3', item.uniqueId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
