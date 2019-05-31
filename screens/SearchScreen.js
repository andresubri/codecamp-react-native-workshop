import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import SearchBar from "../components/SeachBar";
export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: <SearchBar />
  };

  render() {
    return (
      <Container>
        <Content>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/robot-dev.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  }
});
