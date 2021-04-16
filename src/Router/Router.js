import React from 'react';
import {Modal, Text, View} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './Screens/HomeScreen';
import DrawingScreen from './Screens/DrawingScreen';

const StackNavigation = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  DrawingScreen: {
    screen: DrawingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(StackNavigation);
