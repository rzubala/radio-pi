import React, { useReducer, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";

import Track from "../models/track";
import Input from "../components/UI/Input";

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

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"      
    >
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

export const screenOptions = props => {
  return {
    headerTitle: "Edit screen"
  };
};

export default TrackEditScreen;
