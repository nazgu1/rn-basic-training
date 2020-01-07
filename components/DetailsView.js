import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class DetailsView extends React.Component {
  state = {
    item: {},
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('number', 'N/A'),
    };
  };

  componentWillMount() {
    this.setState({ item: this.props.navigation.getParam('item', {}) });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state.item)}</Text>
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
