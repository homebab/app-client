import AsyncStorage from "@react-native-community/async-storage";
// @ts-ignore
import {IOAuthProps, withOAuth} from "aws-amplify-react-native"
import {TouchableOpacity} from "react-native";
import * as React from "react";
import {useAccountContext} from "../../contexts/Account";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Auth } from "aws-amplify";

type Props = IOAuthProps & {}

const SignOut = (props: Props) => {
    const {signOut} = props;
    const {accountDispatch} = useAccountContext();

    return (
        <TouchableOpacity style={{marginLeft: 12, marginRight: 12}}
                          onPress={() => AsyncStorage.removeItem('user').then(_ => {
                              Auth.signOut()
                                  .then(res => {
                                      accountDispatch({type: 'flush', value: {}});
                                      console.debug("[omtm]: success to delete cachedUser and flush accountContext with", res)
                                  })
                                  .catch(err => console.warn("[omtm]: fail to delete cachedUser with", err))
                              })}>
            <MaterialCommunityIcons
                name="logout"
                size={32}
                color="black"
                // @ts-ignore
                backgroundColor="transparent"
            />
        </TouchableOpacity>
    )
}


export default withOAuth(SignOut);