import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../constants/colors";
import RadioScreen, {
  screenOptions as RadioScreenOptions
} from "../screens/RadioScreen";
import SettingsScreen, {
  screenOptions as SettingsScreenOptions
} from "../screens/SettingsScreen";

const defaultNavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontWeight: "bold"
  },
  headerBackTitleStyle: {
    fontWeight: "normal"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const RadioNavigatorStack = createStackNavigator();
export const RadioStackNavigator = props => {
  return (
    <RadioNavigatorStack.Navigator screenOptions={defaultNavOptions}>
      <RadioNavigatorStack.Screen
        name="RadioScreen"
        component={RadioScreen}
        options={RadioScreenOptions}
      />
    </RadioNavigatorStack.Navigator>
  );
};

const SettingsNavigatorStack = createStackNavigator();
export const SettingsStackNavigator = props => {
  return (
    <SettingsNavigatorStack.Navigator screenOptions={defaultNavOptions}>
      <SettingsNavigatorStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={SettingsScreenOptions}
      />
    </SettingsNavigatorStack.Navigator>
  );
};

const tabBarScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Radio") {
      iconName = focused ? "md-radio" : "md-radio";
    } else if (route.name === "Settings") {
      iconName = focused ? "ios-list-box" : "ios-list";
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  }
})

const RadioNavigatorTab = createBottomTabNavigator();
export const RadioNavigator = () => {
  return (
    <RadioNavigatorTab.Navigator
      screenOptions={tabBarScreenOptions}
      tabBarOptions={{        
        activeBackgroundColor: Platform.OS == 'android' ? Colors.primary : "",
        inactiveBackgroundColor: Platform.OS == 'android' ? Colors.primary : "",
        activeTintColor: Platform.OS == 'android' ? "white" : Colors.primary,
        inactiveTintColor: Colors.inactive
      }}
    >
      <RadioNavigatorTab.Screen name="Radio" component={RadioStackNavigator} />
      <RadioNavigatorTab.Screen
        name="Settings"
        component={SettingsStackNavigator}
      />
    </RadioNavigatorTab.Navigator>
  );
};
