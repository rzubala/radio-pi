import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  View,
  StyleSheet,
  Platform,
  Button,
  Alert
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import HeaderButton from "../components/UI/HeaderButton";
import MainButton from "../components/UI/MainButton";

import { Colors } from "../constants/colors";
import TrackListItem from "../components/TrackListItem";
import Track from "../models/track";
import * as trackActions from "../store/actions/tracks";

const TracksOverviewScreen = props => {
  const tracks = useSelector(state => state.tracks.tracks);

  const dispatch = useDispatch();

  const loadTracks = useCallback(() => {
    dispatch(trackActions.loadTracks());
  }, [dispatch]);

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadTracks);
    return () => {
      unsubscribe();
    };
  }, [loadTracks]);

  const onItemSelected = (track: Track) => {
    props.navigation.navigate("EditTrack", {
      item: track
    });
  };

  const deleteHandler = id => {
    Alert.alert("Are you sure?", "Do you want to delete?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(trackActions.deleteTrack(id));
        }
      }
    ]);
  };

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
                onSelect={() => {
                  onItemSelected(itemData.item);
                }}
              >
                <MainButton
                  onPress={() => deleteHandler(itemData.item.id)}                  
                  buttonStyle={{ backgroundColor: Colors.alert, paddingVertical: 5, paddingHorizontal: 10 }}
                >
                  <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
              </TrackListItem>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  playlistContainer: {}
});

export const screenOptions = navigationData => {
  return {
    headerTitle: "Streams",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navigationData.navigation.navigate("EditTrack");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default TracksOverviewScreen;
