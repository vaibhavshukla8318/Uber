import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthLayout from '../layout/Auth-layout';
import Register from '../Register';
import Login from '../Login';
import DriverRegister from '../DriverRegister';
import DriverLogin from '../DriverLogin';
import { LoadingAuth } from '../LoadingAndError';

const AuthRouter = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // return <LoadingAuth />;
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="driver/register" element={<DriverRegister />} />
        <Route path="driver/login" element={<DriverLogin />} />
      </Route>
    </Routes>
  );
};

export default AuthRouter;
