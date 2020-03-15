import React from "react";
import { Text, View, StyleSheet } from "react-native";

const SettingsScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Settings screen</Text>
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

export default SettingsScreen;
