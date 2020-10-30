import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ListRecipes from '../screens/ListRecipes';
import {BaseNaviParamList, FridgeNaviParamList, RecipeNaviParamList} from '../types';
import ListItems from "../screens/ListItems";
import AddItem from '../screens/AddItem';
import CaptureItem from '../screens/CaptureItem';
import {View} from 'react-native';
import {useAccountContext} from "../contexts/Account";
import SignOut from "../components/SignOut";
import ItemNavigator from "./ItemNavigator";

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

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: { name: string; color: string }) {
//     return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
// }

// Each tab has its own navigators stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const FridgeStack = createStackNavigator<FridgeNaviParamList>();

function FridgeNavigator() {

    const {accountState, accountDispatch} = useAccountContext();
    const {profile} = accountState;
    const {imageUrl} = profile;

    return (
        <FridgeStack.Navigator>
            <FridgeStack.Screen
                name="ListItems"
                component={ItemNavigator}
                options={{
                    headerTitle: '냉장고',
                    headerLeft: () => <MaterialCommunityIcons name="fridge" size={32} color="black"
                                                              style={{marginLeft: 20}}/>, /* <AntDesign name="home" size={28} color="black" style={{marginLeft: 12}} /> */
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

                            <SignOut/>
                        </View>
                }}
                // options={{headerTitle: `${name} 냉장고`}}
            />
            <FridgeStack.Screen
                name="AddItems"
                component={AddItem}
                options={{headerTitle: '식품 추가'}}
            />
            <FridgeStack.Screen
                name="CaptureItems"
                component={CaptureItem}
                options={{headerTitle: '식품 사진'}}
            />
        </FridgeStack.Navigator>
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
                    headerLeft: () => <MaterialCommunityIcons name="chef-hat" size={32} color="black" style={{marginLeft: 20}}/>
                }}
            />
        </RecipeStack.Navigator>
    );
}
