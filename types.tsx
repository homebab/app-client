import {CameraCapturedPicture} from "expo-camera";
import {Profile} from "./contexts/Account";

// AsyncStorage
export type CachedUser = {
  profile: Profile,
  isActive: boolean
}

// navigators
export type RootNaviParamList = {
  Auth: undefined;
  Base: undefined;
  NotFound: undefined;
};

export type AuthNaviParamList = {
  Landing: undefined;
};

export type BaseNaviParamList = {
  Fridge: undefined;
  Recipe: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

export type FridgeNaviParamList = {
  ListItems: undefined;
  AddItems: {
    itemPhoto: CameraCapturedPicture
  }
  CaptureItems: undefined
};

export type RecipeNaviParamList = {
  ListRecipes: undefined;
};


// others
export type TextInputField = {
  keyboardType: 'default' | 'numeric',
  placeholder: string,
  value: any,
  onChangeHandler: any,
  icon: any
}