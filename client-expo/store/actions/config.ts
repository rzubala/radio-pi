import { AsyncStorage } from "react-native";

export const GET_CONFIG = "GET_CONFIG";
export const SAVE_CONFIG = "SAVE_CONFIG";

export const getConfig = () => {
  return async dispatch => {
    const userData = await AsyncStorage.getItem("userData")
    let ip = JSON.parse(userData).ip
    if (!ip) {
        ip = "http://192.168.0.3:3000"
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
