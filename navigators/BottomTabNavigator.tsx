import {Ionicons, MaterialCommunityIcons, Feather} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabTwoScreen from '../screens/TabTwoScreen';
import {BottomTabParamList, TabOneParamList, TabTwoParamList} from '../types';
import ListItems from "../screens/ListItems";
import AddItems from '../screens/AddItems';
import CaptureItems from '../screens/CaptureItems';
import {useAccountStateValue} from "../contexts/Account";
import {StyleSheet, View} from 'react-native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (

        <BottomTab.Navigator
            initialRouteName="Fridge"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="Fridge"
                component={FridgeNavigator}
                options={{
                    title: "냉장고",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="fridge" size={28} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Recipe"
                component={RecipeNavigator}
                options={{
                    title: "레시피",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="silverware-fork-knife" size={28}
                                                                     color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigators stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function FridgeNavigator() {
    // const {accountState} = useAccountStateValue();
    // const {profile} = accountState;
    // const {name} = profile;
    //
    // const styles = StyleSheet.create({
    //     button: {backgroundColor: "transparent"}
    // })

    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="ListItems"
                component={ListItems}
                options={{
                    headerTitle: '냉장고',
                    headerRight: () => <View>
                        <Ionicons.Button
                            name="md-search"
                            size={32}
                            color="black"
                            // @ts-ignore, TODO: how to fix it without @ts-ignore
                            backgroundColor="transparent"
                            onPress={() => alert("search")}
                        />
                    </View >
                }}
                // options={{headerTitle: `${name} 냉장고`}}
            />
            <TabOneStack.Screen
                name="AddItems"
                component={AddItems}
                options={{headerTitle: '식품 추가'}}
            />
            <TabOneStack.Screen
                name="CaptureItems"
                component={CaptureItems}
                options={{headerTitle: '식품 사진'}}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function RecipeNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="TabTwoScreen"
                component={TabTwoScreen}
                options={{headerTitle: '레시피'}}
            />
        </TabTwoStack.Navigator>
    );
}
