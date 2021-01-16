import React, {useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import Assets from '../../constants/Assets';
import {styles} from './styles';
import {useAccountContext} from "../../contexts/Account";
// @ts-ignore
import {Auth, DataStore, Hub} from 'aws-amplify';
import SignIn from '../../components/SignIn';
import {CognitoUser} from "amazon-cognito-identity-js";


const Landing = () => {
    const {accountDispatch} = useAccountContext();
    // const {fetchItems} = useContainerAppSync();

    // const initializeContext = (cachedUser: CachedUser, userItems: string | null) => {
    //     containerDispatch({
    //         type: 'SET_FRIDGE',
    //         fridge: userItems ? convertContainer(new Map(JSON.parse(userItems))) : new Map()
    //     });
    //
    //     accountDispatch({
    //         type: 'SET_ACCOUNT',
    //         account: {
    //             cachedUser: cachedUser,
    //             isAuthenticated: true,
    //             alarm: {
    //                 manageIngredients: false,
    //                 recommendRecipes: false
    //             }
    //         }
    //     });
    // }

    useEffect(() => {
        Hub.listen("auth", async ({payload: {event, data}}) => {
            switch (event) {
                case "signIn":
                    const cognitoUser: CognitoUser = data
                    console.debug("[HOMEBAB]: success to signIn for", cognitoUser.getUsername())

                    accountDispatch({
                        type: 'SET_ACCOUNT',
                        account: {
                            cognitoUser: cognitoUser,
                            isAuthenticated: true,
                            alarm: {
                                manageIngredients: false,
                                recommendRecipes: false
                            }
                        }
                    });

                    // retrieve cached userItems
                    // fetchItems()
                    // const userItems = await AsyncStorage.getItem(LocalStorage.KEY.USER_ITEMS)

                    // initializeContext(cognitoUser, userItems);
                    break;
                case "signOut":
                    accountDispatch({type: 'DEAUTHENTICATE'});
                    console.debug("[HOMEBAB]: success to sign out", data)
            }
        });

        // retrieve cachedUser
        Auth.currentAuthenticatedUser()
            .then((cachedUser: CognitoUser) => {
                console.debug("[HOMEBAB]: success to retrieve ", cachedUser.getUsername())

                accountDispatch({
                    type: 'SET_ACCOUNT',
                    account: {
                        cognitoUser: cachedUser,
                        isAuthenticated: true,
                        alarm: {
                            manageIngredients: false,
                            recommendRecipes: false
                        }
                    }
                });
                // retrieve userItems
                // AsyncStorage.getItem(LocalStorage.KEY.USER_ITEMS)
                //     .then(userItems => {
                //         initializeContext(cachedUser, userItems);
                //         console.debug("[HOMEBAB]: success to retrieve ", cachedUser.getUsername());
                //     })
                //     .catch(err => {
                //         alert(`[HOMEBAB]: fail to retrieve userItems on AsyncStorage with ${err}`);
                //     })
            })
            .catch(err => console.debug(`[HOMEBAB]: ${err}`));
        return () => console.log('UNMOUNTED on Landing');


    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={Assets.Image.backgroundImage} style={styles.image}/>
            <SignIn/>
        </View>
    );
};

export default Landing;

