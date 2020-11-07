// Each tab has its own navigators stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../types";
import {TouchableOpacity, View} from "react-native";
import {AntDesign, Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import AddItems from "../screens/AddItems";
import CaptureItem from "../screens/CaptureItem";
import * as React from "react";
import ListItems from "../screens/ListItems";
import {useNavigation} from "@react-navigation/native";
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
                                                              style={{marginLeft: 16}}/>, /* <AntDesign name="home" size={28} color="black" style={{marginLeft: 12}} /> */
                    headerRight: () =>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity style={{marginRight: 24}} onPress={() => alert("search")}>
                                <Ionicons
                                    name="md-search"
                                    size={32}
                                    color="black"
                                    // @ts-ignore, TODO: how to fix it without @ts-ignore
                                    borderRadius={32}
                                    backgroundColor="transparent"
                                    // iconStyle={{marginRight: 4, marginLeft: 4}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight: 16}} onPress={() => alert("search")}>
                                <Ionicons
                                    name="ios-trash"
                                    size={32}
                                    color="black"
                                    // @ts-ignore, TODO: how to fix it without @ts-ignore
                                    borderRadius={32}
                                    backgroundColor="transparent"
                                    // iconStyle={{marginRight: 4, marginLeft: 4}}
                                />
                            </TouchableOpacity>

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
                                backgroundColor="transparent" style={{marginLeft: 16}}/>
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
                                       style={{marginRight: 16}}/>
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