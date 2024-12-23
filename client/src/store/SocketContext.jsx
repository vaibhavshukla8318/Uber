// Import necessary modules
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { useAuth } from "./auth";

// Create the SocketContext
export const SocketContext = createContext();

// SocketProvider component to provide context values
export const SocketProvider = ({ children }) => {
  const { authorizationToken, API } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!authorizationToken) return;

    // Initialize socket connection
    const socketInstance = io(API, {
      auth: {
        token: authorizationToken,
      },
    });

    // Handle connection and disconnection events
    socketInstance.on("connect", () => {
      console.log("Connected to socket server", socketInstance.id);
    });

    // socketInstance.on("disconnect", () => {
    //   console.log("Disconnected from socket server");
    // });

    setSocket(socketInstance);

    // Clean up socket connection on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [authorizationToken, API]);

  // Function to emit messages to a specific event
  const sendMessage = (event, data) => {
    if (!socket) {
      console.error("Socket is not connected");
      return;
    }
    socket.emit(event, data);
  };

  // Function to listen for messages from a specific event
  const receiveMessage = (event, data) => {
    if (!socket) {
      console.error("Socket is not connected");
      return;
    }
    socket.on(event, data);

    // Cleanup listener when the component unmounts or dependencies change
    return () => {
      socket.off(event, data);
    };
  };

  const value = {
    sendMessage,
    receiveMessage,
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for consuming SocketContext
export const useSocket = () => {
  const socketContextValue = useContext(SocketContext);
  if (!socketContextValue) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socketContextValue;
};
