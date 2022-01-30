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

    const handleClick = () => {

    }

    const validate = (e) => {
        switch (e.target.name) {
            case 'email':
                if (e.target.value && !e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    setErrors({ ...errors, email: 'Неправильный Email' })
                    break
                }
                break
            case 'firstName':
                const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

                if (format.test(e.target.value)) {
                    setErrors({ ...errors, firstName: 'Недопустимые символы' })
                    console.log('it works')
                    break
                }
                else {
                    setErrors({ ...errors, firstName: '' })
                    break
                }
            default: break
        }
    }

    return <div className='container'>
        <div className="loginDiv">
            <img src={logo} alt="logo" className='logo' />
            <Form>
                <Row>
                    <Col>
                        <FormGroup className="position-relative">
                            <Label for="firstName">Имя</Label>
                            <Input
                                name="firstName"
                                type="text"
                                onChange={e => validate(e)}
                                // onChange={e => setUserData({ ...userData, firstName: e.target.value })}
                                invalid={errors.firstName.length > 0}
                            />
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                            <FormFeedback invalid tooltip>{errors.firstName}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="lastName">Фамилия</Label>
                            <Input
                                name="lastName"
                                type="text"
                                onChange={e => setUserData({ ...userData, lastName: e.target.value })}
                            />
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                            <FormFeedback invalid>Error</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup className="position-relative">
                    <Label for="email">Электронная почта</Label>
                    <Input
                        name="email"
                        type="email"
                        onChange={e => {
                            if (e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) setErrors({ ...errors, email: "" })
                            setUserData({ ...userData, email: e.target.value })
                        }}
                        onBlur={e => validate(e)}
                        valid={userData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)}
                        invalid={errors.email.length > 0}
                    />

                    <FormFeedback valid></FormFeedback>
                    <FormFeedback invalid tooltip>{errors.email}</FormFeedback>
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="birthDate">Дата рождения</Label>
                            <Input
                                name="birthDate"
                                type="date"
                                onChange={e => setUserData({ ...userData, birthDate: e.target.value })}
                            />
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                            <FormFeedback invalid>Error</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="language">Язык</Label>
                            <Input
                                name="language"
                                type="select"
                                onChange={e => setUserData({ ...userData, language: e.target.value })}
                            >
                                <option>Русский</option>
                                <option>Английский</option>
                            </Input>
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                            <FormFeedback invalid>Error</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Label for="password">Пароль</Label>
                    <Input
                        name="password"
                        type="password"
                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="repeatPassword">Повторите пароль</Label>
                    <Input
                        name="repeatPassword"
                        type="password"
                        onChange={e => setRepeatPassword(e.target.value)}
                    />
                    <FormFeedback valid>Sweet! that name is available</FormFeedback>
                    <FormFeedback invalid>Error</FormFeedback>
                </FormGroup>
                <FormGroup check style={{ marginLeft: '10px', marginBottom: '10px' }}>
                    <Input type="checkbox" onChange={e => setCheck(e.target.checked)} />
                    <FormFeedback valid>Sweet! that name is available</FormFeedback>
                    <FormFeedback invalid>Error</FormFeedback>
                    <Label check>Согласие на получение рассылок по почте</Label>
                </FormGroup>
                <button className='button' onClick={handleClick}>Войти</button>
                <div className="textCenter"><span>Уже есть аккаунт? <Link to="/login">Войти</Link></span></div>
            </Form>
        </div>
    </div>
}

export default Registration
