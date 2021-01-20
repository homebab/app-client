import {CameraCapturedPicture} from "expo-camera";

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
    Analytics: undefined;
    Settings: undefined;
};

export type FridgeNaviParamList = {
    ListItems: undefined;
    AddItems: {
        itemPhoto?: CameraCapturedPicture
    }
    CaptureItems: undefined
};

export type RecipeNaviParamList = {
    ListRecipes: undefined;
};

export type AnalyticsNaviParamList = {
    GeneralAnalytics: undefined;
    RealtimeAnalytics: undefined;
}

export type SettingsNaviParamList = {
    Settings: undefined;
};