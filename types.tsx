import {CameraCapturedPicture} from "expo-camera";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  냉장고: undefined;
  레시피: undefined;
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
