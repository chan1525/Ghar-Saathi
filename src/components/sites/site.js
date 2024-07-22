import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import DisplayList from './displaylist';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import './sites.css'; // Importing the CSS file
import loadingGif from './loading.gif'; // Import the loading GIF

function Sites({ history }) {
  const location = useLocation();
  const [siteData, setSiteData] = useState([]);
  const [defaultUsername, setDefaultUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialUsername = location.state.state.formData.username;
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
    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:4000/fetchSites', { username: selectedUsername });
      const data = response.data;
      setSiteData(data);
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="sites-container">
      <h2 className="heading">See sites near you</h2>
      <div className="selectContainer">
        <label className="label" htmlFor="usernameSelect">Select Location:</label>
        <select id="usernameSelect" value={defaultUsername} onChange={handleUsernameChange}>
          <option value="">Select City</option>
          <option value="banglore">Bangalore</option>
          <option value="mysore">Mysore</option>
          <option value="shivamoga">Shivamoga</option>
          <option value="belagavi">Belagavi</option>
        </select>
      </div>
      {loading ? ( // Show loading GIF if loading is true
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <ul className="list">
          <DisplayList dataArray={siteData} />
        </ul>
      )}
    </div>
  );
}

export default withRouter(Sites);
