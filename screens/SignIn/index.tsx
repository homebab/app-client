import React, {useEffect} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import Assets from '../../constants/Assets';
import {styles} from './styles';
import useCachedUser from "../../hooks/useCachedUser";
import {signInWithGoogle} from '../../api/google';
import {CachedUser} from "../../types";
import AsyncStorage from "@react-native-community/async-storage";
import {GoogleUser} from "expo-google-app-auth";
import {createUser, getUserItems, retrieveUser, UserResponse} from "../../api/omtm";
import {convertContainer, Item, useAccountContext} from "../../contexts/Account";
import {Auth} from 'aws-amplify';
// @ts-ignore
import {withOAuth, IOAuthProps} from 'aws-amplify-react-native';
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth";


type Props = IOAuthProps & {

}

const SignIn = (props: Props) => {
    const {googleSignIn, facebookSignIn} = props;

    const navigation = useNavigation();

    const cachedUser: CachedUser | undefined = useCachedUser();

    const {accountDispatch, accountState} = useAccountContext();
    const {isAuthenticated} = accountState;

    // already signIn
    useEffect(() => {
        // check cachedUser on AsyncStorage
        if (cachedUser && cachedUser.isActive) {
            console.debug(`[omtm]: success to retrieve cachedUser ${JSON.stringify(cachedUser)}`)

            // fetch GET api to App Server for retrieving userItems and set Account Context
            getUserItems(cachedUser.profile.id)
                .then(res => accountDispatch({
                    type: 'setAccount',
                    value: {
                        profile: cachedUser.profile,
                        container: convertContainer(res as Array<Item>),
                        isAuthenticated: true
                    }
                }))
                .catch(err => alert(err))
        } else {
            console.debug('[omtm]: cachedUser is undefined or inactive')
        }
    }, [cachedUser]);

    const singIn = () => {
        signInWithGoogle()
            .then((googleUser: GoogleUser | undefined) => {
                // cache user data to AsyncStorage
                if (googleUser && googleUser.email && googleUser.name) {
                    // fetch POST api to App Server
                    const {name, email, photoUrl} = googleUser;

                    createUser(name, email, photoUrl)
                        // signUp logic
                        .then(res => {
                            // cache user data on AsyncStorage
                            const user: CachedUser = {
                                profile: {
                                    id: res as number, // TODO: handle result
                                    name: name,
                                    email: email,
                                    imageUrl: photoUrl
                                },
                                isActive: true
                            }

                            AsyncStorage.setItem('user', JSON.stringify(user))
                                .then(() => {
                                    // setAccount
                                    accountDispatch({
                                        type: 'setAccount',
                                        value: {profile: user.profile, container: [], isAuthenticated: true}
                                    })

                                })
                                .catch(err => alert('[omtm]: fail to set user on AsyncStorage with ' + err));
                        })
                        // signIn logic
                        .catch(_ => {
                            /*
                                `409: CONFLICT`: already createUser(singUp) on RDS but not cached on AsyncStorage
                                So, retrieveUser(signIn) and cache user data on AsyncStorage
                            */

                            retrieveUser(email)
                                .then((res) => {
                                    const response = res as UserResponse;
                                    const user: CachedUser = {
                                        profile: {
                                            id: response.id,
                                            name: response.name,
                                            email: response.email,
                                            imageUrl: response.imageUrl
                                        },
                                        isActive: true
                                    }

                                    AsyncStorage.setItem('user', JSON.stringify(user))
                                        .then(() => {
                                            // setAccount
                                            accountDispatch({
                                                type: 'setAccount',
                                                value: {
                                                    profile: user.profile,
                                                    container: convertContainer(response.userItems as Array<Item>),
                                                    isAuthenticated: true
                                                }
                                            })

                                        })
                                        .catch(err => alert('[omtm]: fail to set user on AsyncStorage with ' + err));
                                })
                                .catch()
                        })
                } else {
                    console.warn('[omtm]: success to fetch api to Google, but googleUser is undefined');
                }
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Assets.Image.backgroundImage} style={styles.image}/>

            <View style={styles.wrapper}>
                <TouchableOpacity style={[styles.button, styles.google]}
                                  onPress={googleSignIn}>
                    <Entypo style={styles.icon} name="google-" size={30} color="white"/>
                    <Text style={styles.text}>
                        구글 로그인
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.facebook]}
                                  onPress={facebookSignIn}>
                    <Entypo style={styles.icon} name="facebook" size={30} color="white"/>
                    <Text style={styles.text}>
                        페이스북 로그인
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default withOAuth(SignIn);

