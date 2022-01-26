import React from "react";
import AuthStack from "./routes/AuthStack";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {

  return (
    <NavigationContainer >
      <AuthStack />
    </NavigationContainer>
  )
}

