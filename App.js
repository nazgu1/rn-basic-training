import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ListView from './components/ListView';
import DetailsView from './components/DetailsView';

const AppNavigator = createStackNavigator({
  Home: {
    screen: ListView,
  },
  Details: {
    screen: DetailsView,
  },
});

export default createAppContainer(AppNavigator);