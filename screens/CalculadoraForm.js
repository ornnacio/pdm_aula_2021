import * as React from "react";
import { TextInput, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

export default class ContatoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num01: null, num02: null, result: null };
  }
  soma = () => {
    this.setState({
      result: parseInt(this.state.num01) + parseInt(this.state.num02),
    });
  };

  render() {
    return (
      <>
        <TextInput
          label="Numero 01"
          value={this.state.num01}
          onChangeText={(text) => this.setState({ num01: text })}
        />
        <TextInput
          label="Numero 02"
          value={this.state.num02}
          onChangeText={(text) => this.setState({ num02: text })}
        />
        <Text style={{ textAlign: "center", fontSize: 24 }}>
          {this.state.result}
        </Text>
        <Button mode="contained" onPress={() => this.soma()}>
          <Icon name="plus"></Icon> Calcular
        </Button>
      </>
    );
  }
}
/* 
//exemplu usando função
function ContatoForm() {
  const [num01, setNum01] = useState(0);
  const [num02, setNum02] = useState(0);
  const [total, setTotal] = useState(0);

  const somar = () => {
    setTotal(num01 + num02);
  };

  return (
    <View>
      <TextInput
        label="Número 01"
        name="num01"
        value={num01}
          onChange={ e => setNum01(e.target.value)}
      />
      <TextInput
        label="Número 02"
        name="num01"
        value={num02}
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
