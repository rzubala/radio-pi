import React, {useCallback, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import MainButton from '../components/UI/MainButton'
import * as configActions from '../store/actions/config'

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

  return (
    <View style={styles.screen}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Radio service url:</Text>
        <TextInput style={styles.input} value={newUrl} onChangeText={onIpAddressChanged} />
      </View>
      <View style={styles.button}>
        <MainButton title="Save" onPress={saveConfig}>Save</MainButton>
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
    width: '100%',
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
  button: {
    width: "50%"
  }
});

export const screenOptions = props => {
  return {
    headerTitle: "Settings"
  }
}

export default SettingsScreen;
