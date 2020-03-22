import React, {useCallback, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

import MainButton from '../components/UI/MainButton'
import * as configActions from '../store/actions/config'
import { restart, shutdown } from "../radio/rest-service";

const SettingsScreen = props => {
  const [newUrl, setNewUrl] = useState('')
  const storedIpAddress = useSelector(state => state.config.ip)

  const dispatch = useDispatch()

  const fetchIpAddress = useCallback(() => {
    dispatch(configActions.getConfig())
  }, [dispatch])

  useEffect(() => {
    fetchIpAddress()
    setNewUrl(storedIpAddress)
  }, [fetchIpAddress])

  const onIpAddressChanged = value => {
    setNewUrl(value)    
  }

  const saveConfig = () => {
    dispatch(configActions.saveConfig(newUrl))
    props.navigation.navigate("Radio")
  }

  const displayAlert = () => {
    Alert.alert(
      "Error",
      `No connection to radio: ${storedIpAddress}`,
      [{ text: "OK"} ]      
    );
  }

  const sendCommand = useCallback(async (method) => {
    try {
      const result = await method(storedIpAddress);
    } catch (err) {
      displayAlert()
    }
  }, [restart, shutdown])

  const onRestartHandler = () => {
    sendCommand(restart)
  }

  const onShutdownHandler = () => {
    sendCommand(shutdown)
  }

  return (
    <View style={styles.screen}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Radio service url:</Text>
        <TextInput style={styles.input} value={newUrl} onChangeText={onIpAddressChanged} />
        <View style={styles.saveButton}>
          <MainButton onPress={saveConfig} buttonStyle={{ paddingHorizontal: 50}}><Ionicons name="md-save" size={24} color="white" /></MainButton>
        </View>      
      </View>
      <View style={styles.buttons}>
        <View style={styles.actionButton}>
          <MainButton buttonStyle={{ backgroundColor: Colors.accent }} onPress={onRestartHandler}>Restart</MainButton>
        </View>
        <View style={styles.actionButton}>
          <MainButton buttonStyle={{ backgroundColor: Colors.alert }} onPress={onShutdownHandler}>Shutdown</MainButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "100%",
    padding: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    marginVertical: 9,
    fontWeight: 'bold'
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  saveButton: {
    marginVertical: 20,
    alignItems: 'center',
    width: "100%"
  },
  buttons: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between'
  },
  actionButton: {
    width: '45%'
  }

});

export const screenOptions = props => {
  return {
    headerTitle: "Settings"
  }
}

export default SettingsScreen;
