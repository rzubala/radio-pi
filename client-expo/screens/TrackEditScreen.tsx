import React, { useReducer, useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as tracksActions from '../store/actions/tracks'
import Track from "../models/track";
import Input from "../components/UI/Input";
import HeaderButton from "../components/UI/HeaderButton";
import { Colors } from '../constants/colors'

const FORM_INPUT_UPDATE = "UPDATE";
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
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidaties
    };
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
    inputValidities: {
      name: track ? true : false,
      logoUrl: track ? true : false,
      streamUrl: track ? true : false
    },
    formIsValid: track ? true : false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, isValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: isValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

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
        await tracksActions.updateTrack(track.id, formState.inputValues.name, formState.inputValues.logoUrl, formState.inputValues.streamUrl)
      } else {
        await tracksActions.insertTrack(formState.inputValues.name, formState.inputValues.logoUrl, formState.inputValues.streamUrl)
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  }, [submitHandler]);

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
  const routeParams = navData.route.params ? navData.route.params : {}
  return {
    headerTitle: routeParams.item
    ? "Edit track"
    : "Add track",
  };
};

export default TrackEditScreen;
