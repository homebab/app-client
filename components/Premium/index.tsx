import {Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";


const Premium = () => {

    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name="crown" size={30} color='#b1a510' />
            <Text style={{marginLeft: 4, fontSize: 28, color: '#b1a510'}}>premium</Text>
        </View>
    )
}

export default Premium;