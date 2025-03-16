import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from 'expo';
import HomeScreen from "./src/home/page";
import ConnectionScreen from "./src/connection/page";
import LibraryScreen from "./src/library/page";
import { RootStackParamList } from "./src/types";
import SettingsPage from "./src/settings/page";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Connection">
      <Stack.Screen name="Connection" component={ConnectionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={ConnectionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsPage} options={{ headerShown: false }} />
      <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

registerRootComponent(App);
