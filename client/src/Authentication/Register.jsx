import { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { useNavigate, Link   } from 'react-router-dom';
import './css/Register.css';

const Register = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: { firstname: '', lastname: '' },
    email: '',
    password: ''
  });

  const { storeTokenInLS, API } = useAuth(); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('fullname.')) {
      const [key, subKey] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [key]: { ...prevData[key], [subKey]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await fetch(`${API}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLS(data.token);
        toast.success('User registration successful!');
        navigate('/');
      } else {
        toast.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='register'>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          <div className='form-group'>
            <label htmlFor='firstname'>First Name</label>
            <input
              type='text'
              name='fullname.firstname'
              id='firstname'
              value={formData.fullname.firstname}
              onChange={handleChange}
              placeholder='First Name'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='lastname'>Last Name</label>
            <input
              type='text'
              name='fullname.lastname'
              id='lastname'
              value={formData.fullname.lastname}
              onChange={handleChange}
              placeholder='Last Name'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              required
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <p>Already have an account? <Link to="/auth/login" >Login here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
