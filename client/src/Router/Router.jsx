import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the individual routers
import HomeRouter from '../Home/Router/HomeRouter';
import AuthRouter from '../Authentication/Router/AuthRouter';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Routes */}
        <Route path="/*" element={<HomeRouter />} />
        {/* Authentication Routes */}
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </BrowserRouter>
  )
};

export default Router;
