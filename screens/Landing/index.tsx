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
import {CognitoUser} from "amazon-cognito-identity-js";


const Landing = () => {

    // const navigation = useNavigation();
    // const cachedUser: CachedUser | undefined = useCachedUser();

    const {accountDispatch} = useAccountContext();

    useEffect(() => {
        Hub.listen("auth", async ({payload: {event, data}}) => {
            switch (event) {
                case "signIn":
                    const cognitoUser: CognitoUser = data
                    console.debug("[omtm]: success to signIn for", cognitoUser.getUsername())

                    // retrieve cached userItems
                    const userItems = await AsyncStorage.getItem(LocalStorage.KEY.USER_ITEMS)

                    accountDispatch({
                        type: 'setAccount',
                        value: {
                            cachedUser: cognitoUser,
                            // profile: cachedUser,
                            container: userItems? convertContainer(JSON.parse(userItems)): [],
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
                                container: userItems? convertContainer(JSON.parse(userItems)): [],
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

