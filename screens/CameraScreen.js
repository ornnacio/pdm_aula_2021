
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/FontAwesome";

export default class CameraScreen extends React.Component {
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
        image: null,
    }
    async componentDidMount() {
        this.getPermission();
    }

    getPermission = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Hey! You might want to enable notifications for my app, they are good.');
            }
        }
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === "granted" });
    };


    selecionarImagem = async () => {
        this.getPermission();

        if (this.state.hasPermission) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                console.log(result.uri);
                this.setState({ image: result.uri });
            }
        }

    }
    tirarFoto = async () => {
        this.getPermission();

        if (this.state.hasPermission) {
            const options = { quality: 0.5, base64: true };
            const foto = await this.camera.takePictureAsync(options);
            console.log(foto.uri);
            this.setState({ image: foto.uri });
        }

    }

    mudarCamera = () => {
        this.setState({
            type:
                this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        });
    }

    render() {
        const { hasPermission, type } = this.state;

        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>Sem acesso a Câmera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={type} ref={(ref) => {
                        this.camera = ref;
                    }}>
                        <View style={{ flex: 1, margin: 30 }}>
                            {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                        </View>
                        <View style={{
                            flex: 1, flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: 30
                        }} >
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent'
                                }}
                                onPress={() => {
                                    this.mudarCamera();
                                }}>
                                <Icon name="random" color="white" size={50} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent'
                                }}
                                onPress={() => {
                                    this.tirarFoto();
                                }}>
                                <Icon name="circle" color="white" size={50} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent'
                                }}
                                onPress={() => {
                                    this.selecionarImagem();
                                }}>
                                <Icon name="image" color="white" size={50} />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    };
}