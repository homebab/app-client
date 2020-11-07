import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from "react";
import {Item} from '../contexts/Container';
import {Storage} from '../types/Storage'
import ItemNavigator from "./ItemNavigator";

const TopTab = createMaterialTopTabNavigator();

type Props = {
    component: any
    container: Array<Item>
}

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
function StorageNavigator(props: Props): JSX.Element {
    const {component, container} = props

    const storages = Object.values(Storage)

    return (
        <TopTab.Navigator>
            {
                storages.map((storage, key) => {
                    return (
                        <TopTab.Screen key={key} name={storage}>
                            {
                                _ => component(
                                    container.filter((item: Item) => {
                                        console.log('아이템' + item.storage)
                                        return storage == Storage.TOTAL ? true : item.storage== storage
                                    })
                                )
                            }
                        </TopTab.Screen>)
                })
            }
        </TopTab.Navigator>
    );
}

export default StorageNavigator;

export const HOCStorageNavigator = (component: any) => (container: Array<Item>) => {
    return <StorageNavigator component={component} container={container}/>
}