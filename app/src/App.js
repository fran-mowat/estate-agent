import './App.css';
import PropertyPage from './components/PropertyPage';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //imports react router
import { useEffect, useState } from 'react';

function App() {
  const [properties, setProperties] = useState([]); //uses useState react hook to store property list 

  useEffect(() => { //fetches data from properties.json
    fetch("./properties.json")
    .then((response) => response.json())
    .then((data) => setProperties(data.properties))
    .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return ( //returns react router configuration
    <Router>
      <Routes> 
        <Route path="/" element={<HomePage properties={properties} />} /> 
        <Route path="/property/:id" element={<PropertyPage properties={properties} />} />
      </Routes>
    </Router>
  );
};

export default App;
