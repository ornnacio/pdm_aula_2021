import * as React from "react";
import {
    Card,
    Divider,
    TextInput,
    Text,
    Title,
    Paragraph,
    Button,
    List,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../components/firebase";

export default class RegistrarUsuarioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            nome: null,
            cpf: null,
            telefone: null,
            email: null,
            password: null,
        };
    }

    registrar = async () => {
        const { nome, telefone, email, cpf, password } = this.state;

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // Signed in
                var usuarioRef = firebase.database().ref("usuario");
                await usuarioRef.push({
                    nome: nome,
                    telefone: telefone,
                    cpf: cpf,
                    email: email,
                    uid: userCredential.user.uid,
                }).then(() => {
                    console.log("inserido");
                }).catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });


        // this.props.navigation.navigate("Listagem de Contatos");
    };


    render() {
        return (
            <>
                <Title style={{ color: "red", textAlign: "center" }}>
                    Bem Vindo
                </Title>
                <TextInput
                    label="Nome"
                    value={this.state.nome}
                    onChangeText={(text) => this.setState({ nome: text })}
                />
                <TextInput
                    label="CPF"
                    value={this.state.cpf}
                    onChangeText={(text) => this.setState({ cpf: text })}
                />
                <TextInput
                    label="Telefone"
                    value={this.state.telefone}
                    onChangeText={(text) => this.setState({ telefone: text })}
                />
                <TextInput
                    label="Email"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    label="Senha"
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                />

                <Button mode="contained" onPress={() => this.registrar()}>
                    <Icon name="save"></Icon> Registrar
                </Button>

                <Button
                    mode="contained"
                    color="green"
                    onPress={() =>
                        this.props.navigation.navigate("Listagem de Contatos", {
                            //contatos: this.state.contatoList,
                        })
                    }
                >
                    <Icon name="arrow-left"></Icon> Voltar
                </Button>
            </>
        );
    }
}
/*
//exemplu usando função
function ContatoForm() {
  const [nome, setNum01] = useState(0);
  const [telefone, setNum02] = useState(0);
  const [total, setTotal] = useState(0);

  const somar = () => {
    setTotal(nome + telefone);
  };

  return (
    <View>
      <TextInput
        label="Número 01"
        name="nome"
        value={nome}
          onChange={ e => setNum01(e.target.value)}
      />
      <TextInput
        label="Número 02"
        name="nome"
        value={telefone}
        onChange={ e => setNum02(e.target.value)}
      />
      <Text>
        {total}
      </Text>
      <Button mode="contained" onPress={somar}>
        <Icon name="save" size={18} />
        Teste
      </Button>
    </View>
  );
} */
