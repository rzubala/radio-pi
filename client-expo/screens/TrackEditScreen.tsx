import React, { useReducer } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const TrackEditScreen = props => {
  const track = props.route.params ? props.route.params.track : null;

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
