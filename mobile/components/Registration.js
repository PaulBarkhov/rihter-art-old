import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView
} from "react-native";

const Registration = ({ navigation }) => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errorMessage, setErrorMessage] = useState('')

    const register = async () => {
        if (!userData.email) {
            setErrorMessage('Введите Email')
            return
        }
        if (!userData.password) {
            setErrorMessage('Введите пароль')
            return
        }
        if (!passwordConfirmation) {
            setErrorMessage('Повторите пароль')
            return
        }
        if (userData.password !== passwordConfirmation) {
            setErrorMessage('Пароли не совпадают')
            return
        }
        try {
            await fetch("http://192.168.2.114:8000/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "applications/json",
                },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.isRegistered) {
                        navigation.navigate('login')
                    } else {
                        setErrorMessage(data.error);
                    }
                });
        } catch (error) {
            console.log("Ошибка", error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.form}>
                <Text style={styles.header}>Регистрация</Text>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Повторите пароль"
                    onChangeText={(text) => setPasswordConfirmation(text)}
                />
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.text}>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "tomato",
    },
    form: {
        padding: 30,
        width: Dimensions.get("screen").width - 60,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 15,
    },
    header: {
        fontSize: 30,
        marginBottom: 30,
        fontFamily: "sans-serif",
        fontWeight: "700",
        color: "black",
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        width: "100%",
        padding: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "white",
        fontFamily: "sans-serif",
    },
    button: {
        backgroundColor: "red",
        width: "100%",
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    text: {
        textAlign: "center",
        color: "white",
        fontFamily: "sans-serif",
        fontSize: 16,
        fontWeight: "700",
    },
});
