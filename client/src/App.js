import React, { useState } from "react";
import { Routes,Route } from "react-router-dom";
import Interface from './components/Interface';
import Login from './components/Login'
import Register from "./components/Register";

export default function App(){

  const [username, setUsername] = useState('Me');

  const handleSetUsername = (data) => {
    console.log("Value getting at App.js "+data);
    setUsername(data);
  }

  return(
    <>
      <Routes>
        <Route path="/" element={<Login handleSetUsername={handleSetUsername}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chat" element={<Interface username={username}/>}/>
      </Routes>
    </>
  )
}
