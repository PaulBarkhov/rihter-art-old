import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

const Login = ({ navigation, route }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

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
            await fetch("http://192.168.2.114:8000/login", {
                method: "POST",
                header: {
                    "Content-Type": "applications/json",
                },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.isAuthenticated) {
                        console.log('Logged in')
                    } else {
                        setErrorMessage(data.error)
                    }
                });
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.form}>
                <Text style={styles.header}>Войти</Text>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder='Электронная почта'
                    onChangeText={text => setUserData({ ...userData, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Пароль'
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
