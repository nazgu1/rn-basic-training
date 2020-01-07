import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class DetailsView extends React.Component {

  render() {

    return (
      <View style={styles.container} >
        <Text>TO DO</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
});
