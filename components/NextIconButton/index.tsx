import {Item, useContainerContext} from "../../contexts/Container";
import {v4 as uuidv4} from "uuid";
import {Storage} from "../../types/Storage";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {TouchableOpacity, ViewStyle} from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../../types";

type Props = {
    containerStyle?: ViewStyle,
    size?: number,
    onPress?: () => void,
}

const AddFridgeItems = (props: Props) => {

    const {containerStyle, size, onPress} = props;

    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            <Ionicons name={"ios-arrow-forward"} size={size? size: 28} color="black"/>
        </TouchableOpacity>
    )
}

export default AddFridgeItems;