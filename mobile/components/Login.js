import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import AuthContext from '../context/AuthContext'

const Login = ({ navigation, route }) => {
    const [errorMessage, setErrorMessage] = React.useState('')
    const [userData, setUserData] = React.useState({
        email: '',
        password: ''
    })

    const context = React.useContext(AuthContext)

    const login = async () => {
        if (!userData.email) {
            setErrorMessage('Введите Email')
            return
        }
        if (!userData.password) {
            setErrorMessage('Введите Пароль')
            return
        }
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
                        setErrorMessage(data.error)
                    }
                });
        } catch (error) {
            console.log("Ошибка", error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.form}>
                <Text style={styles.header}>Войти</Text>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={text => setUserData({ ...userData, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={text => setUserData({ ...userData, password: text })}
                />
                <TouchableOpacity onPress={login} style={styles.button}><Text style={styles.text}>Login</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('registration')} style={{ flexDirection: 'row' }}><Text>Нет аккаунта? </Text><Text style={{ color: 'blue' }}>Регистрация</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
    },
    form: {
        padding: 30,
        width: Dimensions.get('screen').width - 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15
    },
    header: {
        fontSize: 30,
        marginBottom: 30,
        fontFamily: 'sans-serif',
        fontWeight: '700',
        color: 'black'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        fontFamily: 'sans-serif'
    },
    button: {
        backgroundColor: 'red',
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,

    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: 16,
        fontWeight: '700'
    }
})
