import React, { useState } from "react";
import "react-native-gesture-handler";
import DrawerNavigator from "./routes/Drawer";
import AuthStack from "./routes/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./context/AuthContext";

export default function App() {
  const [isAuthenticated, setIsAuthentificated] = useState(true);

  return (
    <AuthContext.Provider value={{ setIsAuthentificated }}>
      <NavigationContainer >
        {isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


