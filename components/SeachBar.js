import React, { Component } from 'react';
import { Platform } from 'react-native'
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
} from 'native-base';
export default class SearchBar extends Component {
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
            <Input placeholder='Search' />
          </Item>
        </Header>
      </Container>
    );
  }
}
