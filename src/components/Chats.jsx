// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const Chats = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const socketRef = useRef(null);

//   useEffect(() => {
//     socketRef.current = io("http://localhost:5000"); // Update this for your backend URL

//     socketRef.current.on("message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!message) return;
//     const newMessage = { text: message, timestamp: new Date().toISOString() };
//     socketRef.current.emit("message", newMessage);
//     setMessages((prev) => [...prev, newMessage]);
//     setMessage("");
//   };

//   return (
//     <div>
//       <h2>Chat</h2>
//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc" }}>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{new Date(msg.timestamp).toLocaleTimeString()}:</strong> {msg.text}
//           </p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chats;
