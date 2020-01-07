import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Linking } from 'expo';

import {
  Card,
  Button,
  Paragraph,
  Title,
} from 'react-native-paper';

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
    let { item } = this.state;

    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{item.key}</Title>
            <Paragraph>{item.status}</Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri:
                'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=65',
            }}
          />
          <Card.Actions>
            <Button
              onPress={() => {
                Linking.openURL(
                  `https://inpost.pl/sledzenie-przesylek?number=${item.key}`
                );
              }}>
              See details…
            </Button>
          </Card.Actions>
        </Card>
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
