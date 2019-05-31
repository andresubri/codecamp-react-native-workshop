import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Container, Content } from "native-base";
import { debounce } from "lodash";
import SearchBar from "../components/SeachBar";
import Book from "../models/Book";
import ResultItem from "../components/ResultItem";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedSearch = debounce(this.searchBook, 500);
  }
  static navigationOptions = {
    header: null
  };

  state = {
    query: "",
    results: []
  };

  
  searchBook = async (query, index = 20) => {
    const search = await Book.search(query, index);
    if (search && search.ok) {
      const results = search.body.items.map(item =>
        Book.parseSearchResult(item)
      );
      this.setState({ query, results });
      return;
    }
  };
  
  onChangeText = async (query, index = 20) => {
    if (!query.length) {
      this.setState({ query });
      return;
    }
    this.debouncedSearch(query, index);
    this.setState({ query });
  };

  render() {
    const { query, results } = this.state;
    return (
      <Container>
        <SearchBar
          onChangeText={this.onChangeText}
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
