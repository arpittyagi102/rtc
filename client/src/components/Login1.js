import React from 'react';
import './Login.css';

export default function Login() {
    return (
        <>
            <div className='cont'>
                <div className='first'>
                    <div className='big'>
                        <h1>Real Time Chat </h1>
                        <div className='second'>
                            <input type={Text} placeholder="Enter Name" id="one"></input>
                        </div>
                        <div className='third'>
                            <input type={'password'} placeholder="Password" id="two"></input>
                        </div>

                        <button type='button' id="btn">Log In</button>
                        <div className='line'></div>
                        <a href='/register'><button type='button' id='btnacc'>Create new account</button></a>
                    </div>

                </div>
            </div>
        </>
    )
}

