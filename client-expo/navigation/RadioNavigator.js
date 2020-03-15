import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RadioScreen from '../screens/RadioScreen'
import SettingsScreen from '../screens/SettingsScreen'

const RadioNavigatorTab = createBottomTabNavigator();
export const RadioNavigator = () => {
  return (
    <RadioNavigatorTab.Navigator>
      <RadioNavigatorTab.Screen name="Radio" component={RadioScreen} />
      <RadioNavigatorTab.Screen name="Settings" component={SettingsScreen} />
    </RadioNavigatorTab.Navigator>
  );
};
