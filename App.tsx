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
    ProdRedirectSignIn,
    LANRedirectSignIn,
    TunnelRedirectSignIn
] = awsConfig.oauth.redirectSignIn.split(",");

const [
    ProdRedirectSignOut,
    LANRedirectSignOut,
    TunnelRedirectSignOut
] = awsConfig.oauth.redirectSignOut.split(",");

const hostUrl = Linking.makeUrl()

console.debug('[omtm]: host on ' + hostUrl)

const isTunnel = hostUrl.includes("exp://")
const isLAN = hostUrl.includes("localhost") || hostUrl.includes("127.0.0.1")

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: isLAN ? LANRedirectSignIn : isTunnel? TunnelRedirectSignIn: ProdRedirectSignIn,
        redirectSignOut: isLAN ? LANRedirectSignOut : isTunnel? TunnelRedirectSignOut: ProdRedirectSignOut,
    }
}

console.debug('[omtm]: update AWS amplify config ' + JSON.stringify(updatedAwsConfig.oauth))

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