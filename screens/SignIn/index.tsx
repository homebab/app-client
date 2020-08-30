import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import Assets from '../../constants/Assets';
import * as Google from 'expo-google-app-auth';
import {styles} from './styles';


const SignIn = () => {
    const navigation = useNavigation();

    // TODO: maybe, not working after deployed
    const signInWithGoogle = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "",
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
                {/*<Text style={styles.title}>{""}</Text>*/}
                {/*<Text style={styles.subTitle}>{""}</Text>*/}


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

