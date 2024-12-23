// Import necessary modules
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";


// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide context values
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [driver, setDriver] = useState({});
  const [isLoading, setIsLoading] = useState(true);
// 
  // API Base URL (use environment variable if available, fallback to localhost)
  const API = import.meta.env.VITE_API_URL;
  
  // Authorization token for API calls
  const authorizationToken = token ? `Bearer ${token}` : null;

  // Function to store token in localStorage and state
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null); 
    localStorage.removeItem("token"); // Remove token from localStorage
    toast.success("Logged out successfully!");
  };


  // Fetch user data from the API
  const fetchUserData = async () => {

    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/users/profile`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };


  // Fetch driver data from the API
  const fetchDriverData = async () => {

    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/drivers/profile`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDriver(data);
      } else {
        console.error("Failed to fetch user data");
        setDriver(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setDriver(null);
    } finally {
      setIsLoading(false);
    }
  };


  // Effect to fetch user details on initial render or token change
  useEffect(() => {
      fetchUserData();
      fetchDriverData()
  }, []);


  // Context value to be provided to consumers
  const value = {
    isLoggedIn: !!token,
    storeTokenInLS,
    logout,
    user,
    driver,
    authorizationToken,
    isLoading,
    API,
  };
  

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// Prop validation for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for consuming AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
