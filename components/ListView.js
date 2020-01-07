import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import {
  List,
  ActivityIndicator,
  Colors,
  Portal,
  Dialog,
  TextInput,
  Button,
  IconButton,
} from 'react-native-paper';

import Packages from '../services/package';

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '{ Package tracker }',
      headerRight: () => (
        <IconButton
          icon="plus"
          color={Colors.red500}
          size={30}
          onPress={navigation.getParam('addPackage')}
        />
      ),
    };
  };

  packageService = new Packages();

  state = {
    data: [],
    loading: true,
    addingPackage: false,
    number: '',
    refreshing: false,
  };

  async fetchData() {
    this.setState({ loading: true });
    this.setState({ data: await this.packageService.fetch() });
    this.setState({ loading: false });
  }

  async refreshData() {
    this.setState({ refreshing: true });
    this.setState({ data: await this.packageService.fetch() });
    this.setState({ refreshing: false });
  }

  addPackage() {
    this.setState({ addingPackage: true, number: '' });
  }

  finishAddingPackage() {
    this.setState({ addingPackage: false });
    if (this.state.number && this.state.number.length > 0) {
      this.packageService.addPackage(this.state.number);
    }
    this.fetchData();
  }

  cancelAddingPackage() {
    this.setState({ addingPackage: false });
  }

  componentDidMount() {
    this.fetchData();
    this.props.navigation.setParams({ addPackage: this.addPackage.bind(this) });
  }

  render() {
    return (
      <Portal.Host>
        <View style={styles.container}>
          <Portal>
            <Dialog
              visible={this.state.addingPackage}
              onDismiss={this.cancelAddingPackage.bind(this)}>
              <Dialog.Title>Add package</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="number"
                  value={this.state.number}
                  onChangeText={number => this.setState({ number })}
                  keyboardType="number-pad"
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={this.finishAddingPackage.bind(this)}>
                  Done
                </Button>
                <Button onPress={this.cancelAddingPackage.bind(this)}>
                  Cancel
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          {this.state.loading && (
            <ActivityIndicator animating={true} color={Colors.red800} />
          )}

          {!this.state.loading && (
            <FlatList
              onRefresh={this.refreshData.bind(this)}
              refreshing={this.state.refreshing}
              data={this.state.data}
              renderItem={({ item }) => (
                <List.Item
                  onPress={() =>
                    this.props.navigation.navigate('Details', {
                      number: item.key,
                      item: item,
                    })
                  }
                  titleStyle={styles.title}
                  title={item.key}
                  description={item.status}
                  left={props => (
                    <List.Icon {...props} style={styles.icon} icon="package" />
                  )}
                />
              )}
            />
          )}
        </View>
      </Portal.Host>
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
