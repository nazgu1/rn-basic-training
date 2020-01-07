import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Packages from './services/package';

export default class App extends React.Component {
  packageService = new Packages();

  state = {
    data: [],
    loading: true,
  };

  async fetchData() {
    this.setState({ loading: true });
    this.setState({ data: await this.packageService.fetch() });
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{(this.state.data || []).count()}</Text>
        <Text>{(this.state.loading) ? 'Loading…' : 'Loaded.'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
