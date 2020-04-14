import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Slider,
  KeyboardAvoidingView,
  I18nManager
} from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import i18n from '../constants/strings';

import Input from "../components/UI/Input";
import MainButton from "../components/UI/MainButton";
import * as configActions from "../store/actions/config";
import {
  restart,
  shutdown,
  setVolume as setServiceVolume
} from "../radio/rest-service";

const SettingsScreen = props => {
  const [newUrl, setNewUrl] = useState("");
  const [urlFetched, setUrlFetchedUrl] = useState(false);
  const [volume, setVolume] = useState(100);
  const storedIpAddress = useSelector(state => state.config.ip);

  const dispatch = useDispatch();

  const fetchIpAddress = useCallback(() => {
    dispatch(configActions.getConfig());
  }, [dispatch]);

  useEffect(() => {
    fetchIpAddress();
  }, [fetchIpAddress]);

  useEffect(() => {
    if (storedIpAddress) {
      setNewUrl(storedIpAddress);
      setUrlFetchedUrl(true)
    }
  }, [setUrlFetchedUrl, setNewUrl, storedIpAddress]);

  const onIpAddressChanged = (_, inputValue) => {
    setNewUrl(inputValue);
  };

  const saveConfig = () => {
    dispatch(configActions.saveConfig(newUrl));
    props.navigation.navigate("Radio");
  };

  const displayAlert = () => {
    Alert.alert("Error", `No connection to radio: ${storedIpAddress}`, [
      { text: "OK" }
    ]);
  };

  const sendCommand = useCallback(
    async method => {
      try {
        const result = await method();
      } catch (err) {
        console.log("send err", err);
        displayAlert();
      }
    },
    [restart, shutdown, setServiceVolume]
  );

  const onRestartHandler = () => {
    sendCommand(() => restart(storedIpAddress));
  };

  const onShutdownHandler = () => {
    sendCommand(() => shutdown(storedIpAddress));
  };

  const onValueChangeHandler = (value: number) => {
    sendCommand(() => setServiceVolume(storedIpAddress, value));
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <View style={styles.screen}>
        <View style={styles.formControl}>
          {urlFetched && <Input
            label={i18n.t('RadioURL')}
            id="url"
            initialValue={newUrl}
            initiallyValid={true}
            onInputChange={onIpAddressChanged}
            errorText="Please enter a valid stream url"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            required
          />}
          <View style={styles.saveButton}>
            <MainButton
              onPress={saveConfig}
              buttonStyle={{ paddingHorizontal: 50 }}
            >
              <Ionicons name="md-save" size={24} color="white" />
            </MainButton>
          </View>
          <View style={styles.volumeContainer}>
            <Text style={styles.label}>{i18n.t('Volume')}</Text>
            <Slider
              style={styles.slider}
              minimumValue={70}
              maximumValue={100}
              step={1}
              value={volume}
              onValueChange={onValueChangeHandler}
              minimumTrackTintColor={Colors.accent}
              maximumTrackTintColor={Colors.inactive}
              thumbTintColor={Colors.primary}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.actionButton}>
            <MainButton
              buttonStyle={{ backgroundColor: Colors.accent }}
              onPress={onRestartHandler}
            >
              {i18n.t('Restart')}
            </MainButton>
          </View>
          <View style={styles.actionButton}>
            <MainButton
              buttonStyle={{ backgroundColor: Colors.alert }}
              onPress={onShutdownHandler}
            >
              {i18n.t('Shutdown')}
            </MainButton>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    marginVertical: 10,
    fontWeight: "bold"
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  saveButton: {
    marginVertical: 20,
    alignItems: "center",
    width: "100%"
  },
  volumeContainer: {
    width: "100%"
  },
  slider: {
    width: "100%",
    height: 40
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  actionButton: {
    width: "45%"
  }
});

export const screenOptions = props => {
  return {
    headerTitle: i18n.t('Settings')
  };
};

export default SettingsScreen;
