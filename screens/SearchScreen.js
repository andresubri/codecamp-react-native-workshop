import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Container, Content } from "native-base";
import SearchBar from "../components/SeachBar";
import Book from "../models/Book";
import ResultItem from "../components/ResultItem";

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    query: "",
    results: []
  };

  searchBook = async (query, index) => {
    const search = await Book.search(query, index);
    const results = search.body.items.map(item => Book.parseSearchResult(item));
    this.setState({ query, results: [...this.state.results, ...results] });
  };

  render() {
    const { query, results } = this.state;
    return (
      <Container>
        <SearchBar
          onChangeText={query => this.searchBook(query, 20)}
          value={query}
        />
        <Content>
          <FlatList
            keyExtractor={item => item.id}
            data={results}
            renderItem={({ item }) => <ResultItem book={item} />}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 100,
    height: 80
  }
});
