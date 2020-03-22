import { AsyncStorage } from "react-native";

export const GET_CONFIG = "GET_CONFIG";
export const SAVE_CONFIG = "SAVE_CONFIG";

export const getConfig = () => {
  return async dispatch => {
    const userData = await AsyncStorage.getItem("userData")
    let ip = "http://192.168.0.3:3000"  //"http://192.168.0.3:6680"; //mopidy
    if (userData) {
      if (JSON.parse(userData).ip) {
        ip = JSON.parse(userData).ip
      }
    }
    dispatch({ type: GET_CONFIG, data:  ip});
  }
};

export const saveConfig = (ip: string) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      ip
    })
  );
  return { type: SAVE_CONFIG, data: ip };
};
