import * as Google from "expo-google-app-auth";
import {GoogleUser, LogInResult} from "expo-google-app-auth";
import Credentials from "../../constants/Credentials";

// TODO: maybe, not working after deployed
export const signInWithGoogle: () => Promise<GoogleUser | undefined> = async () => {
    try {
        const result: LogInResult = await Google.logInAsync({
            androidClientId: Credentials.Google.androidClientId,
            //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
            scopes: ["profile", "email"]
        });
        console.debug(`[omtm]: response from Google is ${JSON.stringify(result)}`);

        if (result.type === "success") return result.user;
        else console.debug('[omtm]: LoginResult type is `canceled`');
    } catch (err) {
        console.warn(`[omtm]: fail to fetch api to Google with ${err}`);
    }
}