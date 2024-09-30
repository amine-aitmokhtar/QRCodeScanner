import React, { Component } from "react";
import Dimensions from "Dimensions";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  View
} from "react-native";

import spinner from "../assets/images/loading.gif";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    //Add fetching user logic and modify logic accordingly
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      this.props.onPress();
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN]
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>{this.props.text}</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: changeScale }] }]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6e275e",
    height: 50,
    borderRadius: 20,
    zIndex: 100,
    borderWidth: 2,
    borderColor: "#fff"
  },
  circle: {
    height: 50,
    width: 50,
    marginTop: -50,
    borderWidth: 1, 
    borderColor: "#fff",
    borderRadius: 100,
    alignSelf: "center",
    zIndex: 99,
    backgroundColor: "#fff"
  },
  text: {
    color: "white",
    fontFamily: "Ubuntu-Medium",
    backgroundColor: "transparent"
  },
  image: {
    width: 24,
    height: 24
  }
});
