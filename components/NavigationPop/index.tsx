import {TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../../types";


const NavigationPop = () => {

    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'AddItems'>>();

    return (
        <TouchableOpacity onPress={() => {
            navigation.goBack();
        }}>
            <Feather
                name="x" size={28} color="black"
                // @ts-ignore
                backgroundColor="transparent" style={{marginLeft: 16}}/>
        </TouchableOpacity>
    )
}

export default NavigationPop;