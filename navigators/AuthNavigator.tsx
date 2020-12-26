import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import Landing from "../screens/Landing";
import {AuthNaviParamList} from "../types/Navigators";

const AuthStack = createStackNavigator<AuthNaviParamList>();

export default function AuthNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Landing"
                component={Landing}
                options={{headerShown: false}}
            />
        </AuthStack.Navigator>
    );
}