import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayLabour.css'; // Import CSS file

function Display({ data, index }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data && data.projects) {
      const blobImages = data.projects.map(imageData => {
        const arrayBuffer = new Uint8Array(imageData.data).buffer;
        return URL.createObjectURL(new Blob([arrayBuffer], { type: 'image/png' }));
      });
      setImages(blobImages);
    }
  }, [data]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="left-div">
          <div id={`carousel-${index}`} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              {images.map((_, idx) => (
                <li key={idx} data-target={`#carousel-${index}`} data-slide-to={idx} className={idx === 0 ? 'active' : ''}></li>
              ))}
            </ol>
            <div className="carousel-inner">
              {images.map((imageUrl, idx) => (
                <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                  <img src={imageUrl} className="d-block w-100" alt={`Image ${idx}`} />
                </div>
              ))}
            </div>
            <a className="carousel-control-prev" href={`#carousel-${index}`} role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#carousel-${index}`} role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="right-div">
          <h5 className="card-title">ID: {data.id}</h5>
          <p className="card-text">Description: {data.description}</p>
          <button className="btn btn-primary">Contact Seller</button>
        </div>
      </div>
    </div>
  );
}

function DisplayLabour({ dataArray }) {
  return (
    <div className="container">
      <div className="row">
        {dataArray.map((item, index) => (
          <Display key={index} data={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default DisplayLabour;
