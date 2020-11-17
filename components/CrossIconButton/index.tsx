import {TouchableOpacity, ViewStyle} from "react-native";
import {Feather} from "@expo/vector-icons";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../../types";

type Props = {
    containerStyle?: ViewStyle,
    size?: number,
    onPressHandler: () => void
}

const CrossIconButton = (props: Props) => {

    const {containerStyle, size, onPressHandler} = props;

    return (
        <TouchableOpacity style={containerStyle} onPress={onPressHandler}>
            <Feather
                name="x" size={size? size: 28} color="black"
                // @ts-ignore
                backgroundColor="transparent"/>
        </TouchableOpacity>
    )
}

export default CrossIconButton;