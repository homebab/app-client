import {createStackNavigator} from "@react-navigation/stack";
import {AuthNaviParamList} from "../types";
import Index from "../screens/ListRecipes";
import * as React from "react";
import Landing from "../screens/Landing";

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