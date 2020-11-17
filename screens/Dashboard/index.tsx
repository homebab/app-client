import {Text, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";


const Dashboard = () => {

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <MaterialCommunityIcons name="file-chart" size={100} color={"black"}/>
            <Text style={{marginTop: 8, fontSize: 28}}>Dashboard</Text>
        </View>
    )
}

export default Dashboard;