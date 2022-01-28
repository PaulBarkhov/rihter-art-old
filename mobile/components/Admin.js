import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

const Admin = () => {
    return (
        <WebView source={{
            uri: 'http://192.168.2.114:8000/admin/login/?next=/admin/'
        }}/>
    )
}

export default Admin

const styles = StyleSheet.create({})
