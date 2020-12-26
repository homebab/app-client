import {CameraCapturedPicture} from "expo-camera";
import {Profile} from "../contexts/Account";

// AsyncStorage
export type CachedUser = {
  profile: Profile,
  isActive: boolean
}

// others
export type TextInputField = {
  keyboardType: 'default' | 'numeric',
  placeholder: string,
  value: any,
  onChangeHandler: any,
  icon: any
}