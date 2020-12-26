import {createStackNavigator} from "@react-navigation/stack";
import GeneralAnalytics from "../screens/GeneralAnalytics";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {AnalyticsNaviParamList} from "../types/Navigators";


const AnalyticsStack = createStackNavigator<AnalyticsNaviParamList>();

export default function AnalyticsNavigator() {

    return (
        <AnalyticsStack.Navigator>
            <AnalyticsStack.Screen
                name={"GeneralAnalytics"}
                component={GeneralAnalytics}
                options={{
                    headerTitle: '종합분석',
                    headerLeft: () => <MaterialCommunityIcons name="view-dashboard-outline" size={32} color="black"
                                                              style={{marginLeft: 16}}/>,
                    headerTitleStyle: {
                        fontFamily: 'nanum-square-round-bold'
                    }
                }}
            />
        </AnalyticsStack.Navigator>
    )

}