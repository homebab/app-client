import React, {useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import Assets from '../../constants/Assets';
import {styles} from './styles';
import {convertContainer, Item, useAccountContext} from "../../contexts/Account";
// @ts-ignore
import {Auth, Hub, Analytics} from 'aws-amplify';
import SignIn from '../../components/SignIn';
import AsyncStorage from "@react-native-community/async-storage";


const Landing = () => {

    // const navigation = useNavigation();
    // const cachedUser: CachedUser | undefined = useCachedUser();

    const {accountDispatch, accountState} = useAccountContext();
    const {isAuthenticated} = accountState;

    useEffect(() => {
        Analytics.record({
            data: {
                test: "hello"
            },
            streamName: 'omtm-event-stream'
        }, 'AWSKinesisFirehose')
            .then(res => console.debug('[omtm]:', res))
            .catch(err => console.warn('[omtm]:',err));

        console.log('whathell')

        Hub.listen("auth", ({payload: {event, data}}) => {
            switch (event) {
                case "signIn":
                    console.debug("[omtm]: success to signIn with", data)
                    accountDispatch({
                        type: 'setAccount',
                        value: {
                            cachedUser: data,
                            // profile: cachedUser,
                            // container: convertContainer(res as Array<Item>),
                            isAuthenticated: true
                        }
                    });
                    break;
            }
        });

        // retrieve cachedUser
        Auth.currentAuthenticatedUser()
            .then(cachedUser => {
                // retrieve userItems

                AsyncStorage.getItem('userItems')
                    .then(userItems => {
                        if (userItems)
                            accountDispatch({
                                type: 'setAccount',
                                value: {
                                    cachedUser: cachedUser,
                                    // profile: cachedUser,
                                    container: convertContainer(JSON.parse(userItems) as Array<Item>),
                                    isAuthenticated: true
                                }
                            })
                        else {
                            console.warn("[omtm]: no userItems with")
                        }
                    })
                    .catch(err => {
                        console.debug("[omtm]: no userItems with", err)
                        AsyncStorage.setItem('userItems', '')
                    })


            })
            .catch(err => console.log(`[omtm]: ${err}`))

    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={Assets.Image.backgroundImage} style={styles.image}/>
            <SignIn/>
        </View>
    );
};

export default Landing;

