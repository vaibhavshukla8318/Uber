import { useState } from "react";
import "../css/Navbar.css";
import { useAuth } from "../../store/auth";
import {useNavigate, Link} from 'react-router-dom'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout  } = useAuth();
  
  const navigate = useNavigate();

  const handleLogin = () => navigate("/auth/login");
  const handleSignUp = () => navigate("/auth/register");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          MyApp
        </Link>
        <div className={`menu ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/blogs" className="nav-link">
            Blog
          </Link>
          <div>
            {user ? (
              <div className="profile-dropdown">
                <button className="profile-button nav-link">Profile</button>
                <div className="dropdown-menu">
                  <a href="/dashboard">Dashboard</a>
                  <a href="/settings">Settings</a>
                  <span onClick={logout} className="logout">
                    Logout
                  </span>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <button onClick={handleLogin} className="btn sign-in">
                  Sign In
                </button>
                <button onClick={handleSignUp} className="btn sign-up">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
