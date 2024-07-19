import { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SIGNUP_API = 'https://test-api.achilyon.in/v1/rest-auth/register';

const SignUpForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    phone_number: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          role: value
        });
      } else {
        setFormData({
          ...formData,
          role: ''
        });
      }
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const signup = async (e) => {
    e.preventDefault();
    console.log('Data is ' + JSON.stringify(formData));
    if (formData.username && formData.email && formData.password && formData.phone_number && formData.name) {
      setSubmitting(true);
      try {
        console.log('Sending request');
        const response = await fetch(SIGNUP_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (!response.ok) {

          toast.error(result.error);
          setSubmitting(false);
          return;
        }
        localStorage.setItem('Achilyon', JSON.stringify({
          name: result.data.user.name,
          token: result.data.access_token
        }));
        setSubmitting(false);
        navigate('/userpage');
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Data is missing');
    }
  };

  return (
    <>
      <form onSubmit={signup}>
        <label>Name: </label>
        <input type="text" onChange={handleChange} name="name" placeholder="Name" required />
        <label>UserName: </label>
        <input type="text" onChange={handleChange} name="username" placeholder="Username" required />
        <label>Password: </label>
        <input type="password" onChange={handleChange} name="password" placeholder="Password" required />
        <label>Email: </label>
        <input type="email" onChange={handleChange} name="email" placeholder="Email" required />
        <label>Phone: </label>
        <input type="number" onChange={handleChange} name="phone_number" placeholder="Phone" required />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <input
              style={{ padding: 0, margin: 0 }}
              onChange={handleChange}
              type="checkbox"
              id="RegCustomer"
              value="CUSTOMER"
              checked={formData.role === 'CUSTOMER'}
            />
            <label style={{ padding: 0, marginLeft: 0, marginTop: 0 }} htmlFor="RegCustomer">
              Customer
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <input
              style={{ padding: 0, margin: 0 }}
              type="checkbox"
              onChange={handleChange}
              id="RegRestaurant"
              value="RESTAURANT"
              checked={formData.role === 'RESTAURANT'}
            />
            <label style={{ padding: 0, marginRight: 0, marginTop: 0 }} htmlFor="RegRestaurant">
              Restaurant
            </label>
          </div>
        </div>
        <br />
        <button className="btn" type="submit" style={submitting ? {
            background :  'rgb(125, 89, 192)'
        } : {}}>
          SIGN UP
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
