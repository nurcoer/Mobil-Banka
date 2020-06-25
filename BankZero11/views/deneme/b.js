import React, {Component} from 'react';
import {Text} from 'react-native';

export default class b extends Component {
  render() {
    return (
      <Text onPress={() => this.props.navigation.navigate('Login')}>Hello b class</Text>
    );
  }
}
