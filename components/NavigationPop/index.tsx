import {TouchableOpacity, ViewStyle} from "react-native";
import {Feather} from "@expo/vector-icons";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../../types";

type Props = {
    containerStyle?: ViewStyle,
    size?: number,
}

const NavigationPop = (props: Props) => {

    const {containerStyle, size} = props;
    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'AddItems'>>();

    return (
        <TouchableOpacity style={containerStyle} onPress={() => {
            navigation.goBack();
        }}>
            <Feather
                name="x" size={size? size: 28} color="black"
                // @ts-ignore
                backgroundColor="transparent"/>
        </TouchableOpacity>
    )
}

export default NavigationPop;