import * as React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
    Card,
    Divider,
    TextInput,
    Text,
    Title,
    Paragraph,
    Button,
    List,
    FAB,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../components/firebase";

export default class ContatoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            contatoList: [],
        };
    }
    async componentDidMount() {

        await this.getData();
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getData();
        });
    }
    getData = async () => {

        var ref = firebase.database().ref("usuario");
        var vetorTemp = [];

        await ref.on("value", function (snapshot) {
            if (snapshot) {
                snapshot.forEach((child) => {
                    vetorTemp.push({
                        id: child.key,
                        nome: child.val().nome,
                        telefone: child.val().telefone,
                        dataNascimento: child.val().dataNascimento
                    });
                    console.log(vetorTemp);
                })

            }
        }, (error) => {
            console.log("Error: " + error.code);
        });
        this.setState({ contatoList: vetorTemp });


        console.log(this.state.contatoList);
    };

    filtrar = () => {
        let novoContato = this.state.contatoList.filter(
            (item) => item.nome.length > 4
        );

        this.setState({ contatoList: novoContato });
    };

    remover = (key) => {
        var usuarioRef = firebase.database().ref("usuario/" + key);

        usuarioRef.remove().then(() => {
            console.log("Removido" + key);
        }).catch((error) => {
            console.log(error);
        });

        this.getData();
    };

    pesquisar = async (text) => {
        if (text != '') {
            const newArray = this.state.contatoList.filter((item) => {
                const itemDado = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
                //console.log(text);
                const textDado = text.toUpperCase();

                return itemDado.indexOf(textDado) > -1;
            });
            this.setState({
                contatoList: newArray,
                search: text,
            });
        } else {
            await this.getData();
            this.setState({ search: null });
        }

    }

    render() {
        return (
            <>


                {/*              <Button mode="contained" color="red" onPress={() => this.filtrar()}>
                    <Icon name="filter"></Icon> Filtrar
        </Button>

                <Button mode="contained" color="green" onPress={() => this.getData()}>
                    <Icon name="retweet"></Icon> Atualizar
        </Button> */}
                <TextInput
                    label="Pesquisar"
                    value={this.state.search}
                    onChangeText={(text) => this.pesquisar(text)}
                />
                <Card>
                    <Card.Content>
                        <List.Section>
                            <List.Subheader>Listagem Contatos</List.Subheader>

                            {this.state.contatoList?.map((item, i) => (
                                <>
                                    <TouchableOpacity
                                        onLongPress={() => {
                                            Alert.alert(
                                                "Remover Usuário",
                                                "Deseja realmente remover o registro?",
                                                [
                                                    {
                                                        text: "Cancel",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    { text: "OK", onPress: () => this.remover(item.id) }
                                                ]
                                            );
                                        }
                                        }
                                        onPress={() => {
                                            let objContato = {
                                                id: item.id,
                                                nome: item.nome,
                                                telefone: item.telefone,
                                                dataNascimento: item.dataNascimento,
                                            };

                                            this.props.navigation.navigate("Formulário Contato", {
                                                contato: objContato
                                            });
                                        }}
                                    >
                                        <Divider />
                                        <Paragraph>{i + 1}</Paragraph>
                                        <Title>{item.nome}</Title>
                                        <Paragraph>{item.telefone}</Paragraph>
                                        <Paragraph>{item.dataNascimento}</Paragraph>
                                        <Divider />
                                    </TouchableOpacity>
                                </>
                            ))}
                        </List.Section>
                    </Card.Content>
                </Card>
                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    onPress={() =>
                        this.props.navigation.navigate("Formulário Contato", {
                            key: "",
                            nome: "Jackson",
                            contato: "",
                            contatos: this.state.contatoList,
                        })
                    }
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "orange",
    },
});

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
