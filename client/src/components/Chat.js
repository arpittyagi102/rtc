import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Chat.css";

export default function Chat({ socket, username, room }) {
  const [currMess, setCurrMess] = useState("");
  const [messList, setMessList] = useState([]);

  console.log("Username : "+username);
  useEffect(() => {
    // Add event listener
    socket.on("receive_message", handleReceiveMessage);

    // Remove event listener when component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  const handleReceiveMessage = (data) => {
    setMessList((list) => [...list, data]);
  };

  const sendMessage = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }
  
    if (currMess.trim() !== "") {
      const messData = {
        room,
        author: username,
        message: currMess,
        time: new Date(Date.now()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      };
  
      const sentMessData = {
        ...messData,
        author: username,
      };
  
      await socket.emit("send_message", messData);
  
      setMessList((list) => [...list, sentMessData]);
      setCurrMess("");
    }
  };
  

  return (
    <div className="chat-container">
      <ScrollToBottom className="message-container" style={{ display: "flex" }}>
      {messList.map((messContent, index) => {
          return (
            <div
              key={index}
              className={`message ${
                messContent.author === username ? "right" : "left"
              }`}
            >
              {console.log(messContent)}
              <div className="message-content">
                {messContent.author !== username && (
                  <div className="message-info">
                    <div className="message-author">{messContent.author}</div>
                    <div className="message-time">{messContent.time}</div>
                  </div>
                )}
                <div className="message-text">{messContent.message}</div>
              </div>
            </div>
          );
        })}


      </ScrollToBottom>
      <div className="input-container">
        <input
          className="message-input"
          value={currMess}
          type="text"
          placeholder="Type a message..."
          onChange={(e) => {
            setCurrMess(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button className="send-button" onClick={sendMessage}>
          send
        </button>
      </div>
    </div>
  );
}
