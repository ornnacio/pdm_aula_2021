
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Icon from "react-native-vector-icons/FontAwesome";

export default class CameraScreen extends React.Component {
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back
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

    tirarFoto = async () => {
        this.getPermission();

        if (this.state.hasPermission) {
            const options = { quality: 0.5, base64: true };
            const foto = await this.camera.takePictureAsync(options);
            console.log(foto.uri);
        }

    }

    mudarCamera = () => {
        this.setState({
            type:
                type === Camera.Constants.Type.back
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
                        </View>
                    </Camera>
                </View>
            );
        }
    };
}