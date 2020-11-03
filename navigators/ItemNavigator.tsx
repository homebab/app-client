import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ingredients from "../assets/ingredients.json"
import React from "react";
import {Item, useAccountContext} from "../contexts/Account";
import {Ingredients} from "../constants/Ingredients";

const TopTab = createMaterialTopTabNavigator();

type Props = {
    Component: any
    // container: Array<any>
}

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
function ItemNavigator(props: Props) {
    const {Component} = props

    const categories = Ingredients.categories

    return (
        <TopTab.Navigator tabBarOptions={{scrollEnabled: true, tabStyle: {width: "auto"}}}>
            {
                categories.map((category, key) => {
                    return (
                        <TopTab.Screen key={key} name={category}>

                            {
                                (props) => Component()
                                // (_) => ItemsGrid(container.filter((item: Item) => category === "전체" ? true : item.category === category))
                            }
                        </TopTab.Screen>)
                })
            }
        </TopTab.Navigator>
    );
}

export default ItemNavigator;