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
import {uploadImageOnS3} from "./api/aws";


const [
    productionRedirectSignIn,
    developmentRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(",");

const [
    productionRedirectSignOut,
    developmentRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(",");

console.debug('[omtm]: host on ' + Linking.makeUrl())

const isExpo = Linking.makeUrl().includes("exp://")

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: isExpo ? developmentRedirectSignIn : productionRedirectSignIn,
        redirectSignOut: isExpo ? developmentRedirectSignOut : productionRedirectSignOut,
    }
}

console.debug('[omtm]: update AWS amplify config ' + updatedAwsConfig.oauth)

Amplify.configure(updatedAwsConfig)

const App = () => {

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

export default App;