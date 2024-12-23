import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./store/auth";
import { SocketProvider } from "./store/SocketContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SocketProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </SocketProvider>
  </AuthProvider>
);
