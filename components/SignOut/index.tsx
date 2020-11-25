import AsyncStorage from "@react-native-community/async-storage";
import {Text, TouchableOpacity} from "react-native";
import * as React from "react";
import {useAccountContext} from "../../contexts/Account";
import {AntDesign} from "@expo/vector-icons";
import {Auth} from "aws-amplify";

type Props = {}

const SignOut = (props: Props) => {
    const {accountDispatch} = useAccountContext();

    return (
        <TouchableOpacity style={{marginLeft: 12, marginRight: 12}}
                          onPress={() => AsyncStorage.removeItem('user').then(_ => {
                              Auth.signOut()
                                  .then(res => {
                                      accountDispatch({type: 'DEAUTHENTICATE'});
                                      console.debug("[omtm]: success to sign out")
                                  })
                                  .catch(err => console.warn("[omtm]: fail to delete cachedUser with", err))
                          })}>
            <AntDesign
                name="logout"
                size={96}
                color="black"
                // @ts-ignore
                backgroundColor="transparent"
            />
            <Text style={{marginTop: 8, fontSize: 28, alignSelf: 'center'}}>Logout</Text>
        </TouchableOpacity>
    )
}

/*
    withOAuth Higher-Order Component (HOC)
    refer to doc `https://docs.amplify.aws/lib/auth/social/q/platform/js`

    With React Native & Expo, you can also use the withOAuth HOC to launch the Cognito Hosted UI experience.
    Just wrap your app’s main component with our HOC. Doing so, will pass the following props available to your component:
*/
export default SignOut;