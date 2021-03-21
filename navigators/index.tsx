import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import useAccountAuthFlow from "../hooks/useAccountAuthFlow";
import NotFoundScreen from '../screens/NotFoundScreen';
import {RootNaviParamList} from "../types/Navigators";
import AuthNavigator from "./AuthNavigator";
import BaseNavigator from './BaseNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import usePushNotification from "../hooks/usePushNotification";
import useCachedResources from "../hooks/useCachedResources";
import {useLoadingContext} from "../contexts/Loading";
import Loading from "../components/Loading";


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const {isLoading: isGlobalLoading} = useLoadingContext();

    return (
        <>
            {isGlobalLoading ? <Loading/> : null}
            <NavigationContainer
                linking={LinkingConfiguration}
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <RootNavigator/>
            </NavigationContainer>
        </>
    );
}

// A root stack navigators is often used for displaying modals on top oSf all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootNaviParamList>();

function RootNavigator() {
    const isAuthenticated = useAccountAuthFlow();
    // usePushNotification();

    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            {isAuthenticated
                ? <RootStack.Screen name="Base" component={BaseNavigator}/>
                : <RootStack.Screen name="Auth" component={AuthNavigator}/>
            }
            <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </RootStack.Navigator>
    );
}
