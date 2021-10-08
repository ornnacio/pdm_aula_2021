import * as React from "react";
import { TouchableOpacity, Image, Dimensions } from "react-native";
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
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import semImagem from "../assets/sem_imagem.png";

export default class ContatoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            nome: null,
            telefone: null,
            dataNascimento: null,
            hasPermission: null,
            image: null,
        };
    }
    async componentDidMount() {
        await this.carrregarDados();
    }

    salvar = async () => {

        let contato = {
            id: this.state.id,
            nome: this.state.nome,
            telefone: this.state.telefone,
            dataNascimento: this.state.dataNascimento,
            imagem: this.state.image,
        };

        if(contato.imagem){
            contato.imagem = await this.uploadImagem(this.state.image);
        }

        if (contato.id != null) {

            var usuarioRef = firebase.database().ref("usuario/" + contato.id);

            usuarioRef.update({
                nome: contato.nome,
                telefone: contato.telefone,
                dataNascimento: contato.dataNascimento,
                imagem: contato.imagem
            }).then(() => {
                console.log("Atualizado");
            }).catch((error) => {
                console.log(error);
            });

        } else {

            var usuarioRef = firebase.database().ref("usuario");

            usuarioRef.push({
                nome: contato.nome,
                telefone: contato.telefone,
                dataNascimento: contato.dataNascimento,
                imagem: contato.imagem
            }).then(() => {
                console.log("inserido");
            }).catch((error) => {
                console.log(error);
            });
        }

        console.log(usuarioRef);

        this.setState({
            nome: null,
            telefone: null,
            dataNascimento: null,
        });

        this.props.navigation.navigate("Listagem de Contatos");
    };

    carrregarDados() {
        let { route } = this.props;

        if (route.params) {
            let { contato } = route.params;

            if (contato.id != null) {
                this.setState({
                    id: contato.id,
                    nome: contato.nome,
                    telefone: contato.telefone,
                    dataNascimento: contato.dataNascimento,
                });
            }
        }
        console.log(contato);
        console.log("teste rotas");
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

    uploadImagem = async(uri) => {
        try{
            const r = await fetch(uri);
            const blob = await r.blob(uri);

            let n = new Date();
            let dateTime = n.getFullYear() + '_' + (n.getMonth() + 1) + '_' + n.getDate() + '_' +
            n.getHours() + '_' + n.getMinutes() + '_' + n.getSeconds();

            let path = 'images/' + dateTime;
         
            return new Promise((res, rej) => {
                firebase.storage().ref()
                    .child(path)
                    .put(blob)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((u) => {
                            res({url: u, path: path});
                        })
                    })

            })
        }catch(e){
            console.log(e);
        }
    }

    render() {
        const { route } = this.props;
        const { key, nome } = route.params;
        if (route.params) {
            console.log(key);
            console.log(nome);
        }
        return (
            <>
                <TouchableOpacity 
                    onPress={() => this.selecionarImagem()}
                    style={{
                        width: 150,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        marginVertical: 15,
                    }}
                >
                    <Image 
                        source={this.state.image ? {uri: this.state.image} : semImagem}
                        style={{
                            width: "100%",
                            height: 150,
                            resizeMode: "contain",
                        }} 
                    />
                    <Text>Clique para adicionar imagem</Text>
                </TouchableOpacity>
                <Title style={{ color: "red", textAlign: "center" }}>
                    Bem Vindo {nome ? nome : ""}
                </Title>
                <TextInput
                    label="Nome"
                    value={this.state.nome}
                    onChangeText={(text) => this.setState({ nome: text })}
                />
                <TextInput
                    label="Telefone"
                    value={this.state.telefone}
                    onChangeText={(text) => this.setState({ telefone: text })}
                />
                <TextInput
                    label="Data Nascimento"
                    value={this.state.dataNascimento}
                    onChangeText={(text) => this.setState({ dataNascimento: text })}
                />

                <Button mode="contained" onPress={() => this.salvar()}>
                    <Icon name="save"></Icon> Salvar
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
