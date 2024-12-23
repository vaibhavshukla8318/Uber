import { Routes, Route } from 'react-router-dom';
import StartPage from '../StartPage';
import Home from '../Home';
import DriverPage from '../DriverPage';
import ConfirmRideMapPage from '../ConfirmRideMapPage';
import ProtectedRoute from '../component/ProtectedRoute';
import UserRiding from '../UserRiding';
import Chat from '../Chat';
// import { Loading } from '../LoadingAndError'; // Homeopathy-specific loader

const HomeRouter = () => {

  return (
    <Routes>
        <Route path="" element={<StartPage />} />
        <Route path="home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="driver" element={<DriverPage />} />
        <Route path="confirm-ride" element={<ConfirmRideMapPage />} />
        <Route path="user-riding" element={<UserRiding />} />
        {/* <Route path="chat" element={<Chat />} /> */}

    </Routes>
  )
}

export default HomeRouter;
