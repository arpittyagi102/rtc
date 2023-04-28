import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import './interface.css';

const socket = io.connect("http://localhost:3001", {
  transports: ["websocket"],
});


function Interface(props) {
  const [room, setRoom] = useState("");

  console.log("Value of username in Interface.js" +props.username);

  useEffect(() => {
    const joinRoom = () => {
      socket.emit("join_room", room);
    };
    joinRoom();
  }, [room]);

  return (
    <div className="App">
      <div className="inner ">
        <div>
          <label>Room</label>
          <input
            className="Room"
            type="text"
            placeholder="Room.."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
        </div>
        <Chat socket={socket} username={props.username} room={room} /> {/* Use the imported username here */}
      </div>
    </div>
  );
}

export default Interface;
