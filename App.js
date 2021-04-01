import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Image, TextInput, Button, StyleSheet } from "react-native";

import styles from "./estilo";

const Carro = (props) => {
  return (
    <View style={[props.direcao]}>
      <Text style={props.styleCarro}>Seu carro é {props.nome}</Text>
    </View>
  );
};

const mensagem = (texto) => {
  return alert("Sua mensagem: " + texto);
};
export default function App() {
  const [descricao, setDescricao] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.azul}>Hello world!</Text>
      <Image
        source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }}
        style={{ width: 200, height: 200 }}
      />
      <Carro
        nome="Camaro"
        styleCarro={{ backgroundColor: "gray", color: "yellow" }}
        direcao={{ alignSelf: "flex-start" }}
      />
      <Carro
        nome="Corsa"
        styleCarro={{
          backgroundColor: "orange",
          color: "green",
        }}
        direcao={{ alignSelf: "flex-end" }}
      />
      <TextInput
        style={{ borderWidth: 1, height: 40, width: 200, borderColor: "gray" }}
        placeholder="Nome"
        onChangeText={(text) => setDescricao(text)}
      />
      <Text style={styles.vermelho}>{descricao}</Text>
      <Text style={stylesScreen.textoDescricao}>
        Descrição teste teste teste teste teste teste
      </Text>
      <Button
        style={{ backgroundColor: "green" }}
        title="Clique Aqui"
        color="green"
        onPress={() => mensagem(descricao)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const stylesScreen = StyleSheet.create({
  textoDescricao: {
    backgroundColor: "#c8c8c8",
    color: "orange",
  },
});
