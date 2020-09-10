import * as Google from "expo-google-app-auth";
import Credentials from "../../constants/Credentials";
import {GoogleUser, LogInResult} from "expo-google-app-auth";

export const signInWithGoogle: () => Promise<GoogleUser | undefined> = async () => {
    try {
        const result: LogInResult = await Google.logInAsync({
            androidClientId: Credentials.Google.androidClientId,
            //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
            scopes: ["profile", "email"]
        });
        console.log(`[omtm]: response is ${result}`);

        if (result.type === "success") {
            // let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            //     headers: { Authorization: `Bearer ${result.accessToken}` },
            // });
            // TODO: fetch POST api
            return result.user;
            // console.log(userInfoResponse)
            // console.log('hi')
            // navigation.navigate('Root');
        } else {
            console.log('[omtm]: LoginResult type is `canceled`')
            return undefined;
        }
    } catch (e) {
        console.log("error", e);
    }
}