import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

import { Colors } from '../constants/colors'
import { addToPlaylist, clearPlaylist, play, stop } from '../radio/service'

const RadioScreen = props => {
  const radioUrl = 'http://192.168.0.3:6680' 
  const streamUrl = 'http://redir.atmcdn.pl/sc/o2/Eurozet/live/meloradio.livx'

  const playHandler = () => {
    clearPlaylist(radioUrl)
    addToPlaylist(radioUrl, streamUrl)
    play(radioUrl)
  }

  const stopHandler = () => {
    stop(radioUrl)
  }

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button title="Play" color={Colors.primary} onPress={playHandler} />
        <Button title="Stop" color={Colors.accent} onPress={stopHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    width: '50%',
    height: '20%',
    justifyContent: "space-between"
  }
});

export const screenOptions = props => {
  return {
    headerTitle: "Radion"
  }
}

export default RadioScreen;
2