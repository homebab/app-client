import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from "react";
import {Ingredients} from "../constants/Ingredients";
import {Item} from '../contexts/Container';
import {Category} from "../types/Category";

const TopTab = createMaterialTopTabNavigator();

type Props = {
    Component: any
    container: Array<Item>
}

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
function ItemNavigator(props: Props) {
    const {Component, container} = props

    const categories = Object.values(Category)

    return (
        <TopTab.Navigator tabBarOptions={{scrollEnabled: true, tabStyle: {width: "auto"}}}>
            {
                categories.map((category, key) => {
                    return (
                        <TopTab.Screen key={key} name={category}>

                            {
                                _ => Component(
                                    container.filter((item: Item) => category === "전체" ? true : item.category === category)
                                )
                                // (_) => ScrollViewGrid(container.filter((item: Item) => category === "전체" ? true : item.category === category))
                            }
                        </TopTab.Screen>)
                })
            }
        </TopTab.Navigator>
    );
}

export default ItemNavigator;