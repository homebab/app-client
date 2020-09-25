import AsyncStorage from "@react-native-community/async-storage";
// @ts-ignore
import {withOAuth, IOAuthProps} from "aws-amplify-react-native"
import {Avatar} from "react-native-paper";
import {TouchableOpacity} from "react-native";
import * as React from "react";
import {AccountContext} from "../../contexts/Account";

type Props = IOAuthProps & {}

const SignOut = (props: Props) => {
    const {signOut} = props;
    AccountContext

    return (
        <TouchableOpacity style={{marginLeft: 12, marginRight: 12}}
                          onPress={() => AsyncStorage.removeItem('user').then(_ => {
                              accountDispatch({type: 'flush', value: {}});
                              console.debug("[omtm]: success to delete cacheUser and flush accountContext")
                              alert('캐시 삭제');
                          })}>
            <Avatar.Image size={36} source={{uri: imageUrl}}/>
        </TouchableOpacity>
    )
}


export withOAuth(SignOut)