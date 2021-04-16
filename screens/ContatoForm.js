import * as React from "react";
import { TextInput } from "react-native-paper";

export default class ContatoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num01: null };
  }

  render() {
    return (
      <>
        <TextInput
          label="Numero 01"
          value={this.state.num01}
          onChangeText={(text) => this.setState({ num01: text })}
        />
      </>
    );
  }
}
