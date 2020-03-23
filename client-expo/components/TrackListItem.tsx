import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

import { Colors } from '../constants/colors'
import Card from "./UI/Card";

const TrackListItem = props => {
  const TouchableComponent: any =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;
  return (
    <Card style={{...styles.track, ...props.style}}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View style={styles.trackRow}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} resizeMode="center" source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
                <Text style={styles.trackName}>{props.name}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  track: {
    margin: 10,
    height: 100
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden"
  },
  trackRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  details: {
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  trackName: {
    fontSize: 18,
    marginVertical: 2,
    color: Colors.primary,
    fontWeight: 'bold'
  },
  actions: {
    width: "20%",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5
},
});

export default TrackListItem;
