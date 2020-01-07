import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';

import {
  List,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

import Packages from '../services/package';

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
        {this.state.loading && (
          <ActivityIndicator animating={true} color={Colors.red800} />
        )}

        {!this.state.loading && (
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <List.Item
                onPress={() =>
                  this.props.navigation.navigate('Details')
                }
                titleStyle={styles.title}
                title={item}
                left={props => (
                  <List.Icon {...props} style={styles.icon} icon="package" />
                )}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {},
});
