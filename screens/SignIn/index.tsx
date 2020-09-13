import React, {useEffect} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import Assets from '../../constants/Assets';
import {styles} from './styles';
import useCachedUser from "../../hooks/useCachedUser";
import {signInWithGoogle} from '../../services/social';
import {CachedUser} from "../../types";
import AsyncStorage from "@react-native-community/async-storage";
import {GoogleUser} from "expo-google-app-auth";
import {createUser, retrieveUser} from "../../services/api";
import {useAccountContext} from "../../contexts/Account";


const SignIn = () => {
    const navigation = useNavigation();

    const cachedUser: CachedUser | undefined = useCachedUser();

    const {accountDispatch, accountState} = useAccountContext();
    const {isAuthenticated} = accountState;

    useEffect(() => {
        if (cachedUser && cachedUser.isActive) {
            console.debug(`[omtm]: success to retrieve cachedUser ${JSON.stringify(cachedUser)}`)

            // TODO: fetch GET api to App Server for retrieving userItems


            // setAccount
            accountDispatch({
                type: 'setAccount',
                value: {profile: cachedUser.profile, container: [], isAuthenticated: true}
            })

            // navigation.navigate('Root');
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

                    const user: CachedUser = {
                        profile: {
                            id: -1,
                            name: name,
                            email: email,
                            imageUrl: photoUrl
                        },
                        isActive: true
                    }

                    createUser(name, email, photoUrl)
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

                                    // navigate 'Root'
                                    // navigation.navigate('Root')
                                })
                                .catch(err => alert('[omtm]: fail to set user on AsyncStorage with ' + err));
                        })
                        .catch(err => {
                            /*
                                `409: CONFLICT`: already createUser(singUp) on RDS but not cached on AsyncStorage
                                So, retrieveUser(signIn) and cache user data on AsyncStorage
                            */

                            retrieveUser(email)
                                .then((res: any) => {
                                    console.log(`retrieve user data, ${JSON.stringify(res)}`)
                                    const user: CachedUser = {
                                        profile: {id: res.id, name: res.name, email: res.email, imageUrl: res.imageUrl},
                                        isActive: true
                                    }

                                    AsyncStorage.setItem('user', JSON.stringify(user))
                                        .then(() => {
                                            // setAccount
                                            accountDispatch({
                                                type: 'setAccount',
                                                value: {profile: user.profile, container: [], isAuthenticated: true}
                                            })

                                            // navigate 'Root'
                                            navigation.navigate('Root')
                                        })
                                        .catch(err => alert('[omtm]: fail to set user on AsyncStorage with ' + err));
                                })
                                .catch()
                        })
                } else {
                    alert('[omtm]: success to fetch api to Google, but googleUser is undefined');
                }
            })
            .catch(err => alert('[omtm]: fail to fetch api to Google with ' + err))
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Assets.Image.backgroundImage} style={styles.image}/>

            <View style={styles.wrapper}>
                <TouchableOpacity style={[styles.button, styles.google]}
                                  onPress={() => singIn()}>
                    <Entypo style={styles.icon} name="google-" size={30} color="white"/>
                    <Text style={styles.text}>
                        구글 로그인
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.facebook]}
                                  onPress={() => isAuthenticated ? navigation.navigate('Root') : alert('페이스북 로그인은 지원되지 않습니다')}>
                    <Entypo style={styles.icon} name="facebook" size={30} color="white"/>
                    <Text style={styles.text}>
                        페이스북 로그인
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default SignIn;

