import {Ionicons} from "@expo/vector-icons";
import {TouchableOpacity, ViewStyle} from "react-native";
import * as React from "react";

type Props = {
    containerStyle?: ViewStyle,
    size?: number,
    onPress?: () => void,
}

const AddFridgeItems = (props: Props) => {

    const {containerStyle, size, onPress} = props;

    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            <Ionicons name={"ios-arrow-forward"} size={size ? size : 28} color="black"/>
        </TouchableOpacity>
    )
}

export default AddFridgeItems;