import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import loadingGif from './loading.gif'; // Import the loading GIF

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobile: '',
    email: '',
    address: '',
    pincode: ''
  });
  
  const [loading, setLoading] = useState(false); // Loading state
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }); 
      if (response.ok) {
        console.log('User signed up successfully!');
        setRedirect(true);
      } else {
        console.error('Failed to sign up user');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Stop loading after request is complete
    }
  };

  if (redirect) {
    history.push('/explore', { state: { formData } });
  }

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
      <form style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }} onSubmit={handleSubmit}>
        {/* Loading spinner */}
        {loading && <img src={loadingGif} alt="Loading..." style={{ width: '100px', margin: '0 auto 20px', display: 'block' }} />}
        {/* Form fields */}
        <label style={{ display: 'inline-block', width: '100%', marginBottom: '15px', textAlign: 'left' }}>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }} />
        </label>
        <br />
        <label style={{ display: 'inline-block', width: '100%', marginBottom: '15px', textAlign: 'left' }}>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }} />
        </label>
        <br />
        <label style={{ display: 'inline-block', width: '100%', marginBottom: '15px', textAlign: 'left' }}>
          Mobile:
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }} />
        </label>
        <br />
        <label style={{ display: 'inline-block', width: '100%', marginBottom: '15px', textAlign: 'left' }}>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }} />
        </label>
        <br />
        <label style={{ display: 'inline-block', width: '100%', marginBottom: '15px', textAlign: 'left' }}>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }} />
        </label>
        <br />
        <label style={{ display: 'inline-block', width: '100%', marginBottom: '15px', textAlign: 'left' }}>
          Pincode:
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }} />
        </label>
        <br/>
        <button type="submit" style={{ width: '100%', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s' }}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
