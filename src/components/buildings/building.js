import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import DisplayList from '../sites/displaylist';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';


function Building({ history }) {
  const location = useLocation();
  const [siteData, setSortedSiteIds] = useState([]);
  const [defaultUsername, setDefaultUsername] = useState('');

  useEffect(() => {
   
      const initialUsername = location.state.state.formData.username;
      console.log(initialUsername);
      setDefaultUsername(initialUsername);
      fetchSites(initialUsername);
    
  }, [location.state]);

  const handleUsernameChange = async (event) => {
    const newUsername = event.target.value;
    setDefaultUsername(newUsername);
    if (newUsername) {
      fetchSites(newUsername);
    }
  };

  const fetchSites = async (selectedUsername) => {
    console.log(selectedUsername)
    try {
      const response = await axios.post('http://localhost:4000/fetchbuildings', { username: selectedUsername });
      const data = response.data;
      setSortedSiteIds(data);
    } catch (error) {
      console.error('Error fetching sites:', error);
    }
  };

  return (
    <div style={{ marginTop: '2vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>See your buildings near you</h2>
    <div style={{ marginTop: '2vh', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <label htmlFor="usernameSelect">Select Username:</label>
      <select id="usernameSelect" value={defaultUsername} onChange={handleUsernameChange} style={{ marginLeft: '10px' }}>
        <option value="">Select Username</option>
        <option value="banglore">Bangalore</option>
        <option value="mysore">Mysore</option>
        <option value="shivamoga">Shivamoga</option>
        <option value="belagavi">Belagavi</option>
      </select>
    </div>
    <ul style={{ marginTop: '2vh', listStyleType: 'none', padding: 0 }}>
      <DisplayList dataArray={siteData} />
    </ul>
  </div>
  
  );
}

export default withRouter(Building);
