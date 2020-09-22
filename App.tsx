import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigators';
import AccountController from "./contexts/Account";

import Amplify from 'aws-amplify'
// @ts-ignore
import { withOAuth, IOAuthProps } from "aws-amplify-react-native";
// @ts-ignore
import config from './aws-exports'


Amplify.configure(config)

type Props = IOAuthProps & {

}

const App = (props: Props) => {

    const {googleSignIn} = props;

    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <AccountController>
                    <Navigation colorScheme={colorScheme}/>
                </AccountController>
                <StatusBar/>
            </SafeAreaProvider>
        );
    }
}

export default withOAuth(App);