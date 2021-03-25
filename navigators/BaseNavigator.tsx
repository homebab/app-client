import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View } from "react-native";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ListRecipes from '../screens/ListRecipes';
import Settings from "../screens/Settings";
import { BaseNaviParamList, RecipeNaviParamList, SettingsNaviParamList } from "../types/Navigators";
import AnalyticsNavigator from './AnalyticsNavigator';
import FridgeNavigator from "./FridgeNavigator";
import { styles } from "./styles";
import usePushNotification from "../hooks/usePushNotification";


const BottomTab = createBottomTabNavigator<BaseNaviParamList>();

export default function BaseNavigator() {
    const colorScheme = useColorScheme();
    usePushNotification();

    return (
        <BottomTab.Navigator
            initialRouteName="Fridge"
            tabBarOptions={{
                activeTintColor: Colors[colorScheme].tint,
                style: styles.tarBarStyle,
                tabStyle: { flex: 1, flexDirection: "column" },
                showLabel: false,
            }}>
            <BottomTab.Screen
                name="Fridge"
                component={FridgeNavigator}
                options={{
                    tabBarLabel: "냉장고",
                    tabBarIcon: ({ color }) =>
                        <View style={styles.tarBarContainer}>
                            <MaterialCommunityIcons name="fridge" style={styles.tarBarIcon} color={color} />
                            <Text style={styles.tarBarLabel}>{'냉장고'}</Text>
                        </View>,
                }}
            />
            {/*<BottomTab.Screen*/}
            {/*    name="Recipe"*/}
            {/*    component={RecipeNavigator}*/}
            {/*    options={{*/}
            {/*        tabBarLabel: "레시피",*/}
            {/*        tabBarIcon: ({ color }) =>*/}
            {/*            <View style={styles.tarBarContainer}>*/}
            {/*                <MaterialCommunityIcons name="chef-hat" style={styles.tarBarIcon} color={color} />*/}
            {/*                <Text style={styles.tarBarLabel}>{'레시피'}</Text>*/}
            {/*            </View>*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<BottomTab.Screen*/}
            {/*    name="Analytics"*/}
            {/*    component={AnalyticsNavigator}*/}
            {/*    options={{*/}
            {/*        tabBarLabel: "종합분석",*/}
            {/*        tabBarIcon: ({ color }) =>*/}
            {/*            <View style={styles.tarBarContainer}>*/}
            {/*                <MaterialCommunityIcons name="file-chart" style={styles.tarBarIcon} color={color} />*/}
            {/*                <Text style={styles.tarBarLabel}>{'식생활'}</Text>*/}
            {/*            </View>*/}
            {/*    }}*/}
            {/*/>*/}
            <BottomTab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarLabel: "설정",
                    tabBarIcon: ({ color }) =>
                        <View style={styles.tarBarContainer}>
                            <MaterialCommunityIcons name="settings" style={styles.tarBarIcon} color={color} />
                            <Text style={styles.tarBarLabel}>{'환경설정'}</Text>
                        </View>,
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
                    headerTitle: '추천 레시피',
                    headerStyle: styles.headerStyle,
                    headerLeft: () => <MaterialCommunityIcons name="chef-hat" color="black"
                        style={[styles.headerIcon, { marginLeft: 16 }]} />,
                    headerTitleStyle: styles.headerTitle
                }}
            />
        </RecipeStack.Navigator>
    );
}

const SettingsStack = createStackNavigator<SettingsNaviParamList>();

function SettingsNavigator() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerTitle: '환경 설정',
                    headerStyle: styles.headerStyle,
                    headerLeft: () => <MaterialCommunityIcons name="settings" size={32} color="black"
                        style={[styles.headerIcon, { marginLeft: 16 }]} />,
                    headerTitleStyle: styles.headerTitle
                }}
            />
        </SettingsStack.Navigator>
    );
}