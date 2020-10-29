import {StatusBar} from 'expo-status-bar';
import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigators';
import AccountController from "./contexts/Account";

import * as Linking from 'expo-linking';

import Amplify, {Analytics, AWSKinesisFirehoseProvider} from 'aws-amplify'
// @ts-ignore
import awsConfig from './aws-exports'

// const [
//     localRedirectSignIn,
//     productionRedirectSignIn,
// ] = awsConfig.oauth.redirectSignIn.split(",");
//
// const [
//     localRedirectSignOut,
//     productionRedirectSignOut,
// ] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: Linking.makeUrl(), // isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
        redirectSignOut: Linking.makeUrl() //isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    }
}

Amplify.configure(updatedAwsConfig)

const App = () => {

    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    alert('Check redirect url: ' + Linking.makeUrl())

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

export default App;