import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class MapaScreens extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={{
                        latitude: -27.5942369,
                        longitude: -48.5453289,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    style={styles.map}>

                    <Marker title={"IFSC"} coordinate={{ latitude: -27.5942369, longitude: -48.5453289 }}>
                        <View style={{ backgroundColor: "red", padding: 2 }}>
                            <Text>IFSC</Text>
                        </View>
                    </Marker>
                    <Marker title={"UFSC - Centro Universitário"} coordinate={{ latitude: -27.600704, longitude: -48.5227843 }}>
                        <View style={{ backgroundColor: "green", padding: 2 }}>
                            <Text>UFSC</Text>
                        </View>
                    </Marker>

                    <Marker title={"Praia do Campeche"} coordinate={{ latitude: -27.6611965, longitude: -48.4819824 }}>
                    </Marker>
                </MapView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});