import React, { useState } from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InicioScreens from "./screens/InicioScreens";
import ContatoForm from "./screens/ContatoForm";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
    accent: "blue",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Início">
          <Stack.Screen name="Início" component={InicioScreens} />
          <Stack.Screen name="Formulário Contato" component={ContatoForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
