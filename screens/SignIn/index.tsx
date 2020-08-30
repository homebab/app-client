import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import Assets from '../../constants/Assets';
import * as Google from 'expo-google-app-auth';


const SignIn = () => {
    const navigation = useNavigation();

    // TODO: maybe, not working after deployed
    const signInWithGoogle = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "717338592846-l5uiq7k7r0eg2cheueinea7atnhig2gf.apps.googleusercontent.com",
                //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                console.log(result);
                navigation.navigate('Root');
            } else {
                console.log("cancelled");
            }
        } catch (e) {
            console.log("error", e);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Assets.Image.backgroundImage} style={styles.image}/>


                <View style={styles.wrapper}>
                    <Text style={styles.title}>{""}</Text>
                    <Text style={styles.subTitle}>{""}</Text>


                    <TouchableOpacity style={[styles.button, styles.google]}
                                      onPress={() => signInWithGoogle()}>
                        <Entypo style={styles.icon} name="google-" size={30} color="white"/>
                        <Text style={styles.text}>
                            구글 로그인
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.facebook]}
                                      onPress={() => navigation.navigate('Root')}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        flex: 1,
        position: "absolute",
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.6,
    },
    wrapper: {
        flex: 0.5,
        width: "85%",
        // backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        marginBottom: 0,
        fontSize: 34,
        fontFamily: 'nanum-square-round',
    },
    subTitle: {
        alignSelf: "flex-end",
        marginBottom: 24,
        fontSize: 16,
        fontFamily: 'nanum-square-round'
    },
    button: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: 12,
        marginBottom: 12,
        // paddingLeft: "10%",
        // paddingRight: 24,
        // paddingBottom: 16,
        // paddingTop: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    google: {
        backgroundColor: "#de5246",
    },
    facebook: {
        backgroundColor: "#4267B2"
    },
    text: {
        padding: 16,
        justifyContent: "center",
        fontFamily: 'nanum-square-round',
        color: "white",
        fontSize: 20,
    },
    icon: {
        position: "absolute",
        left: 28
    },
    link: {
        fontWeight: 'bold',
    },

});
