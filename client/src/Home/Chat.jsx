import { useSocket } from "../store/SocketContext";
import { useEffect } from "react";

const Chat = () => {
  const { sendMessage, receiveMessage } = useSocket();

  useEffect(() => {
    // Listen for incoming messages
    const unsubscribe = receiveMessage("chatMessage", (message) => {
      console.log("Received message:", message);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [receiveMessage]);

  const handleSendMessage = () => {
    sendMessage("chatMessage", { text: "Hello, World!" });
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default Chat;
