import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'


const LoginPage = () => {

    const [userData, setUserData] = React.useState({
        common: '',
        email: '',
        password: '',
    })

    const [errors, setErrors] = React.useState({
        email: '',
        password: ''
    })

    const context = React.useContext(AuthContext)

    const login = async () => {
        try {
            await fetch("http://rihter-art.ru/login", {
                method: "POST",
                header: {
                    "Content-Type": "applications/json",
                },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.isAuthenticated) {
                        context.setIsAuthentificated(true);
                    } else {
                        setErrors({ ...errors, common: data.error })
                    }
                });
        } catch (error) {
            console.log("Ошибка", error);
        }
    }

    return <div className='container'>
        <div className='loginDiv'>
            <img src={logo} alt="logo" className='logo' />

            <Form>
                <FormGroup >
                    <Label className='label' for="email">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                        invalid={errors.email.length > 0}
                    />
                    <FormFeedback invalid tooltip>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Label className='label' for="password">Пароль</Label>
                    <Input
                        name="password"
                        type="password"
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                    />
                </FormGroup>

                <button className='button' onClick={login}>Войти</button>
                <span>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></span>
            </Form>

        </div>
    </div>
}

export default LoginPage

