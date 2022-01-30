import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return <div className='container'>
        <div className='loginDiv'>
            <img src={logo} alt="logo" className='logo' />
            <input type="email" className="input" placeholder='Электронная почта' />
            <input type="password" className="input" placeholder='Пароль' />
            <button className='button'>Войти</button>
            <span>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></span>
        </div>
    </div>
}

export default LoginPage

