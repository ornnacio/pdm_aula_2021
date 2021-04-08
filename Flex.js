import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Flex = () => {
  return (
    <View style={[styles.container]}>
      <View
        style={{
          flex: 1,
          backgroundColor: "red",
          // width: 100,
          height: 50,
        }}
      >
        <Text style={styles.texto}>Olá </Text>
        <View
          style={{
            backgroundColor: "yellow",
            width: 150,
            height: 100,
            alignSelf: "flex-end",
          }}
        >
          <Text>Sub-Texto </Text>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "darkorange",
          // width: 100,
          height: 50,
        }}
      >
        <Text style={styles.texto}>Olá </Text>
        <View
          style={{
            backgroundColor: "yellow",
            width: 150,
            height: 100,
            alignSelf: "flex-end",
          }}
        >
          <Text>Sub-Texto </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "green",
          //width: 100,
          height: 100,
        }}
      >
        <Text style={styles.texto}>Olá </Text>
        <View
          style={{
            backgroundColor: "yellow",
            width: 150,
            height: 100,
            alignSelf: "flex-end",
          }}
        >
          <Text>Sub-Texto </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Try setting `flexDirection` to `"row"`.
    flexDirection: "column",
    //  alignItems: "center",
    alignContent: "stretch",
  },
  texto: {
    marginLeft: 40,
    marginTop: 40,
    color: "white",
    fontWeight: "bold",
  },
});

export default Flex;
