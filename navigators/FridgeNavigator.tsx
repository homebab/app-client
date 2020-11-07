// Each tab has its own navigators stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../types";
import {TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import SignOut from "../components/SignOut";
import AddItems from "../screens/AddItems";
import CaptureItem from "../screens/CaptureItem";
import * as React from "react";
import ListItems from "../screens/ListItems";
import {useNavigation} from "@react-navigation/native";
import Layout from "../constants/Layout";
import {Item, useContainerContext} from "../contexts/Container";
import {v4 as uuidv4} from "uuid"
import {Storage} from "../types/Storage";

const FridgeStack = createStackNavigator<FridgeNaviParamList>();

export default function FridgeNavigator() {

    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'AddItems'>>();

    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    return (
        <FridgeStack.Navigator>
            <FridgeStack.Screen
                name="ListItems"
                component={ListItems}
                options={{
                    headerTitle: '냉장고',
                    headerLeft: () => <MaterialCommunityIcons name="fridge" size={32} color="black"
                                                              style={{marginLeft: 20}}/>, /* <AntDesign name="home" size={28} color="black" style={{marginLeft: 12}} /> */
                    headerRight: () =>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons.Button
                                name="md-search"
                                size={32}
                                color="black"
                                // @ts-ignore, TODO: how to fix it without @ts-ignore
                                borderRadius={32}
                                backgroundColor="transparent"
                                iconStyle={{marginRight: 4, marginLeft: 4}}
                                onPress={() => alert("search")}
                            />

                            <SignOut/>
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
                    headerLeft: () =>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }}>
                            <Feather
                                name="x" size={28} color="black"
                                // @ts-ignore
                                backgroundColor="transparent" style={{marginLeft: 10}}/>
                        </TouchableOpacity>,
                    headerRight: () =>
                        <TouchableOpacity onPress={() => {
                            const userItems: Array<Item> = basket.map(item => {
                                const date = new Date();
                                date.setDate(date.getDate() + 7);

                                return {
                                    id: uuidv4(),
                                    name: item.name,
                                    expiredAt: date, // | Date;
                                    storage: Storage.FRIDGE,
                                    category: item.category,
                                }
                            })
                            containerDispatch({type: 'addFridgeItems', value: userItems})
                            navigation.pop()
                        }}>
                            <AntDesign name={"arrowright"} size={28} color="black"
                                       style={{marginRight: 20}}/>
                        </TouchableOpacity>
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