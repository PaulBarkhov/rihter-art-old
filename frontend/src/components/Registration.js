import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input, FormFeedback, Col, Row } from 'reactstrap'

const Registration = () => {

    const [userData, setUserData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        language: '',
        password: ''
    })

    const [errors, setErrors] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        language: '',
        password: '',
        repeatPassword: '',
        check: ''
    })

    const [repeatPassword, setRepeatPassword] = React.useState('')
    const [check, setCheck] = React.useState(false)

    const handleClick = (e) => {
        e.preventDefault()

        const errorsCopy = Object.assign({}, errors)

        if (!check) errorsCopy.check = 'Подтвердите согласие'
        if (!repeatPassword) errorsCopy.repeatPassword = 'Повторите пароль'
        if (!userData.password) errorsCopy.password = 'Укажите пароль'
        if (!userData.language) errorsCopy.language = 'Выберите Язык'
        if (!userData.birthDate) errorsCopy.birthDate = 'Укажите дату'
        if (!userData.email) errorsCopy.email = 'Введите Email'
        if (!userData.lastName) errorsCopy.lastName = 'Введите фамилию'
        if (!userData.firstName) errorsCopy.firstName = 'Введите имя'

        setErrors(errorsCopy)
    }

    const validate = (e) => {
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        switch (e.target.name) {
            case 'email':
                const emailFormat = /[!#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/;

                if (emailFormat.test(e.target.value)) setErrors({ ...errors, email: 'Недопустимые символы' })
                else {
                    setErrors({ ...errors, email: "" })
                    setUserData({ ...userData, email: e.target.value })
                }
                break
            case 'firstName':

                if (format.test(e.target.value)) setErrors({ ...errors, firstName: 'Недопустимые символы' })
                else {
                    setErrors({ ...errors, firstName: '' })
                    setUserData({ ...userData, firstName: e.target.value })
                }
                break

            case 'lastName':
                if (format.test(e.target.value)) setErrors({ ...errors, lastName: 'Недопустимые символы' })
                else {
                    setErrors({ ...errors, lastName: '' })
                    setUserData({ ...userData, lastName: e.target.value })
                }
                break
            case 'password':
                if (e.target.value.length !== 0 && e.target.value.length < 8) setErrors({ ...errors, password: 'Менее 8 символов' })
                break
            case 'repeatPassword':
                if (e.target.value !== userData.password) setErrors({ ...errors, repeatPassword: 'Пароли не совпадают' })
                break
            default: break
        }
    }

    return <div className='container'>
        <div className="loginDiv">
            <img src={logo} alt="logo" className='logo' />
            <h1 className='mb-5'>Регистрация</h1>
            <Form>
                <Row >
                    <FormGroup className="position-relative col-sm-6 mb-4">
                        <Label className='label' for="firstName">Имя</Label>
                        {errors.firstName && <span className='inputError'>{errors.firstName}</span>}
                        <Input
                            className={errors.firstName ? "redBorder" : ""}
                            name="firstName"
                            type="text"
                            maxLength={50}
                            onChange={e => validate(e)}
                        />
                    </FormGroup>

                    <FormGroup className="position-relative col-sm-6 mb-4">
                        <Label className='label' for="lastName">Фамилия</Label>
                        {errors.lastName && <span className='inputError'>{errors.lastName}</span>}
                        <Input
                            className={errors.lastName ? "redBorder" : ""}
                            name="lastName"
                            type="text"
                            maxLength={50}
                            onChange={e => validate(e)}
                        />

                    </FormGroup>
                </Row>

                <FormGroup className="position-relative mb-4">
                    <Label className='label' for="email">Электронная почта</Label>
                    {errors.email && <span className='inputError'>{errors.email}</span>}
                    <Input
                        className={errors.email ? "redBorder" : ""}
                        name="email"
                        type="email"
                        maxLength={62}
                        onChange={e => validate(e)}
                    />


                </FormGroup>

                <Row>

                    <FormGroup className="position-relative col-sm-6 mb-4">
                        <Label className='label' for="birthDate">Дата рождения</Label>
                        {errors.birthDate && <span className='inputError'>{errors.birthDate}</span>}
                        <Input
                            className={errors.birthDate ? "redBorder" : ""}
                            name="birthDate"
                            type="date"
                            onChange={e => setUserData({ ...userData, birthDate: e.target.value })}
                        />

                    </FormGroup>

                    <FormGroup className="position-relative col-sm-6 mb-4">
                        <Label className='label' for="language">Язык</Label>
                        {errors.language && <span className='inputError'>{errors.language}</span>}
                        <Input
                            className={errors.language ? "redBorder" : ""}
                            name="language"
                            type="select"
                            onChange={e => setUserData({ ...userData, language: e.target.value })}
                        >
                            <option>Русский</option>
                            <option>Английский</option>
                        </Input>

                    </FormGroup>

                </Row>

                <FormGroup className="position-relative mb-4">
                    <Label className='label' for="password">Пароль</Label>
                    {errors.password && <span className='inputError'>{errors.password}</span>}
                    <Input
                        className={errors.password ? "redBorder" : ""}
                        name="password"
                        type="password"
                        maxLength={256}
                        onChange={e => {
                            if (errors.password === "Укажите пароль" || e.target.value.length >= 8) {
                                setErrors({ ...errors, password: '' })
                                setUserData({ ...userData, password: e.target.value })
                            }
                        }}
                        onBlur={e => validate(e)}
                    />
                </FormGroup>
                <FormGroup className="position-relative mb-4">
                    <Label className='label' for="repeatPassword">Повторите пароль</Label>
                    {errors.repeatPassword && <span className='inputError'>{errors.repeatPassword}</span>}
                    <Input
                        className={errors.repeatPassword ? "redBorder" : ""}
                        name="repeatPassword"
                        type="password"
                        maxLength={256}
                        onChange={e => {
                            if (errors.repeatPassword === 'Повторите пароль') setErrors({ ...errors, repeatPassword: '' })
                            if (e.target.value === userData.password) {
                                setErrors({ ...errors, repeatPassword: '' })
                                setRepeatPassword(e.target.value)
                            }
                        }}
                        onBlur={e => validate(e)}
                    />

                </FormGroup>
                <FormGroup check className="position-relative mb-5">
                    {errors.check && <span className='inputError'>{errors.check}</span>}
                    <Input
                        className="input"
                        style={{ bottom: 0 }}
                        type="checkbox"
                        onChange={e => {
                            if (e.target.checked) setErrors({ ...errors, check: '' })
                            setCheck(e.target.checked)
                        }}
                    />
                    <Label check>Согласие на получение рассылок по почте</Label>
                </FormGroup>
                <button className='button' onClick={e => handleClick(e)}>Зарегистрироваться</button>
                <div className="textCenter"><span>Уже есть аккаунт? <Link to="/login">Войти</Link></span></div>

            </Form>
        </div>
    </div>
}

export default Registration
