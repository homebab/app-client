import React, {useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import Assets from '../../constants/Assets';
import {styles} from './styles';
import {convertContainer, Item, useAccountContext} from "../../contexts/Account";
// @ts-ignore
import {Auth, Hub} from 'aws-amplify';
import SignIn from '../../components/SignIn';
import AsyncStorage from "@react-native-community/async-storage";
import LocalStorage from '../../constants/LocalStorage';


const Landing = () => {

    // const navigation = useNavigation();
    // const cachedUser: CachedUser | undefined = useCachedUser();

    const {accountDispatch, accountState} = useAccountContext();
    const {isAuthenticated} = accountState;

    useEffect(() => {
        // Analytics.record({
        //     data: {
        //         test: "hello"
        //     },
        //     streamName: 'omtm-event-stream'
        // }, 'AWSKinesisFirehose')
        //     .then(res => console.debug('[omtm]:', res))
        //     .catch(err => console.warn('[omtm]:',err));

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

                AsyncStorage.getItem(LocalStorage.KEY.USER_ITEMS)
                    .then(userItems => {
                        accountDispatch({
                            type: 'setAccount',
                            value: {
                                cachedUser: cachedUser,
                                // profile: cachedUser,
                                container: userItems? JSON.parse(userItems): [],
                                isAuthenticated: true
                            }
                        })
                    })
                    .catch(err => alert(`[omtm]: fail to retrieve userItems on AsyncStorage with ${err}`))
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

