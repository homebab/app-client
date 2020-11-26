import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ListRecipes from '../screens/ListRecipes';
import {BaseNaviParamList, RecipeNaviParamList} from '../types';
import FridgeNavigator from "./FridgeNavigator";
import GeneralAnalytics from "../screens/GeneralAnalytics";
import Settings from "../screens/Settings";
import AnalyticsNavigator from "./AnalyticsNavigator";

const BottomTab = createBottomTabNavigator<BaseNaviParamList>();

export default function BaseNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Fridge"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="Fridge"
                component={FridgeNavigator}
                options={{
                    tabBarLabel: "냉장고",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="fridge" size={24} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Recipe"
                component={ListRecipes}
                options={{
                    tabBarLabel: "레시피",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="chef-hat" size={24}
                                                                     color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Analytics"
                component={AnalyticsNavigator}
                options={{
                    tabBarLabel: "종합분석",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="file-chart" size={24}
                                                                     color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: "설정",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="settings" size={24}
                                                                     color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}


const RecipeStack = createStackNavigator<RecipeNaviParamList>();

function RecipeNavigator() {
    return (
        <RecipeStack.Navigator>
            <RecipeStack.Screen
                name="ListRecipes"
                component={ListRecipes}
                options={{
                    headerTitle: '레시피',
                    headerLeft: () => <MaterialCommunityIcons name="chef-hat" size={32} color="black"
                                                              style={{marginLeft: 20}}/>
                }}
            />
        </RecipeStack.Navigator>
    );
}
