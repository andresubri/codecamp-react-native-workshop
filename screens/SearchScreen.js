import React from "react";
import { Animated } from "react-native";
import { Container, Content } from "native-base";
import { debounce } from "lodash";
import SearchBar from "../components/SeachBar";
import Book from "../models/Book";
import ResultItem from "../components/ResultItem";

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.debouncedSearch = debounce(this.searchBook, 200);
    this.state = {
      query: "",
      results: [],
      opacity: new Animated.Value(0)
    };
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

  searchBook = async (query, index = 20) => {
    // Perform Search
    const search = await Book.search(query, index);

    // Set results
    if (search && search.ok) {
      const results = search.body.items.map(item =>
        Book.parseSearchResult(item)
      );

      this.setState({ results }, this.showResults);

      return;
    }
  };

  onChangeText = async (query, index = 20) => {
    this.hideResults();
    if (!query.length) {
      // Update input value
      this.setState({ query });

      // Cancel search
      this.debouncedSearch.cancel();

      return;
    }

    // Do search
    this.debouncedSearch(query, index);

    // Update input value
    this.setState({ query });
  };

  render() {
    const { query, results, opacity } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <SearchBar
          placeholder="Search"
          onChangeText={this.onChangeText}
          value={query}
          onBlur={this.debouncedSearch.flush}
        />
        <Content>
          <Animated.FlatList
            style={{ opacity }}
            keyExtractor={item => item.id}
            data={results}
            renderItem={({ item }) => (
              <ResultItem
                onPress={() => navigation.navigate("Book", { preview: item })}
                book={item}
              />
            )}
          />
        </Content>
      </Container>
    );
  }
}
