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
import {createUser} from "../../services/api";
import {useAccountContext} from "../../contexts/Account";


const SignIn = () => {
    const navigation = useNavigation();

    const cachedUser: CachedUser | undefined = useCachedUser();

    const {accountDispatch, accountState} = useAccountContext();
    const {isAuthenticated} = accountState;

    useEffect(() => {
        if (cachedUser && cachedUser.isActive) {
            console.debug(`[omtm]: success to retrieve cachedUser ${JSON.stringify(cachedUser)}`)

            // fetch GET api to App Server for retrieving userItems

            // setAccount
            accountDispatch({type: 'setAccount', value: {profile: cachedUser.profile, container: [], isAuthenticated: true}})

            navigation.navigate('Root');
        } else {
            console.debug('[omtm]: cachedUser is undefined or inactive')
        }
    }, [cachedUser]);

    const singIn = () => {
        signInWithGoogle()
            .then((googleUser: GoogleUser | undefined) => {
                // cache user data to AsyncStorage
                if (googleUser) {
                    const {id, name, email, photoUrl} = googleUser;
                    const user: CachedUser = {
                        profile: {
                            id: id ? parseInt(id) : -1,
                            name: name ? name : '',
                            email: email ? email : '',
                            image_url: photoUrl
                        },
                        isActive: true
                    }
                    AsyncStorage.setItem('user', JSON.stringify(user))
                        .then(() => {
                            // fetch POST api to App Server
                            createUser(user.profile)

                            // navigate 'Root'
                            navigation.navigate('Root')
                        })
                        .catch(err => alert('[omtm]: fail to set user on AsyncStorage with ' + err));
                } else {
                    alert('[omtm]: success to fetch api to Google, but googleUser is undefined');
                }

            })
            .catch(err => alert('[omtm]: fail to fetch api to Google with ' + err))
    }

    // TODO: maybe, not working after deployed

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
                                  onPress={() => isAuthenticated? navigation.navigate('Root'): alert('[omtm]: there is no active account')}>
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

