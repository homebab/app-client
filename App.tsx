import {StatusBar} from 'expo-status-bar';
import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigators';
import AccountController from "./contexts/Account";

import Amplify, {Analytics, AWSKinesisFirehoseProvider} from 'aws-amplify'
// @ts-ignore
import config from './aws-exports'


Amplify.configure(config)
// Analytics.addPluggable(new AWSKinesisFirehoseProvider());
//
// Analytics.configure({
//     AWSKinesisFirehose: {
//
//         // OPTIONAL -  Amazon Kinesis Firehose service region
//         region: 'us-west-2',
//
//         // OPTIONAL - The buffer size for events in number of items.
//         bufferSize: 1000,
//
//         // OPTIONAL - The number of events to be deleted from the buffer when flushed.
//         flushSize: 100,
//
//         // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
//         flushInterval: 5000, // 5s
//
//         // OPTIONAL - The limit for failed recording retries.
//         resendLimit: 5
//     }
// });

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