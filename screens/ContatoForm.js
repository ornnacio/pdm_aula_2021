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

export default class ContatoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      telefone: null,
      dataNascimento: null,
      contatoList: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    let contato = {
      nome: this.state.nome,
      telefone: this.state.telefone,
      dataNascimento: this.state.dataNascimento,
    };

    if (this.state.nome) {
      this.setState({ contatoList: [...this.state.contatoList, contato] });
    }

    this.setState({
      nome: null,
      telefone: null,
      dataNascimento: null,
    });
    console.log(this.state.contatoList);
  };

  render() {
    return (
      <>
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

        <Button mode="contained" onPress={() => this.getData()}>
          <Icon name="save"></Icon> Salvar
        </Button>
        <Card>
          <Card.Content>
            <List.Section>
              <List.Subheader>Listagem Contatos</List.Subheader>

              {this.state.contatoList.map((item, i) => (
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
