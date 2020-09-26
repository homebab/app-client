import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import {Auth} from "aws-amplify";
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth";
import {Entypo} from "@expo/vector-icons";
import React from "react";


const SignIn = () => {

    return (
        <View style={styles.wrapper}>
            {/*<TouchableOpacity style={[styles.button, styles.cognito]}*/}
            {/*                  onPress={hostedUISignIn}>*/}
            {/*    <Entypo style={styles.icon} name="login" size={30} color="white"/>*/}
            {/*    <Text style={styles.text}>*/}
            {/*        한끼두끼 로그인*/}
            {/*    </Text>*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity style={[styles.button, styles.google]}
                              onPress={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})}>
                <Entypo style={styles.icon} name="google-" size={30} color="white"/>
                <Text style={styles.text}>
                    구글 로그인
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.facebook]}
                              onPress={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook})}>
                <Entypo style={styles.icon} name="facebook" size={30} color="white"/>
                <Text style={styles.text}>
                    페이스북 로그인
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignIn;