import { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import './css/Register.css';

const DriverRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: { firstname: '', lastname: '' },
    email: '',
    password: '',
    vehicle: { color: '', plate: '', capacity: '', vehicleType: '' },
  });

  const { storeTokenInLS, API } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('fullname.') || name.startsWith('vehicle.')) {
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
      
      const response = await fetch(`${API}/api/drivers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLS(data.token);
        toast.success('Driver registration successful!');
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
      <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Driver Sign Up</h2>

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

          <div className='form-group'>
            <label htmlFor='color'>Vehicle Color</label>
            <input
              type='text'
              name='vehicle.color'
              id='color'
              value={formData.vehicle.color}
              onChange={handleChange}
              placeholder='Color'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='plate'>Vehicle Plate</label>
            <input
              type='text'
              name='vehicle.plate'
              id='plate'
              value={formData.vehicle.plate}
              onChange={handleChange}
              placeholder='Vehicle Plate Number'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='capacity'>Vehicle Capacity</label>
            <input
              type='number'
              name='vehicle.capacity'
              id='capacity'
              value={formData.vehicle.capacity}
              onChange={handleChange}
              placeholder='Capacity'
              min='1'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='vehicleType'>Vehicle Type</label>
            <select
              name='vehicle.vehicleType'
              id='vehicleType'
              value={formData.vehicle.vehicleType}
              onChange={handleChange}
              required
            >
              <option value=''>Select Vehicle Type</option>
              <option value='car'>Car</option>
              <option value='bike'>Bike</option>
              <option value='auto'>Auto</option>
            </select>
          </div>
          <br/>
          <button className='btn' type='submit' disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <p>
            Already have an account? <Link to='/auth/driver/login'>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DriverRegister;
