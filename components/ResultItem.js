import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Text } from "native-base";
import AnimatedImage from "./AnimatedImage";

const NO_COVER_PLACEHOLDER = require("../assets/images/no-cover.jpg");

export default class ResultItem extends Component {
  render() {
    const { book, onPress } = this.props;
    return (
      <TouchableHighlight
        onPress={onPress}
        thumbnail
        underlayColor='transparent'
        style={styles.container}
      >
        <View style={styles.container}>
          <AnimatedImage
            style={styles.cover}
            source={book.cover ? { uri: book.cover } : NO_COVER_PLACEHOLDER}
          />
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
    justifyContent: "center",
    width: "85%",
    padding: 10
  },
  cover: {
    width: 60,
    height: 100
  }
});
