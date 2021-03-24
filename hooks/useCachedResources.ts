import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import {Asset} from "expo-asset";
import Assets from '../constants/Assets';
import {useState} from "react";

export default function useCachedResources() {
    const [isHardLoading, setHardLoading] = useState(true);
    const [isSoftLoading, setSoftLoading] = useState(true);

    async function loadResourcesAndDataAsync() {
        try {
            SplashScreen.preventAutoHideAsync().then();

            // Load fonts
            await Font.loadAsync({
                ...Ionicons.font,
                'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
                'nanum-square-round': require('../assets/fonts/NanumSquareRoundR.ttf'),
                'nanum-square-round-bold': require('../assets/fonts/NanumSquareRoundB.ttf'),
            });
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
        } finally {
            setHardLoading(false);
            SplashScreen.hideAsync().then();
        }
    }

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        loadResourcesAndDataAsync().then();

        // Load Images
        Asset.loadAsync([
            ...Object.values(Assets.Image),
            ...Object.values(Assets.FoodImages)
        ]).then(() => setSoftLoading(false));
    }, []);

    return {isHardLoading, isSoftLoading};
}
