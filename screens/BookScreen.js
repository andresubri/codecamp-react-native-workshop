import React from "react";
import { Animated, View, StyleSheet, WebView, Text } from "react-native";
import { Container } from "native-base";
import Book from "../models/Book";
import AnimatedImage from "../components/AnimatedImage";
import { Rating } from "react-native-ratings";
import Header from "../components/Header";

const NO_COVER_PLACEHOLDER = require("../assets/images/no-cover.jpg");

export default class BookScreen extends React.Component {
  constructor(props) {
    super(props);

    const preview = props.navigation.getParam("preview");

    this.state = {
      book: new Book(),
      preview,
      exist: false,
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

    // Set results
    if (request && request.ok) {
      const book = Book.parseBook(request.body);
      
      const exist = await Book.exist(book);

      this.setState({ book, exist });
      return;
    }
    return;
  };

  addOrRemoveFavorite = () => {
    const { book, exist } = this.state;
    
    if (exist) { 
      Book.remove(book);
      this.setState({ exist: !exist })
      return;
    } 

    Book.save(book);
    
    this.setState({ exist: !exist })
  }

  render() {
    const { book, exist, preview } = this.state;
    const { navigation } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Header
          title={book.title}
          rightAction={this.addOrRemoveFavorite}
          rightIcon={exist ? "ios-heart" : "ios-heart-empty"}
          leftAction={() => navigation.goBack()}
          leftIcon="arrow-back"
        />
        <View style={styles.container}>
          <AnimatedImage
            style={styles.cover}
            source={preview.cover ? { uri: preview.cover } : NO_COVER_PLACEHOLDER}
          />
          <View style={styles.textContainer}>
            <Text numberOfLines={2}>{preview.title}</Text>
            <Text note numberOfLines={2}>
              {preview.authors}
            </Text>
            <Rating
              ratingCount={5}
              imageSize={20}
              style={{ alignSelf: "flex-start", paddingVertical: 10 }}
              readonly
              startingValue={parseInt(book.ratingsCount)}
            />
          </View>
        </View>
        <WebView
          style={styles.content}
          source={{ html: book.description }}
          scalesPageToFit={false}
        />
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
    alignSelf: "center",
    padding: 20,
    width: "95%"
  }
});
