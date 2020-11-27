import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import {Asset} from "expo-asset";
import Assets from '../constants/Assets';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    async function loadResourcesAndDataAsync() {
        try {
            SplashScreen.preventAutoHideAsync().then();

            // Load fonts
            await Font.loadAsync({
                ...Ionicons.font,
                'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
                'nanum-square-round': require('../assets/fonts/NanumSquareRoundR.ttf'),
                'nanum-square-round-bold': require('../assets/fonts/NanumSquareRoundB.ttf')
                ,
            });

            // Load Images
            await Asset.loadAsync([
                ...Object.values(Assets.Image)
            ]);

        } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
        } finally {
            setLoadingComplete(true);
            SplashScreen.hideAsync().then();
        }
    }

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        loadResourcesAndDataAsync().then();
    }, []);

    return isLoadingComplete;
}
