import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const TrackEditScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Track Edit Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export const screenOptions = props => {
    return {
      headerTitle: "Edit screen"
    };
  };

export default TrackEditScreen;
