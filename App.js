import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
/* import Hello from "./screens/Hello";
import Flex from "./Flex"; */
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
    accent: "blue",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Title>Card Vitoria</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>
            <Icon name="address-card" color="blue" size={24} /> Ok
          </Button>
        </Card.Actions>
      </Card>
    </PaperProvider>
  );
}
