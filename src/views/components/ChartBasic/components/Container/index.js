import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../../style';

export default class App extends Component {
  render() {
    return (
      <View style={[styles.container, {width: this.props.width,height:this.props.height}]}>
        {this.props.children}
      </View>
    );
  }
}
