import * as React from "react";
import {
    Card,
    Divider,
    TextInput,
    Text,
    Title,
    Paragraph,
    Button,
    List, Snackbar
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../components/firebase";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            visible: false,
            msg: "",
        };
    }

    logar = async () => {
        const { email, password } = this.state;
        let msg = "";
        if (email != null && password != null) {
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(async () => {
                    // Signed in
                    console.log("Login - OK");
                    this.props.navigation.navigate("Início");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    if (errorCode == "auth/invalid-email") {
                        msg = "Email esta fora do formato padrão ou senha errada!";

                    } else if (errorCode == "auth/email-already-exists") {
                        msg = "Email já esta cadastrado!";

                    } else if (errorCode == "auth/wrong-password") {
                        msg = "Senha invalida, tente novamente!";

                    } else if (errorCode == "auth/user-not-found") {
                        msg = "Usuário não encontrado!";

                    } else if (errorCode == "auth/email-already-in-use") {
                        msg = "Email já esta cadastrado!";

                    } else if (errorCode == "auth/too-many-requests") {
                        msg = "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login com falha. Você pode imediatamente restaurá-lo redefinindo sua senha ou você pode tentar novamente mais tarde!";

                    } else {
                        msg = errorMessage;
                    }

                    this.setState({ msg: msg, visible: true })
                    console.log(errorCode);
                    console.log(errorMessage);
                    //
                });
        } else {
            this.setState({ msg: "Email ou senha vazios!", visible: true })
        }

    };
    onToggleSnackBar = () => { this.setState(!this.state.visible) };

    onDismissSnackBar = () => this.setState({ visible: false });

    render() {
        return (
            <>
                <Title style={{ color: "red", textAlign: "center" }}>
                    Bem Vindo
                </Title>
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

                <Button mode="contained" onPress={() => this.logar()}>
                    <Icon name="save"></Icon> Logar
                </Button>
                <Button mode="contained" color="green" onPress={() =>
                    this.props.navigation.navigate("Registrar Usuário")
                }>
                    <Icon name="user-plus"></Icon> Registrar
                </Button>
                <Snackbar
                    visible={this.state.visible}
                    onDismiss={() => this.onDismissSnackBar()}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    {this.state.msg}
                </Snackbar>
            </>
        );
    }
}