import React from 'react';
import { Animated } from 'react-native';

class AnimatedImage extends React.Component {
  state = { opacity: new Animated.Value(0) };

  _onLoadEnd = () => {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { opacity } = this.state;
    const { props } = this;
    return (
      <Animated.Image
        {...props}
        onLoadEnd={this._onLoadEnd}
        style={{
          ...props.style,
          opacity,
        }}
      />
    );
  }
}

export default AnimatedImage;
