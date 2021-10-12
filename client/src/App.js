import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat.js";

const socket = io.connect("http://localhost:3001");
function App() {
  //inorder to have a chat between two people we need to make sure that they are in the same room
  //A room in socket.io is broadcasting your messages/data so if I send a message to a room only the people who have the id to that room will see that message

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    //this function will establish connection between the user who logged in and the socketio room that they want to enter
    if (username !== "" && room !== "") {
      socket.emit("join_room", room); //this is going to be received in the socket.on function in the backend as data
      setShowChat(true);
    } //we will only be able to join if username and room are not empty strings
  };

  //here within the return we are allowing the user to write the name of a room
  //and whoever joins the same room will be able to chat with them
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join</h3>
          <input
            type="text"
            placeholder="someone you don't know..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
