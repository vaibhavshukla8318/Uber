/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isLoggedIn ? element : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
