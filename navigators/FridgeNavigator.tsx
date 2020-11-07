// Each tab has its own navigators stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
import {createStackNavigator} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../types";
import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AddItems from "../screens/AddItems";
import CaptureItem from "../screens/CaptureItem";
import * as React from "react";
import ListItems from "../screens/ListItems";
import AddFridgeItems from "../components/AddFridgeItems";
import NavigationPop from "../components/NavigationPop";
import ThrowAway from "../components/ThrowAway";
import Search from "../components/Search";

const FridgeStack = createStackNavigator<FridgeNaviParamList>();

export default function FridgeNavigator() {

    return (
        <FridgeStack.Navigator>
            <FridgeStack.Screen
                name="ListItems"
                component={ListItems}
                options={{
                    headerTitle: '냉장고',
                    headerLeft: () => <MaterialCommunityIcons name="fridge" size={32} color="black"
                                                              style={{marginLeft: 16}}/>, /* <AntDesign name="home" size={28} color="black" style={{marginLeft: 12}} /> */
                    headerRight: () =>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {/*<Search style={{marginRight: 28}}/>*/}
                            <ThrowAway style={{marginRight: 16}}/>
                        </View>
                }}
            />
            <FridgeStack.Screen
                name="AddItems"
                component={AddItems}
                options={{
                    // TODO: searchbar
                    // @ts-ignore
                    // headerTitle: (props) =>
                    //     <View style={{backgroundColor: 'red', opacity: 0.5, width: Layout.window.width * 0.7, alignSelf: 'flex-end'}}>
                    //         <TextInput/>
                    //     </View>

                    headerTitle: '식품 추가',
                    headerLeft: () => <NavigationPop/>,
                    headerRight: () => <AddFridgeItems/>
                }}
            />
            <FridgeStack.Screen
                name="CaptureItems"
                component={CaptureItem}
                options={{headerTitle: '식품 사진'}}
            />
        </FridgeStack.Navigator>
    );
}