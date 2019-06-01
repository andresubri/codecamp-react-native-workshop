import React from 'react';
import { View, StyleSheet, WebView, Text } from "react-native";
import { Container } from "native-base";
import Header from "../components/Header";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <Container>
        <Header
          title='Bookshelf'
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
