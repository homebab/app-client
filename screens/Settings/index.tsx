import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import SignOut from "../../components/SignOut";


const Settings = () => {

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <SignOut/>
        </View>
    )
}

export default Settings;