import React, {useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import Assets from '../../constants/Assets';
import {styles} from './styles';
import {CachedUser, useAccountContext} from "../../contexts/Account";
// @ts-ignore
import {Auth, Hub} from 'aws-amplify';
import SignIn from '../../components/SignIn';
import AsyncStorage from "@react-native-community/async-storage";
import LocalStorage from '../../constants/LocalStorage';
import {CognitoUser} from "amazon-cognito-identity-js";
import {convertContainer, Item, useContainerContext} from "../../contexts/Container";


const Landing = () => {

    // const navigation = useNavigation();
    // const cachedUser: CachedUser | undefined = useCachedUser();

    const {accountDispatch} = useAccountContext();
    const {containerDispatch} = useContainerContext();

    const initializeContext = (cachedUser: CachedUser, userItems: Array<Item>) => {
        console.log(userItems)
        accountDispatch({
            type: 'setAccount',
            value: {
                cachedUser: cachedUser,
                // profile: cachedUser,
                isAuthenticated: true
            }
        });

        containerDispatch({
            type: 'setFridge',
            value: {
                fridge: userItems,
            }
        });
    }

    useEffect(() => {
        Hub.listen("auth", async ({payload: {event, data}}) => {
            switch (event) {
                case "signIn":
                    const cognitoUser: CognitoUser = data
                    console.debug("[omtm]: success to signIn for", cognitoUser.getUsername())

                    // retrieve cached userItems
                    const userItems = await AsyncStorage.getItem(LocalStorage.KEY.USER_ITEMS)

                    initializeContext(cognitoUser, userItems ? convertContainer(JSON.parse(userItems)) : []);
                    break;
            }
        });

        // retrieve cachedUser
        Auth.currentAuthenticatedUser()
            .then((cachedUser: CognitoUser) => {
                // retrieve userItems
                AsyncStorage.getItem(LocalStorage.KEY.USER_ITEMS)
                    .then(userItems => {
                        initializeContext(cachedUser, userItems ? convertContainer(JSON.parse(userItems)) : []);
                        console.debug("[omtm]: success to signIn for", cachedUser.getUsername());
                    })
                    .catch(err => alert(`[omtm]: fail to retrieve userItems on AsyncStorage with ${err}`))
            })
            .catch(err => console.log(`[omtm]: ${err}`));

    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={Assets.Image.backgroundImage} style={styles.image}/>
            <SignIn/>
        </View>
    );
};

export default Landing;

