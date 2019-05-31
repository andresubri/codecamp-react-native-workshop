import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import PropTypes from "prop-types";
import Book from "../models/Book";

export default class ResultItem extends Component {
  static propTypes = {
    book: PropTypes.instanceOf(Book).isRequired
  };

  render() {
    const { book } = this.props;
    return (
      <ListItem thumbnail style={styles.container}>
        <Left>
          <Thumbnail square source={{ uri: book.cover }} />
        </Left>
        <Body>
          <Text>{book.title}</Text>
          <Text note numberOfLines={1}>
            {book.description}
          </Text>
        </Body>
        <Right>
          <Button transparent>
            <Text>View</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70
  }
});
