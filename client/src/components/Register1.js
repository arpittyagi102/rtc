import React from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const navigate=useNavigate();
    return (
        <>
            <div className='cont'>
                <div className='first'>
                    <div className='big'>
                        <h1>Real Time Chat </h1>
                        <div className='second'>
                            <input type={Text} placeholder="Enter Name" id="one"></input>
                        </div>
                        <div className='big'>
                            <div className='second'>
                                <input type={Text} placeholder="Email" id="one"></input>
                            </div>
                        </div>

                        <div className='third'>
                            <input type={'password'} placeholder="Password" id="two"></input>
                        </div>
                        <div className='third'>
                            <input type={'password'} placeholder="Confirm Password" id="two"></input>
                        </div>

                        <button type='button' id="btn">Register</button>

                    </div>

                </div>
            </div>
        </>
    )
}
