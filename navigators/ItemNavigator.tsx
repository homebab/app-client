import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ingredients from "../assets/ingredients.json"
import ListItems from "../screens/ListItems";
import React from "react";

import { View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import {NavigationHelpers, ParamListBase, TabNavigationState} from "@react-navigation/native";
import {
    MaterialTopTabBarProps,
    MaterialTopTabDescriptorMap,
    MaterialTopTabNavigationEventMap
} from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import Layout from "../constants/Layout";
// import {
//     MaterialTopTabDescriptorMap,
//     MaterialTopTabNavigationEventMap
// } from "@react-navigation/material-top-tabs/src/types";
// state: TabNavigationState<ParamListBase>;
// navigation: NavigationHelpers<
//     ParamListBase,
//     MaterialTopTabNavigationEventMap
//     >;
// descriptors: MaterialTopTabDescriptorMap;

function MyTabBar(props: MaterialTopTabBarProps) {
    const {state, navigation,descriptors, position} = props;
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_: any, i: number) => i);
                const opacity = Animated.interpolate(position, {
                    inputRange,
                    outputRange: inputRange.map((i: number) => (i === index ? 1 : 0.5)),
                });

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <Animated.Text style={{ opacity }}>
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const TopTab = createMaterialTopTabNavigator();

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
function ItemNavigator() {

    const itemCategories = ingredients.카테고리.종류;
    console.log(itemCategories)

    return (
        <TopTab.Navigator tabBarOptions={{scrollEnabled: true, tabStyle: {width: "auto"}}} >
            {
                itemCategories.map((itemType, key) => (
                    <TopTab.Screen key={key} name={itemType} component={ListItems}/>
                ))
            }
        </TopTab.Navigator>
    );
}

export default ItemNavigator;