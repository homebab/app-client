import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ingredients from "../assets/ingredients.json"
import ListItems from "../screens/ListItems";
import React from "react";

const TopTab = createMaterialTopTabNavigator();

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
function ItemNavigator() {

    const itemCategories = ingredients.category;
    console.log(itemCategories)

    return (
        <TopTab.Navigator tabBarOptions={{scrollEnabled: true, tabStyle: {width: "auto"}}}>
            {
                itemCategories.map((itemType, key) => (
                    <TopTab.Screen key={key} name={itemType} component={ListItems}/>
                ))
            }
        </TopTab.Navigator>
    );
}

export default ItemNavigator;