import React from "react";
import { Text, View, StyleSheet } from "react-native";

const RadioScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Radio screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export const screenOptions = props => {
  return {
    headerTitle: "Radion"
  }
}

export default RadioScreen;
