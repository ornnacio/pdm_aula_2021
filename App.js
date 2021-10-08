import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Image } from 'react-native';
import {
    Provider as PaperProvider,
    DefaultTheme,
    Appbar,
    Menu,
	Title,
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
import VideoScreen from "./screens/VideoScreen";


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
	
	const [isReady, setIsReady] = React.useState(false);
	
	useEffect(() => {
		try{
			setTimeout(() => setIsReady(false), 5000);
		} catch(e){
			console.log(e.message);
		}		
	});
	
    return (
		<View style={{
			flex: 1,
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'center'
		}}>
		
		{isReady ? <View style={{
				flex: 1,
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center'
			}}>
				<ActivityIndicator size='large' color="black"/>
				<Title>Carregando...</Title>
				<Image source={{uri: 'https://media1.giphy.com/media/THlB4bsoSA0Cc/200.gif'}} style={{width: 222, height: 200}} />
			</View> 
			: 
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
						<Stack.Screen name="Video" component={VideoScreen} />

					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		}
		</View>
	);
}
