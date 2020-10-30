import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import {RootNaviParamList} from '../types';
import BaseNavigator from './BaseNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {useAccountContext} from "../contexts/Account";
import AuthNavigator from "./AuthNavigator";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

// A root stack navigators is often used for displaying modals on top oSf all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootNaviParamList>();

function RootNavigator() {

    const {accountState} = useAccountContext();
    const {isAuthenticated} = accountState;

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
