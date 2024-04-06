// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom/cjs/react-router-dom';
// import DisplayLabour from './displaylabour';

// const Labour = () => {
//   const [laboursData, setLaboursData] = useState([]);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const username = location.state.state.formData.username;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post('http://localhost:4000/fetchlabours', { username });
//         if (response.data.success) {
//           setLaboursData(response.data.data);
//         } else {
//           console.error('Error fetching data:', response.data.error);
//           setError('Error fetching data');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Error fetching data');
//       }
//     };

//     fetchData();
//   }, []);

//   return (
    
     
       
//         <DisplayLabour dataArray={laboursData}/>
   
//   );
// };

// export default Labour;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import DisplayLabour from './displaylabour';

const Labour = () => {
  const [laboursData, setLaboursData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const username = location.state.state.formData.username;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/fetchlabours', { username });
      if (response.data.success) {
        setLaboursData(response.data.data);
      } else {
        console.error('Error fetching data:', response.data.error);
        setError('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = parseInt(e.target.value);
    setSelectedCategory(selectedCategoryId);
  };

  const filteredLaboursData = selectedCategory
    ? laboursData.filter(labour => labour.category_id === selectedCategory)
    : laboursData;
  console.log(filteredLaboursData);
  return (
<div style={{ marginTop: '2vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Labours Data</h1>
  <div style={{ marginTop: '2vh', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
    <label htmlFor="category">Select Category:</label>
    <select id="category" onChange={handleCategoryChange} style={{ marginLeft: '10px' }}>
      <option value="">All Categories</option>
      <option value="1">Interior Designer</option>
      <option value="2">Construction Workers</option>
      <option value="3">Electrical</option>
      <option value="4">Plumber</option>
    </select>
  </div>
  <DisplayLabour dataArray={filteredLaboursData} />
  {error && <div>{error}</div>}
</div>

  );
};

export default Labour;
