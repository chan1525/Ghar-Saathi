// server.js
import('node-fetch').then(({ default: fetch }) => {
    const express = require('express');
    const axios = require("axios");
    const bodyParser = require('body-parser');
    const { Pool } = require('pg');
    // const fetch = require('node-fetch');
    const app = express();
    const port =4000;
    const cors = require('cors');
    app.use(cors());
    // Database configuration
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'gharsati',
      password: 'Chethan@1330',
      port: 5000, // Corrected port for PostgreSQL
    });
    
    app.use(bodyParser.json());
    async function calculateDistance(startLat, startLng, endLat, endLng) {
      const apiKey = 'f57d7533f6c9447f831b33ce0441ce69';
      const url = `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLng}|${endLat},${endLng}&mode=drive&apiKey=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data;
      
      return data.features[0].properties.distance;
    }
    
    // Function to find the city ID with the minimum distance
    async function findNearestCity(userLat, userLng, cities) {
      const distances = {};
      for (const city of cities) {
        const distance = await calculateDistance(userLat, userLng, city.latitude, city.longitude);
        console.log(distance);
        distances[city.id] = distance;
      }
      // Sort the distances in ascending order
      const sortedDistances = Object.entries(distances).sort((a, b) => a[1] - b[1]);
      // Extract the sorted city IDs
      const sortedCityIds = sortedDistances.map(([cityId, _]) => parseInt(cityId));
      return sortedCityIds;
    }
    
    // Route to handle sign-up form submission
     // Import fetch for making HTTP requests
    
    // app.post('/signup', async (req, res) => {
    //   const { username, password, mobile, email, address, pincode } = req.body;
    //   try {
    //     // Make request to pin code API
        
    //     const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${pincode}&format=json&apiKey=65742e5871d448fbb4bc4ebd1e059bb7
    //     `);// Replace 'https://example.com/pincode/' with actual API endpoint
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch location data from pin code API');
    //     }
    //     const pincodeData = await response.json();
    //     // Extract longitude and latitude from pin code API response
    //     const { lon, lat } = pincodeData.results[0];
        
    //     // Insert user details along with longitude and latitude into the database
    //     const client = await pool.connect();
    //     const result = await client.query('INSERT INTO register (username, password, mobile, email, address, pincode, longitude, latitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [username, password, mobile, email, address, pincode, lon, lat]);
    //     client.release();
    //     console.log('User signed up successfully:', result.rows);
    //     res.sendStatus(201); // Created
    //   } catch (error) {
    //     console.error('Error signing up user:', error);
    //     res.sendStatus(500); // Internal Server Error
    //   }
    // });
    app.post('/signup', async (req, res) => {
      const { username, password, mobile, email, address, pincode } = req.body;
      try {
        // Make request to pin code API
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${pincode}&format=json&apiKey=65742e5871d448fbb4bc4ebd1e059bb7`);
        if (!response.ok) {
          throw new Error('Failed to fetch location data from pin code API');
        }
        const pincodeData = await response.json();
        // Extract longitude and latitude from pin code API response
        const { lon, lat } = pincodeData.results[0];
        
        // Insert user details along with longitude and latitude into the database
        const client = await pool.connect();
        const result = await client.query('INSERT INTO register (username, password, mobile, email, address, pincode, longitude, latitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [username, password, mobile, email, address, pincode, lon, lat]);
        const userId = result.rows[0].id;
    
        // Fetch all cities from the database
        const citiesQuery = 'SELECT id, latitude, longitude FROM city';
        const citiesResult = await client.query(citiesQuery);
        const cities = citiesResult.rows;
    
        // Find nearest cities and store sorted array of city IDs
        const nearestCities = await findNearestCity(lat, lon, cities);
    
        // Insert the sorted array of nearest city IDs into register table
        const updateQuery = 'UPDATE register SET nearest_city = $1 WHERE id = $2';
        await client.query(updateQuery, [nearestCities, userId]);
    
    
        client.release();
        console.log('User signed up successfully:', result.rows);
        
        res.sendStatus(201); // Created
      } catch (error) {
        console.error('Error signing up user:', error);
        res.sendStatus(500); // Internal Server Error
      }
    });
    
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      console.log(username,password);
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM register WHERE username = $1 AND password = $2', [username, password]);
       
        client.release();
        
        if (result.rows.length >= 1) {
        
          res.json({ message: 'Login successful' });
        } else {
         
          res.status(401).json({ error: 'Invalid username or password' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
    });
    // app.post('/fetchSites', async (req, res) => {
    //   try {
    //     const { username } = req.body;
    //     const client = await pool.connect(); // Define client within the scope of fetchSites route handler
    
    //     const registerQuery = `SELECT longitude, latitude FROM register WHERE username = $1`;
    //     const registerResult = await client.query(registerQuery, [username]);
    //     const { longitude: registerLongitude, latitude: registerLatitude } = registerResult.rows[0];
    
    //     const siteQuery = `SELECT id, longitude, latitude FROM site`;
    //     const siteResult = await client.query(siteQuery);
    
    //     const siteData = siteResult.rows;
    
    //     const distances = {};
    //     for (const site of siteData) {
    //       const { id: site_id, longitude: siteLongitude, latitude: siteLatitude } = site;
    //       const distance = await calculateDistance(registerLatitude, registerLongitude, siteLatitude, siteLongitude);
    //       distances[site_id] = distance;
    //     }
    
    //     client.release(); // Release client connection
    //     const sortedSiteIds = Object.keys(distances).sort((a, b) => distances[a] - distances[b]);
    //     res.json(sortedSiteIds);
    //   } catch (error) {
    //     console.error('Error fetching sites:', error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    //   }
    // });
    app.post('/fetchSites', async (req, res) => {
        console.log("Here\n");
      try {
        const { username } = req.body;
        const client = await pool.connect(); // Define client within the scope of fetchSites route handler
    
        const registerQuery = `SELECT longitude, latitude FROM register WHERE username = $1`;
        const registerResult = await client.query(registerQuery, [username]);
        const { longitude: registerLongitude, latitude: registerLatitude } = registerResult.rows[0];
    
        const siteQuery = `SELECT * FROM site`; // Select all columns from the site table
        const siteResult = await client.query(siteQuery);
    
        const siteData = siteResult.rows;
    
        const sitesWithDistances = [];
        for (const site of siteData) {
          const { id: site_id, longitude: siteLongitude, latitude: siteLatitude } = site;
          const distance = await calculateDistance(registerLatitude, registerLongitude, siteLatitude, siteLongitude);
          console.log(distance);
          const siteWithDistance = { ...site, distance }; // Add distance to the site entry
          sitesWithDistances.push(siteWithDistance);
        }
    
        // Sort the sites based on distance
        sitesWithDistances.sort((a, b) => a.distance - b.distance);
    
        client.release(); // Release client connection
        res.json(sitesWithDistances);
      } catch (error) {
        console.error('Error fetching sites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    app.post('/fetchbuildings', async (req, res) => {
      console.log("Here in the buildings section\n");
      try {
        const { username } = req.body;
        const client = await pool.connect(); // Define client within the scope of fetchSites route handler
    
        const registerQuery = `SELECT longitude, latitude FROM register WHERE username = $1`;
        const registerResult = await client.query(registerQuery, [username]);
        const { longitude: registerLongitude, latitude: registerLatitude } = registerResult.rows[0];
    
        const siteQuery = `SELECT * FROM building`; // Select all columns from the site table
        const siteResult = await client.query(siteQuery);
    
        const siteData = siteResult.rows;
    
        const sitesWithDistances = [];
        for (const site of siteData) {
          const { id: site_id, longitude: siteLongitude, latitude: siteLatitude } = site;
          const distance = await calculateDistance(registerLatitude, registerLongitude, siteLatitude, siteLongitude);
          const siteWithDistance = { ...site, distance }; // Add distance to the site entry
          sitesWithDistances.push(siteWithDistance);
        }
    
        // Sort the sites based on distance
        sitesWithDistances.sort((a, b) => a.distance - b.distance);
    console.log(sitesWithDistances);
        client.release(); // Release client connection
        res.json(sitesWithDistances);
      } catch (error) {
        console.error('Error fetching sites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    
    // async function calculateDistance(startLat, startLng, endLat, endLng) {
    //   const apiKey = 'f57d7533f6c9447f831b33ce0441ce69';
    //   const url = `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLng}|${endLat},${endLng}&mode=drive&apiKey=${apiKey}`;
    //   const response = await axios.get(url); // Use axios instead of fetch
    //   const data = response.data;
    //   // Assuming the distance is in meters
    //   console.log(data.features[0].properties.distance)
    //   return data.features[0].properties.distance;
    // }
    
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    }).catch(err => {
      console.error('Error importing node-fetch:', err);
    });