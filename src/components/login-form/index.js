import React from 'react'
import PropTypes from 'prop-types';
import SideLayout from '../side-layout';
import { useState } from 'react';
import './style.css'

function LoginForm({ login, password, logIn, onLogin, error = null }) {
    const [userData, setUserData] = useState({
        login: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(userData);
    }
    return ( 
        <SideLayout padding="medium" side="start">
            <form className='LoginForm'>
                <h1 className='LoginForm-title'>Вход</h1>
                <div>
                    <label>{login}</label> <br/>
                    <input className='LoginForm-input' onChange={handleChange} name='login' type='text'/>
                </div>
                <div>
                    <label>{password}</label> <br/>
                    <input className='LoginForm-input' onChange={handleChange} name='password' type='password' />
                </div>
                {
                    error ? <div className='LoginForm-error'>{error}</div> : null
                }
                <button className='LoginForm-button' onClick={handleSubmit}>{logIn}</button>
            </form> 
        </SideLayout>
    );
}

LoginForm.propTypes = {
    login: PropTypes.string,
    password: PropTypes.string,
    logIn: PropTypes.string,
    onLogin: PropTypes.func
}

export default React.memo(LoginForm);