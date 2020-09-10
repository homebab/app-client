import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {useAccountContext} from "../contexts/Account";
import {CachedUser} from "../types";
import { useNavigation } from '@react-navigation/native';

export default function useCachedResources() {
    const [cachedUser, setCachedUser] = React.useState<CachedUser | undefined>(undefined);

    const loadCachedUser = async () => {
        try {
            // Load CachedUser
            const jsonValue = await AsyncStorage.getItem('user');
            if (jsonValue) setCachedUser(JSON.parse(jsonValue));
        } catch (e) {
            console.warn(`[omtm]: fail to get user on AsyncStorage with ${e}`);
        }
    }

    React.useEffect(() => {
        loadCachedUser().then();
        SplashScreen.hideAsync().then();
    }, []);

    return cachedUser;
}
