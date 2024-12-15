import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StartPage from '../StartPage';
import Home from '../Home';
// import { Loading } from '../LoadingAndError'; // Homeopathy-specific loader

const HomeRouter = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // return <Loading />;
  }

  return (
    <Routes>
        <Route path="" element={<StartPage />} />
        <Route path="home" element={<Home />} />
    </Routes>
  )
}

export default HomeRouter;
