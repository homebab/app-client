import {Text, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";


const Dashboard = () => {

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <MaterialCommunityIcons name="file-chart" size={52} color={"black"}/>
            <Text style={{marginTop: 10}}>Dashboard</Text>
        </View>
    )
}

export default Dashboard;