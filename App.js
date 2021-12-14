
import React from "react";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); // Ignore all log notifications by message

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher order component(pattern design) */}
      <AuthProvider>
        {/* Passes down the auth to children */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
    
  );
}