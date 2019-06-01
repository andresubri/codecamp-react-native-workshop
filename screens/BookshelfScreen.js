import React from 'react';
import { FlatList, StyleSheet } from "react-native";
import { NavigationEvents } from 'react-navigation';
import { Container } from "native-base";
import Header from "../components/Header";
import ResultItem from "../components/ResultItem";
import Book from "../models/Book";

export default class BookshelfScreen extends React.Component {
  state = {
    books: [],
  };

  getBooks = async () => {
    const books = await Book.loadAll();
    this.setState({ books });
  }

  render() {
    const { books } = this.state;
    return (
      <Container>
        <NavigationEvents onWillFocus={() => this.getBooks()} />
        <Header
          title='Bookshelf'
        />
        <FlatList
            keyExtractor={item => item.id}
            data={books}
            renderItem={({ item }) => (
              <ResultItem
                onPress={() => navigation.navigate("Book", { preview: item })}
                book={item}
              />
            )}
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
