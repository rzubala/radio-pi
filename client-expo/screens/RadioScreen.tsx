import React, { useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

//import RNEventSource from 'react-native-event-source'

import MainButton from "../components/MainButton";
import { Colors } from "../constants/colors";
//import { addToPlaylist, clearPlaylist, play, stop } from "../radio/mopidy-service";
import { play, stop, addToPlaylist } from "../radio/rest-service";

//const radioUrl = "http://192.168.0.3:6680";
const radioUrl = "http://192.168.0.3:3000";
//const radioUrl = "http://192.168.0.5:3000";
const streamUrl = "http://redir.atmcdn.pl/sc/o2/Eurozet/live/meloradio.livx";

//const source = new EventSource(`${radioUrl}/mopidy/rpc`);
//source.addEventListener('track_playback_started', playbackStarted, false);

// const eventSource = new RNEventSource(`${radioUrl}/mopidy/rpc`);
// eventSource.addEventListener('track_playback_started', (event) => {
//   console.log(event.type); // message
//   console.log(event.data);
// });

const RadioScreen = props => {
  const [waitForPlaying, setWaitForPlaying] = useState(false);

  const playHandler = async () => {
    setWaitForPlaying(true);
    // clearPlaylist(radioUrl);
    await addToPlaylist(radioUrl, streamUrl);
    await play(radioUrl);
    setWaitForPlaying(false);
  };

  const stopHandler = () => {
    stop(radioUrl);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          {waitForPlaying ? (
            <ActivityIndicator color={Colors.primary} size="small" />
          ) : (
            <MainButton onPress={playHandler}>Play</MainButton>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            buttonStyle={{ backgroundColor: Colors.accent }}
            onPress={stopHandler}
          >
            Stop
          </MainButton>
        </View>
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
  buttonsContainer: {
    width: "50%",
    height: "50%",
    justifyContent: "space-around"
  },
  buttonContainer: {
    height: "100%"
  }
});

export const screenOptions = props => {
  return {
    headerTitle: "Radion"
  };
};

export default RadioScreen;
