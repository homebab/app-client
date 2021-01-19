import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import {Auth} from "aws-amplify";
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import React from "react";
import {logInAsync} from "expo-google-app-auth";
import * as Linking from "expo-linking";


const SignIn = () => {

    return (
        <View style={styles.wrapper}>
            {/*<TouchableOpacity style={[styles.button, styles.cognito]}*/}
            {/*                  onPress={hostedUISignIn}>*/}
            {/*    <FontAwesome style={styles.icon} name="login" size={30} color="white"/>*/}
            {/*    <Text style={styles.text}>*/}
            {/*        로그인*/}
            {/*    </Text>*/}
            {/*</TouchableOpacity>*/}

            <TouchableOpacity style={[styles.button, styles.google]}
                              onPress={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
                                  .then(res => console.debug("[HOMEBAB]: success to google signIn with", res))
                                  .catch(err => console.warn(`[HOMEBAB]: fail to google signIn with ${Linking.makeUrl()} and ${err}`))}>
                <Entypo style={styles.icon} name="google-" size={30} color="white"/>
                <Text style={styles.text}>
                    구글 로그인
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.facebook]}
                              onPress={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook})
                                  .then(res => console.debug("[HOMEBAB]: success to facebook signIn with", res))
                                  .catch(err => console.warn(`[HOMEBAB]: fail to facebook signIn with ${Linking.makeUrl()} and ${err}`))}>
                <FontAwesome style={styles.icon} name="facebook-square" size={30} color="white"/>
                <Text style={styles.text}>
                    페이스북 로그인
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.apple]}
                              onPress={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
                                  .then(res => console.debug("[HOMEBAB]: success to google signIn with", res))
                                  .catch(err => console.warn(`[HOMEBAB]: fail to google signIn with ${Linking.makeUrl()} and ${err}`))}>
                <FontAwesome style={styles.icon} name="apple" size={30} color="white"/>
                <Text style={styles.text}>
                    애플 로그인
                </Text>
            </TouchableOpacity>


        </View>
    )
}

export default SignIn;