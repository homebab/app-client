// Each tab has its own navigators stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
import {createStackNavigator} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../types";
import {useAccountContext} from "../contexts/Account";
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, View} from "react-native";
import ItemNavigator from "./ItemNavigator";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import SignOut from "../components/SignOut";
import AddItems from "../screens/AddItems";
import CaptureItem from "../screens/CaptureItem";
import * as React from "react";
import ListItems from "../screens/ListItems";

const FridgeStack = createStackNavigator<FridgeNaviParamList>();

// const ListItemsScreen = () => {
//
//     const navigation = useNavigation()
//     const styles = StyleSheet.create({
//         plusButton: {
//             position: "absolute",
//             padding: 20,
//             borderRadius: 50,
//             bottom: 36,
//             right: 28,
//             backgroundColor: "black"
//         }
//     })
//     return (
//         <>
//             <ItemNavigator/>
//
//             <View style={styles.plusButton}>
//                 <TouchableOpacity onPress={() => navigation.navigate('AddItems')}>
//                     <AntDesign name="plus" size={20} color='white'/>
//                 </TouchableOpacity>
//             </View>
//         </>
//     )
// }

export default function FridgeNavigator() {

    const {accountState, accountDispatch} = useAccountContext();
    const {profile} = accountState;
    const {imageUrl} = profile;


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
                options={{headerTitle: '식품 추가'}}
            />
            <FridgeStack.Screen
                name="CaptureItems"
                component={CaptureItem}
                options={{headerTitle: '식품 사진'}}
            />
        </FridgeStack.Navigator>
    );
}