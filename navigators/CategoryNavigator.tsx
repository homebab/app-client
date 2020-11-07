import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {FunctionComponent, PropsWithChildren} from "react";
import {Item} from '../contexts/Container';
import {Category} from "../types/Category";

const TopTab = createMaterialTopTabNavigator();

type Props = {
    component: any
    container: Array<Item>
}

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
const CategoryNavigator: React.FC<Props> = (props: Props) => {
    const {component, container} = props

    const categories = Object.values(Category)

    return (
        <TopTab.Navigator swipeEnabled={false} tabBarOptions={{scrollEnabled: true, tabStyle: {width: "auto"}}}>
            {
                categories.map((category, key) => {
                    return (
                        <TopTab.Screen key={key} name={category}>
                            {
                                _ => component(
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

export default CategoryNavigator;

export const HOCCategoryNavigator = (component: any) => (container: Array<Item>) => {
    return <CategoryNavigator component={component} container={container}/>
}