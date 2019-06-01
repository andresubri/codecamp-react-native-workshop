import React from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import Book from "../models/Book";
import AnimatedImage from "../components/AnimatedImage";
import { Rating } from "react-native-ratings";

const NO_COVER_PLACEHOLDER = require("../assets/images/no-cover.jpg");

export default class BookScreen extends React.Component {
  // static navigationOptions = {
  //   header: null
  // };

  constructor(props) {
    super(props);

    const preview = props.navigation.getParam("preview");

    this.state = {
      book: new Book(),
      preview,
      opacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const { preview } = this.state;
    this.getBook(preview);
  }

  showResults = () => {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  hideResults = () => {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => this.setState({ results: [] }));
  };

  getBook = async preview => {
    // Get book
    const request = await Book.get(preview.id);

    // console.log(book);
    // Set results
    if (request && request.ok) {
      const book = Book.parseBook(request.body);

      this.setState({ book });
      return;
    }
    return;
  };

  render() {
    const { book, preview } = this.state;
    return (
      <Container>
        <Content>
          <View>
            <View style={styles.container}>
              <AnimatedImage
                style={styles.cover}
                source={book.cover ? { uri: book.cover } : NO_COVER_PLACEHOLDER}
              />
              <View style={styles.textContainer}>
                <Text numberOfLines={2}>{preview.title}</Text>
                <Text note numberOfLines={2}>
                  {preview.authors}
                </Text>
                <Rating
                  ratingCount={5}
                  imageSize={20}
                  style={{ alignSelf: 'flex-start', paddingVertical: 10 }}
                  readonly
                  startingValue={parseInt(book.ratingsCount)}
                />
              </View>
            </View>
            <Text style={styles.content}>
              {book.description}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginTop: 20,
    height: 200
  },
  textContainer: {
    justifyContent: "center",
    width: "50%",
    padding: 10
  },
  cover: {
    width: 130,
    height: 180
  },
  content: {
    flex: 1,
    alignSelf: "flex-start",
    padding: 20
  }
});
