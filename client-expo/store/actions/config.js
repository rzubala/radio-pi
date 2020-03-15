import { AsyncStorage } from "react-native";

export const GET_CONFIG = "GET_CONFIG"
export const SAVE_CONFIG = "SAVE_CONFIG"

export const getConfig = () => {
    return {type: GET_CONFIG}
}