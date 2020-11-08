import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from "react";
import {Item} from '../contexts/Container';
import {Storage} from '../types/Storage'

const TopTab = createMaterialTopTabNavigator();

type Props = {
    component: React.FC<Array<Item>>,
    container: Array<Item>
}

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
function StorageNavigator(props: Props) {
    const {component, container} = props

    const storages = Object.values(Storage)

    return (
        <TopTab.Navigator swipeEnabled={false}>
            {
                storages.map((storage, key) => {
                    return (
                        <TopTab.Screen key={key} name={storage}>
                            {
                                _ => component(
                                    container.filter((item: Item) => storage == Storage.TOTAL ? true : item.storage == storage)
                                )
                            }
                        </TopTab.Screen>)
                })
            }
        </TopTab.Navigator>
    );
}

export default StorageNavigator;

export const HOCStorageNavigator = (component: React.FC<Array<Item>>) => (container: Array<Item>) => {
    return <StorageNavigator component={component} container={container}/>
}