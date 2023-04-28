import React from 'react';
import io from "socket.io-client";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login(props) {

    const socket = io.connect("http://localhost:3001");
    const navigate = useNavigate();

    function handlesubmit() {
        const username = document.getElementById('one').value;
        const password = document.getElementById('two').value;
        const data = {
            username: username,
            password: password
        }
        socket.emit("login-attempt", data);
    }

    socket.on("Wrong", () => {
        alert("Invalid Credentials");
    });

    socket.on("Right", () => {
        props.handleSetUsername(document.getElementById('one').value);
        navigate('/chat');
    });

    return (
        <>
            <div className='cont'>
                <div className='first'>
                    <div className='big'>
                        <h1>Real Time Chat </h1>
                        <div className='second'>
                            <input type={'text'} placeholder="Enter Name" id="one"></input>
                        </div>
                        <div className='third'>
                            <input type={'password'} placeholder="Password" id="two"></input>
                        </div>

                        <button type='button' id="btn" onClick={handlesubmit}>Log In</button>
                        <div className='line'></div>
                        <a href='/register'><button type='button' id='btnacc'>Create new account</button></a>
                    </div>

                </div>
            </div>
        </>
    )
}
