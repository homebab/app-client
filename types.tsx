import {CameraCapturedPicture} from "expo-camera";

// navigators
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  "Fridge": undefined;
  "Recipe": undefined;
};

export type TabOneParamList = {
  ListItems: undefined;
  AddItems: {
    itemPhoto: CameraCapturedPicture
  }
  CaptureItems: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};


// others
export type TextInputField = {
  keyboardType: 'default' | 'numeric',
  placeholder: string,
  value: any,
  onChangeHandler: any,
  icon: any
}