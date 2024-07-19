import { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SIGNIN_API = 'https://test-api.achilyon.in/v1/rest-auth/login';

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (formData.username && formData.password) {
      try {
        const response = await fetch(SIGNIN_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          toast.error('Invalid Credentials...');
          setFormData({ username: '', password: '' }); // Clear the input fields
          setSubmitting(false);
          return;
        }

        const result = await response.json();
        localStorage.setItem(
          'Achilyon',
          JSON.stringify({
            name: result.data.user.name,
            token: result.data.access_token,
          })
        );
        navigate('/userpage');
      } catch (e) {
        toast.error('Something went wrong...');
        setFormData({ username: '', password: '' }); // Clear the input fields on error
        setSubmitting(false);
      }
    } else {
      toast.error('Data is missing...');
      
    }
  };

  return (
    <form onSubmit={signin}>
      <label>UserName: </label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="UserName"
        required
      />
      <label>Password: </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <br />
      <button className="btn"  type="submit" style={submitting ? {
        background : 'rgb(125, 89, 192)'
      } : {}}>
        SignIn
      </button>
    </form>
  );
};

export default SignInForm;
