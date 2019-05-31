import React, { Component } from "react";
import { Platform } from "react-native";
import { Header, Item, Input, Icon } from "native-base";

export default class SearchBar extends Component {
  render() {
    return (
        <Header searchBar rounded>
          <Item>
            <Icon name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
            <Input
              {...this.props}
            />
          </Item>
        </Header>
    );
  }
}
