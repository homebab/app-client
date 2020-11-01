import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ingredients from "../assets/ingredients.json"
import ListItems from "../screens/ListItems";
import React from "react";
import {StyleSheet, View} from "react-native";
import {styles} from "../screens/ListItems/styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native';

const TopTab = createMaterialTopTabNavigator();

// refer to https://reactnavigation.org/docs/material-top-tab-navigator/
function ItemNavigator() {

    const navigation = useNavigation()
    const itemCategories = ingredients.category;
    const styles = StyleSheet.create({
        plusButton: {
            position: "absolute",
            padding: 20,
            borderRadius: 50,
            bottom: 36,
            right: 28,
            backgroundColor: "black"
        }
    })

    return (
        <>
            <TopTab.Navigator tabBarOptions={{scrollEnabled: true, tabStyle: {width: "auto"}}}>
                {
                    itemCategories.map((itemType, key) => (
                        <TopTab.Screen key={key} name={itemType} component={ListItems}/>
                    ))
                }
            </TopTab.Navigator>
            <View style={styles.plusButton}>
                <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
                    <AntDesign name="plus" size={20} color='white'/>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default ItemNavigator;