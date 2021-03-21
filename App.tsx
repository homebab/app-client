import Amplify, {Analytics, AWSKinesisFirehoseProvider} from 'aws-amplify';
import * as Linking from 'expo-linking';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {YellowBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// @ts-ignore
import awsConfig from './aws-exports';
import AccountController from "./contexts/Account";
import ContainerController from "./contexts/Container";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigators';
import Loading from "./components/Loading";
import {LoadingProvider} from "./contexts/Loading";

// ignore warning `[Warning]: Setting a timer for a long period of time`
// https://github.com/facebook/react-native/issues/12981
YellowBox.ignoreWarnings(['Setting a timer']);

// adjust aws configure for amplify
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

console.debug('[HOMEBAB]: host on ' + hostUrl)

const isTunnel = hostUrl.includes("exp://")
const isLAN = hostUrl.includes("localhost") || hostUrl.includes("127.0.0.1") || hostUrl.includes("172.30.1.37")

Analytics.addPluggable(new AWSKinesisFirehoseProvider());

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: isLAN ? LANRedirectSignIn : isTunnel ? TunnelRedirectSignIn : ProdRedirectSignIn,
        redirectSignOut: isLAN ? LANRedirectSignOut : isTunnel ? TunnelRedirectSignOut : ProdRedirectSignOut,
    }
}

console.debug('[HOMEBAB]: update AWS amplify config ' + JSON.stringify(updatedAwsConfig.oauth))

Amplify.configure(updatedAwsConfig)

const App: React.FC = () => {
    const colorScheme = useColorScheme();
    const isLoading = useCachedResources();

    if (isLoading) {
        return <Loading/>;
    } else {
        return (
            <SafeAreaProvider>
                <LoadingProvider>
                    <AccountController>
                        <ContainerController>
                            <Navigation colorScheme={colorScheme}/>
                        </ContainerController>
                    </AccountController>
                </LoadingProvider>
                <StatusBar/>
            </SafeAreaProvider>
        );
    }
}

export default App;