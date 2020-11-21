import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {EvilIcons, MaterialIcons} from "@expo/vector-icons";
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
                <MaterialIcons name={"autorenew"} size={32}/>
                <Text style={{padding: 16, fontSize: 20}}>{"냉장고 초기화하기"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Settings;