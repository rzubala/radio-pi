import React, { useCallback, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { FlatList, View, StyleSheet} from 'react-native'

import TrackListItem from '../components/TrackListItem'
import Track from '../models/track'
import * as trackActions from "../store/actions/tracks";

const TracksOverviewScreen = props => {
    const tracks = useSelector(state => state.tracks.tracks);

    const dispatch = useDispatch()

    const loadTracks = useCallback(() => {
        dispatch(trackActions.loadTracks());
    }, [dispatch])

    useEffect(() => {
        loadTracks();
      }, [loadTracks]);

    return <View style={styles.screen}>
      <View style={styles.playlistContainer}>
        <FlatList
          keyExtractor={(item: Track) => item.id}
          data={tracks}
          renderItem={itemData => {
            return (
              <TrackListItem
                name={itemData.item.name}
                image={itemData.item.logoUrl}
                onSelect={() => {}}
              />
            );
          }}
        />
      </View>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    playlistContainer: {
    }
})

export const screenOptions = props => {
    return {
      headerTitle: "Streams"
    };
  };

export default TracksOverviewScreen