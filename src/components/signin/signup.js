import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobile: '',
    email: '',
    address: '',
    pincode: ''
  });
  
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        // Redirect or show success message
        setRedirect(true);
      } else {
        console.error('Failed to sign up user');
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  if (redirect) {
    history.push('/explore', { state: { formData } });
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Mobile:
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Pincode:
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
