import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { ListItem, Thumbnail, Text, Left, Body, Right } from "native-base";
import PropTypes from "prop-types";
import Book from "../models/Book";

export default class ResultItem extends Component {
  static propTypes = {
    book: PropTypes.instanceOf(Book).isRequired
  };

  render() {
    const { book } = this.props;
    return (
      <TouchableHighlight thumbnail style={styles.container}>
        <View style={styles.container}>
          <Thumbnail style={styles.cover} square source={{ uri: book.cover }} />
          <View style={styles.textContainer}>
            <Text numberOfLines={2}>{book.title}</Text>
            <Text note numberOfLines={2}>
              {book.authors}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    height: 120
  },
  textContainer: {
    justifyContent: 'center',
    width: '85%',
    padding: 10,
  },
  cover: {
    width: 60,
    height: 100
  }
});
