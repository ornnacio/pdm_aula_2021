import * as React from "react";
import { StyleSheet } from "react-native";
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

export default class ContatoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contatoList: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const { route } = this.props;
    if (route.params) {
      const { contatos } = route.params;

      this.setState({ contatoList: contatos });
    }

    console.log(this.state.contatoList);
  };

  filtrar = () => {
    let novoContato = this.state.contatoList.filter(
      (item) => item.nome.length > 4
    );

    this.setState({ contatoList: novoContato });
  };

  render() {
    return (
      <>
        <Button mode="contained" color="red" onPress={() => this.filtrar()}>
          <Icon name="filter"></Icon> Filtrar
        </Button>

        <Button mode="contained" color="green" onPress={() => this.getData()}>
          <Icon name="retweet"></Icon> Atualizar
        </Button>
        <Card>
          <Card.Content>
            <List.Section>
              <List.Subheader>Listagem Contatos</List.Subheader>

              {this.state.contatoList?.map((item, i) => (
                <>
                  <Divider />
                  <Title>{item.nome}</Title>
                  <Paragraph>{item.telefone}</Paragraph>
                  <Paragraph>{item.dataNascimento}</Paragraph>
                  <Divider />
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
