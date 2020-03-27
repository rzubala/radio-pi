import React, { useReducer, useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  Share,
  Clipboard
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as tracksActions from "../store/actions/tracks";
import Track from "../models/track";
import Input from "../components/UI/Input";
import HeaderButton from "../components/UI/HeaderButton";
import { Colors } from "../constants/colors";

const FORM_INPUT_UPDATE = "UPDATE";
const FORM_TO_SET_UPDATE = "FORM_TO_SET_UPDATE"

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidaties = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidaties) {
      updatedFormIsValid = updatedFormIsValid && updatedValidaties[key];
    }
    const toSetValues = {
      ...state.toSet,
      [action.input]: action.toSet
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidaties,
      toSet: toSetValues
    };
  } else if (action.type === FORM_TO_SET_UPDATE) {
    const toSetValues = {
      ...state.toSet,
      [action.input]: action.toSet
    }
    return {
      ...state,
      toSet: toSetValues
    }
  }  
  return state;
};

const TrackEditScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const track: Track = props.route.params ? props.route.params.item : null;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: track ? track.name : "",
      logoUrl: track ? track.logoUrl : "",
      streamUrl: track ? track.url : ""
    },
    toSet: {
      name: '',
      logoUrl: '',
      streamUrl: ''
    },
    inputValidities: {
      name: track ? true : false,
      logoUrl: track ? true : false,
      streamUrl: track ? true : false
    },
    formIsValid: track ? true : false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, isValidity, toSetValue) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: isValidity,
        input: inputIdentifier,
        toSet: toSetValue
      });
    },
    [dispatchFormState]
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `name:${track.name};stream:${track.url};logo:${track.logoUrl}`          
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "OK" }
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (track) {
        await tracksActions.updateTrack(
          track.id,
          formState.inputValues.name,
          formState.inputValues.logoUrl,
          formState.inputValues.streamUrl
        );
      } else {
        await tracksActions.insertTrack(
          formState.inputValues.name,
          formState.inputValues.logoUrl,
          formState.inputValues.streamUrl
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [formState]);

  const onImportFromClipboard = async () => {
    const value = await Clipboard.getString()
    if (value.length === 0) {
      Alert.alert("Wrong input!", "Clipboard does not contain valid stream data", [
        { text: "OK" }
      ]);
      return;
    }
    const regex = /name:([^;]+);stream:([^;]+);logo:(.*)/gm;
    let m;
    while ((m = regex.exec(value)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            let input = null
            switch (groupIndex) {
            case 1:
              input = 'name'
              break;
            case 2:
              input = 'streamUrl'
              break;
            case 3:
              input = 'logoUrl'
              break;
            }
            if (input) {
              dispatchFormState({
                type: FORM_TO_SET_UPDATE,
                input: input,
                toSet: match
              });
            }
        });
    }
  }

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          {track && (
            <Item
              title="Share"
              iconName={Platform.OS === "android" ? "md-share" : "ios-share"}
              onPress={onShare}
            />
          )}
          {!track && (
            <Item
            title="Share"
            iconName={Platform.OS === "android" ? "md-clipboard" : "ios-clipboard"}
            onPress={onImportFromClipboard}
          />
          )}
          <Item
            title="Save"
            iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  }, [submitHandler, onImportFromClipboard, onShare]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "OK" }]);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="Name"
            id="name"
            initialValue={track ? track.name : ""}
            initiallyValid={!!track}
            onInputChange={inputChangeHandler}
            newValue={formState.toSet.name}
            errorText="Please enter a valid name"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            required
          />
          <Input
            label="Stream Url"
            id="streamUrl"
            initialValue={track ? track.url : ""}
            initiallyValid={!!track}
            onInputChange={inputChangeHandler}
            newValue={formState.toSet.streamUrl}
            errorText="Please enter a valid stream Url"
            keyboardType="default"
            returnKeyType="next"
            required
          />
          <Input
            label="Logo Url"
            id="logoUrl"
            initialValue={track ? track.logoUrl : ""}
            initiallyValid={!!track}
            onInputChange={inputChangeHandler}
            newValue={formState.toSet.logoUrl}
            errorText="Please enter a valid logo Url"
            keyboardType="default"
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.item ? "Edit track" : "Add track"
  };
};

export default TrackEditScreen;
