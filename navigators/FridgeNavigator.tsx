// Each tab has its own navigators stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AddItems from "../screens/AddItems";
import CaptureItem from "../screens/CaptureItemV0";
import * as React from "react";
import ListItems from "../screens/ListItems";
import NextIconButton from "../components/NextIconButton";
import CrossIconButton from "../components/CrossIconButton";
import Search from "../components/Search";
import {useNavigation} from "@react-navigation/native";
import {useContainerContext} from "../contexts/Container";
import {FridgeNaviParamList} from "../types/Navigators";

const FridgeStack = createStackNavigator<FridgeNaviParamList>();

export default function FridgeNavigator() {

    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'AddItems'>>();
    const {containerDispatch} = useContainerContext();

    return (
        <FridgeStack.Navigator>
            <FridgeStack.Screen
                name="ListItems"
                component={ListItems}
                options={{
                    headerTitle: '냉장고',
                    headerLeft: () => <MaterialCommunityIcons name="fridge-outline" size={32} color="black"
                                                              style={{marginLeft: 16}}/>, /* <AntDesign name="home" size={28} color="black" style={{marginLeft: 12}} /> */
                    headerRight: () =>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Search containerStyle={{marginRight: 16}}/>
                            {/*<ThrowAway style={{marginRight: 16}}/>*/}
                        </View>,
                    headerTitleStyle: {
                        fontFamily: 'nanum-square-round-bold'
                    }
                }}
            />
            <FridgeStack.Screen
                name="AddItems"
                component={AddItems}
                options={{
                    headerTitle: '식품 추가',
                    headerLeft: () => <CrossIconButton containerStyle={{marginLeft: 16}} size={28}
                                                       onPress={() => navigation.navigate("ListItems")}/>,
                    headerRight: () => <NextIconButton containerStyle={{marginRight: 16}} size={28} onPress={() => {
                        containerDispatch({type: 'MOVE_BASKET_TO_FRIDGE'});
                        navigation.navigate('ListItems');
                    }}/>,
                    headerTitleStyle: {
                        fontFamily: 'nanum-square-round-bold'
                    }
                }}
            />
            <FridgeStack.Screen
                name="CaptureItems"
                component={CaptureItem}
                options={{
                    headerTitle: '식품 사진',
                    headerTitleStyle: {
                        fontFamily: 'nanum-square-round-bold'
                    }
                }}
            />
        </FridgeStack.Navigator>
    );
}