import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login';
import Registration from '../components/Registration';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='registration' component={Registration} />
        </Stack.Navigator>
    )
}

export default AuthStack

