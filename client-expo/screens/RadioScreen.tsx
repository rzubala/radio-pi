import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator
} from "react-native";
import NetInfo from '@react-native-community/netinfo';

import * as trackActions from "../store/actions/tracks";
import * as configActions from "../store/actions/config";
import MainButton from "../components/UI/MainButton";
import { Colors } from "../constants/colors";
import { play, stop, addToPlaylist, ping } from "../radio/rest-service";
import Track from "../models/track";
import TrackListItem from "../components/TrackListItem";

const RadioScreen = props => {
  const [connected, setConnected] = useState(false);
  const [playingId, setPlayingId] = useState("");
  const [waitForStreams, setWaitForStreams] = useState(false)
  const radioUrl = useSelector(state => state.config.ip);

  const tracks = useSelector(state => state.tracks.tracks);

  const dispatch = useDispatch();

  const loadTracks = useCallback(() => {
    dispatch(trackActions.loadTracks());
  }, [dispatch]);

  const checkNetwork = useCallback(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.type !== 'wifi' || !state.isConnected) {
        Alert.alert("Network error!", "Please check your WiFi connection.", [
          { text: "OK" }
        ]);
      }
    });
    unsubscribe();
  }, [])

  useEffect(() => {
    checkNetwork()
  }, [checkNetwork])

  const fetchRadioUrl = useCallback(() => {
    dispatch(configActions.getConfig());
  }, [dispatch]);

  const pingServer = useCallback(
    async (initial: boolean) => {
      try {
        const pingData = await ping(radioUrl);
        if (initial && pingData && pingData.streamId) {
          setPlayingId(pingData.streamId);
        }
        setConnected(true);
      } catch (err) {
        setConnected(false);
        Alert.alert(
          "Error",
          `No connection to radio: ${radioUrl}`,
          [
            { text: "Try again", onPress: () => pingServer(initial) },
            {
              text: "Change address",
              onPress: () => props.navigation.navigate("Settings")
            }
          ],
          { cancelable: false }
        );
      }
    },
    [ping, radioUrl, setConnected, setPlayingId]
  );

  useEffect(() => {
    fetchRadioUrl();
    loadTracks();
  }, [dispatch, loadTracks, fetchRadioUrl]);

  useEffect(() => {
    if (radioUrl !== "") {
      pingServer(true);
    }
  }, [radioUrl, pingServer]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadTracks);
    return () => {
      unsubscribe();
    };
  }, [loadTracks]);

  const playHandler = async (stream: string, id: string) => {
    pingServer(false);
    if (!connected) {
      return;
    }
    await stop(radioUrl);
    await addToPlaylist(radioUrl, stream, id);
    await play(radioUrl);
    setPlayingId(id);
  };

  const stopHandler = async () => {
    pingServer(false);
    if (!connected) {
      return;
    }
    await stop(radioUrl);
    setPlayingId(null);
  };

  const onAddDefaultsHandler = () => {
    dispatch(trackActions.createDefaultTracks())
    setWaitForStreams(true)
  }

  if (tracks.length === 0) {
    return (
      <View style={{...styles.screen, justifyContent: 'center'}}>
        {waitForStreams 
        ? <ActivityIndicator size="large" color={Colors.primary} />
        : <MainButton
          buttonStyle={{ backgroundColor: Colors.accent }}
          onPress={onAddDefaultsHandler}
        >
          Add streams
        </MainButton>}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.playlistContainer}>
        <FlatList
          keyExtractor={(item: Track) => item.id}
          data={tracks}
          renderItem={itemData => {
            return (
              <TrackListItem
                name={itemData.item.name}
                image={itemData.item.logoUrl}
                style={
                  itemData.item.id === playingId
                    ? {
                        borderColor: Colors.primary,
                        borderWidth: 3
                      }
                    : {}
                }
                onSelect={() => {
                  playHandler(itemData.item.url, itemData.item.id);
                }}
              />
            );
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
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
    justifyContent: "space-between",
    alignItems: "center"
  },
  playlistContainer: {
    flex: 7,
    width: "100%"
  },
  buttonsContainer: {
    flex: 1,
    width: "50%",
    justifyContent: "flex-end",
    paddingBottom: 20
  },
  buttonContainer: {
    height: "100%",
    justifyContent: "flex-end"
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export const screenOptions = props => {
  return {
    headerTitle: "Radio"
  };
};

export default RadioScreen;
