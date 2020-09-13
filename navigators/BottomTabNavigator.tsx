import {Ionicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Avatar} from 'react-native-paper'
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Index from '../screens/ListRecipes';
import {BottomTabParamList, TabOneParamList, TabTwoParamList} from '../types';
import ListItems from "../screens/ListItems";
import AddItems from '../screens/AddItems';
import CaptureItems from '../screens/CaptureItems';
import {TouchableOpacity, View} from 'react-native';
import {useAccountContext} from "../contexts/Account";
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

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
                    tabBarLabel: "냉장고",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="fridge" size={24} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Recipe"
                component={RecipeNavigator}
                options={{
                    tabBarLabel: "레시피",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="silverware-fork-knife" size={24}
                                                                     color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: { name: string; color: string }) {
//     return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
// }

// Each tab has its own navigators stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function FridgeNavigator() {

    const {accountState, accountDispatch} = useAccountContext();
    const {profile} = accountState;
    const {imageUrl} = profile;

    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="ListItems"
                component={ListItems}
                options={{
                    headerTitle: '냉장고',
                    headerLeft: () => <View><AntDesign name="home" size={28} color="black" style={{marginLeft: 12}} /></View>,
                    headerRight: () =>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons.Button
                                name="md-search"
                                size={32}
                                color="black"
                                // @ts-ignore, TODO: how to fix it without @ts-ignore
                                borderRadius={32}
                                backgroundColor="transparent"
                                iconStyle={{marginRight: 4, marginLeft: 4}}
                                onPress={() => alert("search")}
                            />
                            <TouchableOpacity style={{marginLeft: 12, marginRight: 12}}
                                              onPress={() => AsyncStorage.removeItem('user').then(_ => {
                                                  accountDispatch({type: 'flush', value: {}});
                                                  console.log("[omtm]: success to delete cacheUser and flush accountContext")
                                                  alert('캐시 삭제');
                                                  // navigation.navigate('Auth');
                                              })}>
                                <Avatar.Image size={36} source={{uri: imageUrl}}/>
                            </TouchableOpacity>
                        </View>
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
                name="ListRecipes"
                component={Index}
                options={{headerTitle: '레시피'}}
            />
        </TabTwoStack.Navigator>
    );
}
