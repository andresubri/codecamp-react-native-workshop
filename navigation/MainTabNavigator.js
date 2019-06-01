import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SearchScreen from '../screens/SearchScreen';
import BookScreen from '../screens/BookScreen';
import BookshelfScreen from '../screens/BookshelfScreen';

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Book: BookScreen,
}, {
  headerMode: 'none'
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-search`
          : 'md-search'
      }
    />
  ),
};

const BooshelfStack = createStackNavigator({
  Booshelf: BookshelfScreen,
  Book: BookScreen,
}, {
  headerMode: 'none'
});

BooshelfStack.navigationOptions = {
  tabBarLabel: 'Bookshelf',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

export default createBottomTabNavigator({
  SearchStack,
  BooshelfStack,
});
