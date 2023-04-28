import React from "react";
import io from "socket.io-client";
import { Link,useNavigate } from 'react-router-dom';
import './Register.css'

export default function Register() {
    const navigate=useNavigate();
    const socket = io.connect("http://localhost:3001");

    function handlesubmit() {
        var username = document.getElementById('one1').value;
        var password = document.getElementById('pass').value;
        var data = {
            username: username,
            password: password
        }
        socket.emit("register-attempt", data);
    }

    socket.on("registered", () => {
        navigate('/')
    });

    return (
        <>
            <div className='cont'>
                <div className='first'>
                    <div className='big'>
                        <h1>Real Time Chat </h1>
                        <div className='second'>
                            <input type={"text"} placeholder="Enter Name" id="one1"></input>
                        </div>
                        <div className='big'>
                            <div className='second'>
                                <input type={"text"} placeholder="Email" id="one2"></input>
                            </div>
                        </div>
                        <div className='third'>
                            <input type={'password'} placeholder="Password" id="pass"></input>
                        </div>
                        <div className='third'>
                            <input type={'password'} placeholder="Confirm Password" id="confpass"></input>
                        </div>
                        <button type='button' id="btn" onClick={handlesubmit}>Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}