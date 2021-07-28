import React, { useState } from "react";
import {
    Provider as PaperProvider,
    DefaultTheme,
    Appbar,
    Menu,
} from "react-native-paper";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InicioScreens from "./screens/InicioScreens";
import ContatoForm from "./screens/ContatoForm";
import ContatoList from "./screens/ContatoList";
import RegistrarUsuarioForm from "./screens/RegistrarUsuarioForm";
import LoginForm from "./screens/LoginForm";
import MapaScreens from "./screens/MapaScreens";
import CameraScreen from "./screens/CameraScreen";
import LocalizacaoScreen from "./screens/LocalizacaoScreen";

const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    //  dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: "orange",
        accent: "green",
    },
};

function CustomNavigationBar({ navigation, previous }) {
    const route = useRoute();
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    console.log(visible);
    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={route.name} />
            {previous && route.name != "Registrar Usuário" ? (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="menu" color="white" onPress={openMenu} />
                    }
                >
                    <Menu.Item
                        onPress={() => {
                            console.log("Option 1 was pressed");
                        }}
                        title="Option 1"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log("Option 2 was pressed");
                        }}
                        title="Option 2"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log("Option 3 was pressed");
                        }}
                        title="Option 3"
                        disabled
                    />
                </Menu>
            ) : null}
        </Appbar.Header>
    );
}

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Início"
                    screenOptions={{
                        header: (props) => <CustomNavigationBar {...props} />,
                    }}
                >
                    <Stack.Screen name="Início" component={InicioScreens} />
                    <Stack.Screen name="Formulário Contato" component={ContatoForm} />
                    <Stack.Screen name="Registrar Usuário" component={RegistrarUsuarioForm} />
                    <Stack.Screen name="Login" component={LoginForm} />
                    <Stack.Screen name="Listagem de Contatos" component={ContatoList} />
                    <Stack.Screen name="Mapa" component={MapaScreens} />
                    <Stack.Screen name="Camera" component={CameraScreen} />
                    <Stack.Screen name="Localização" component={LocalizacaoScreen} />

                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
