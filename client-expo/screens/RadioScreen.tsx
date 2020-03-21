import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Alert } from "react-native";

import MainButton from "../components/MainButton";
import { Colors } from "../constants/colors";
import { play, stop, addToPlaylist, ping } from "../radio/rest-service";

//const radioUrl = "http://192.168.0.3:6680"; //mopidy
//const radioUrl = "http://192.168.0.3:3000";
const radioUrl = "http://192.168.0.5:3000";
//const streamUrl = "http://redir.atmcdn.pl/sc/o2/Eurozet/live/meloradio.livx";
const streamUrl = "http://stream4.nadaje.com:8002/muzo";

const RadioScreen = props => {
  const [waitForPlaying, setWaitForPlaying] = useState(false);
  const [connected, setConnected] = useState(false)

  const pingServer = useCallback(async () => {
    try {
      await ping(radioUrl);
      setConnected(true)
    } catch (err) {
      setConnected(false)
      Alert.alert(
        "Error",
        `No connection to radio: ${radioUrl}`,
        [{ text: "Try again", onPress: () => pingServer() }],
        { cancelable: false }
      );
    }
  }, [ping, radioUrl, setConnected]);

  useEffect(() => {
    pingServer();
  }, [pingServer]);

  const playHandler = async () => {
    setWaitForPlaying(true);
    pingServer()
    if (!connected) {
      return
    }
    await addToPlaylist(radioUrl, streamUrl);
    await play(radioUrl);
    setWaitForPlaying(false);
  };

  const stopHandler = () => {
    pingServer()
    if (!connected) {
      return
    }
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
