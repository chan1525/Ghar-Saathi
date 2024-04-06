// Sites.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import DisplayList from './displaylist';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import './sites.css'; // Importing the CSS file

function Sites({ history }) {
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
      const response = await axios.post('http://localhost:4000/fetchSites', { username: selectedUsername });
      const data = response.data;
      setSortedSiteIds(data);
    } catch (error) {
      console.error('Error fetching sites:', error);
    }
  };

  return (
    <div className="sites-container"> {/* Adding a specific class */}
      <h2 className="heading">See your sites near you</h2>
      <div className="selectContainer">
        <label className="label" htmlFor="usernameSelect">Select Loacation:</label>
        <select id="usernameSelect" value={defaultUsername} onChange={handleUsernameChange}>
          <option value="">Select Username</option>
          <option value="banglore">Bangalore</option>
          <option value="mysore">Mysore</option>
          <option value="shivamoga">Shivamoga</option>
          <option value="belagavi">Belagavi</option>
        </select>
      </div>
      <ul className="list">
        <DisplayList dataArray={siteData} />
      </ul>
    </div>
  );
}

export default withRouter(Sites);
