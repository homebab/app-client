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
import {createItem} from "../services/aws/appsync";
import {styles} from "./styles";

const FridgeStack = createStackNavigator<FridgeNaviParamList>();

export default function FridgeNavigator() {

    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'AddItems'>>();
    const {containerState} = useContainerContext();
    const {basket} = containerState;

    return (
        <FridgeStack.Navigator>
            <FridgeStack.Screen
                name="ListItems"
                component={ListItems}
                options={{
                    headerTitle: '식재료 관리',
                    headerStyle: styles.headerStyle,
                    headerLeft: () => <MaterialCommunityIcons name="fridge"  color="black" style={[styles.headerIcon, {marginLeft: 16}]}/>,
                    headerRight: () =>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Search containerStyle={[styles.headerIcon, {marginRight: 16}]}/>
                            {/*<ThrowAway style={{marginRight: 16}}/>*/}
                        </View>,
                    headerTitleStyle: styles.headerTitle,
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
                        createItem(basket).then(_ => navigation.navigate('ListItems'));
                    }}/>,
                    headerTitleStyle: styles.headerTitle
                }}
            />
            <FridgeStack.Screen
                name="CaptureItems"
                component={CaptureItem}
                options={{
                    headerTitle: '식품 사진',
                    headerTitleStyles: styles.headerTitle
                }}
            />
        </FridgeStack.Navigator>
    );
}