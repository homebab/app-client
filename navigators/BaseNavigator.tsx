import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ListRecipes from '../screens/ListRecipes';
import {BaseNaviParamList, FridgeNaviParamList, RecipeNaviParamList} from '../types';
import CaptureItem from '../screens/CaptureItem';
import {StyleSheet, View} from 'react-native';
import {useAccountContext} from "../contexts/Account";
import SignOut from "../components/SignOut";
import ItemNavigator from "./ItemNavigator";
import AddItems from "../screens/AddItems";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import FridgeNavigator from "./FridgeNavigator";

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
                component={RecipeNavigator}
                options={{
                    tabBarLabel: "레시피",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="chef-hat" size={24}
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
