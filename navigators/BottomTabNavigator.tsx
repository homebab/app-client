import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
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

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (

        <BottomTab.Navigator
            initialRouteName="냉장고"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="냉장고"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="fridge" size={24} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="레시피"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="silverware-fork-knife" size={24}
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

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="ListItems"
                component={ListItems}
                options={{headerTitle: '냉장고'}}
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

function TabTwoNavigator() {
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
