import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Image, TextInput, Button } from "react-native";

import styles from "./estilo";

const Carro = (props) => {
  return (
    <View>
      {console.log(props)}
      <Text style={props.styleCarro}>Seu carro é {props.nome}!</Text>
    </View>
  );
};

const mensagem = (props) => {
  return alert("Teste " + props);
};
export default function App() {
  const [descricao, setDescricao] = useState("");

  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <Image
        source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }}
        style={{ width: 200, height: 200 }}
      />
      <Carro nome="Gol" styleCarro={styles.azulao} />
      <Carro nome="Corsa" styleCarro={styles.vermelhinho} />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="Nome Qualquer"
        onChangeText={(text) => setDescricao(text)}
        //defaultValue="Nome qualquer"
      />
      <Text style={{ color: "red", fontSize: 30 }}>{descricao}</Text>

      <Button
        title="Clique aqui"
        onPress={() => {
          mensagem(descricao);
        }}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}
