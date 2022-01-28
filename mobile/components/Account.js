import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AuthContext from "../context/AuthContext";

const Account = () => {
  const context = React.useContext(AuthContext)
  const logout = async () => {
    try {
      await fetch("http://192.168.2.114:8000/logout")
        .then((res) => res.json())
        .then((data) => {
          if (data.isLoggedOut) {
            context.setIsAuthentificated(false);
          } else {
            console.log("Logout failed");
          }
        });
    } catch (error) {
      console.log("Ошибка", error);
    }
  };
  return (
    <View>
      <Text>Account</Text>
      <Button onPress={logout} title="Выйти" />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
