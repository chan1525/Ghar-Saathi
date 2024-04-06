import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Define ImageDisplay component outside of Materials component
const ImageDisplay = ({ imageData }) => {
  console.log("Image data", imageData.data);
  // Convert image buffer to Base64 data URL
  const arrayBuffer = new Uint8Array(imageData.data).buffer;
  return <img className="card-img-top" src={URL.createObjectURL(new Blob([arrayBuffer], { type: 'image/png' }))} alt="Material" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />;
}

const Materials = () => {
  const [materialsData, setMaterialsData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();
  const username = location.state.state.formData.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/fetchMaterials', { username });
        if (response.data.success) {
          setMaterialsData(response.data.data);
        } else {
          console.error('Error fetching data:', response.data.error);
          setError('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [username]);

  // Function to handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center mb-2">
          <h1>Materials Data</h1>
          <div>
            <label htmlFor="category">Select Category:</label>
            <select id="category" onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="1">Foundation Materials</option>
              <option value="2">Structural Materials</option>
              <option value="3">Exterior finishes</option>
              <option value="4">Interior finishes</option>
              <option value="5">Plumbing materials</option>
              <option value="6">Tools and equipments</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        {materialsData
          .filter(material => !selectedCategory || material.category_id === parseInt(selectedCategory))
          .map(material => (
            <div key={material.id} className="col-md-4 mb-2">
              <div className="card h-100">
                <ImageDisplay imageData={material.image} />
                <div className="card-body">
                  <h5 className="card-title">{material.name}</h5>
                  <p className="card-text">Price: {material.price}</p>
                  <p className="card-text">Description: {material.description}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Materials;
