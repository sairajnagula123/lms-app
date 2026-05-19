import { JitsiMeeting } from "@jitsi/react-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "../styles/LiveClassRoom.css";

const socket = io("https://lms-app-cqbr.onrender.com");

function LiveClassRoom() {

  const { roomId } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const role = localStorage.getItem("role");

  const sendMessage = () => {

    if (!message.trim()) return;

    const msgData = {
      sender: role,
      text: message,
    };

    socket.emit("send_message", msgData);

    setMessage("");
  };

  useEffect(() => {

    socket.on("receive_message", (data) => {

      setMessages((prev) => [...prev, data]);

    });

  }, []);

  return (
  <div className="live-room-container">

    {/* VIDEO SECTION */}
    <div className="video-section">

      <JitsiMeeting
        roomName={roomId}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100vh";
        }}
      />

    </div>

    {/* CHAT SECTION */}
    <div className="chat-section">

      <div className="chat-header">
        Live Chat
      </div>

      <div className="chat-messages">

        {messages.map((msg, index) => (
          <div className="chat-message" key={index}>

            <strong>{msg.sender}:</strong>

            <p>{msg.text}</p>

          </div>
        ))}

      </div>

      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  </div>
);
}

export default LiveClassRoom;