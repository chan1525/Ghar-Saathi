import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Display({ data, index }) {
    const [images, setImages] = useState([]);
  
    useEffect(() => {
      if (data && data.images) {
        const blobImages = data.images.map(imageData => {
          const arrayBuffer = new Uint8Array(imageData.data).buffer;
          return URL.createObjectURL(new Blob([arrayBuffer], { type: 'image/png' }));
        });
        setImages(blobImages);
      }
    }, [data]);
  
    return (
      <div className="card" style={{ width: '95%', height: '60vh' }}>
        <div className="card-body" style={{ display: 'flex' }}>
          <div className="left-div" style={{ width: '50%', height: '100%', float: 'left', position: 'relative' }}>
            <div id={`carousel-${index}`} className="carousel slide" data-ride="carousel" style={{ height: '100%' }}>
              <ol className="carousel-indicators">
                {images.map((_, idx) => (
                  <li key={idx} data-target={`#carousel-${index}`} data-slide-to={idx} className={idx === 0 ? 'active' : ''}></li>
                ))}
              </ol>
              <div className="carousel-inner" style={{ height: '100%' }}>
                {images.map((imageUrl, idx) => (
                  <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`} style={{ height: '100%' }}>
                    <img src={imageUrl} className="d-block w-100" alt={`Image ${idx}`} style={{ maxHeight: '50%', maxWidth: '50%', width: '50%', height:'50%', objectFit: 'cover' }} />
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
          <div className="right-div" style={{ width: '50%', height: '100%', padding: '10px', boxSizing: 'border-box', overflowY: 'auto', position: 'relative' }}>
            <h5 className="card-title">ID: {data.id}</h5>
            <p className="card-text">Description: {data.description}</p>
            <p className="card-text">Location: {data.location}</p>
            <button className="btn btn-primary" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Contact Seller</button>
          </div>
        </div>
      </div>
    );
  }
  

function DisplayList({ dataArray }) {
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

export default DisplayList;
