import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {EvilIcons} from "@expo/vector-icons";
import SignOut from "../../components/SignOut";
import {useContainerContext} from "../../contexts/Container";


const Settings = () => {

    const {containerDispatch} = useContainerContext();

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <SignOut/>

            <TouchableOpacity
                style={{
                    position: "absolute", bottom: '5%',
                    flexDirection: "row", alignItems: "center", justifyContent: "center"
                }}
                onPress={() => containerDispatch({type: "FLUSH"})}
            >
                <EvilIcons name={"trash"} size={32}/>
                <Text style={{fontSize: 20}}>{"식품 리셋하기"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Settings;