import React, { Component } from "react";
import {
  Container,
  Header as NBHeader,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
export default class Header extends Component {
  render() {
    const { title, rightAction, rightIcon, leftAction, leftIcon } = this.props;
    return (
      <NBHeader>
        <Left>
          <Button transparent onPress={leftAction}>
            <Icon name={leftIcon} />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          <Button transparent onPress={rightAction}>
            <Icon name={rightIcon} />
          </Button>
        </Right>
      </NBHeader>
    );
  }
}
