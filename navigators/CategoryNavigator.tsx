import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {FC, FunctionComponent, PropsWithChildren} from "react";
import {Item} from '../contexts/Container';
import {Category} from "../types/Category";

const TopTab = createMaterialTopTabNavigator();

type Props = {
    component: React.FC<Array<Item>>
    container: Array<Item>
}

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
const CategoryNavigator: React.FC<Props> = (props: PropsWithChildren<Props>) => {
    const {component, container, children} = props

    const categories = Object.values(Category)

    return (
        <TopTab.Navigator swipeEnabled={false} tabBarOptions={{scrollEnabled: true, tabStyle: {width: "auto"}}}>
            {
                categories.map((category, key) => {
                    return (
                        <TopTab.Screen key={key} name={category}>
                            {
                                _ => component(
                                    container.filter((item: Item) => item.category === category)
                                )
                            }
                        </TopTab.Screen>)
                })
            }
        </TopTab.Navigator>
    );
}

export default CategoryNavigator;

export const HOCCategoryNavigator = (component: React.FC<Array<Item>>) => (container: Array<Item>) => {
    return <CategoryNavigator component={component} container={container}/>
}