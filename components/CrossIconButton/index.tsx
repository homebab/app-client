import {TouchableOpacity, ViewStyle} from "react-native";
import {Feather} from "@expo/vector-icons";
import * as React from "react";


type Props = {
    containerStyle?: ViewStyle,
    size?: number,
    onPress: () => void
}

const CrossIconButton = (props: Props) => {

    const {containerStyle, size, onPress} = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <Feather
                name="x" style={containerStyle} color="black"
                // @ts-ignore
                backgroundColor="transparent"/>
        </TouchableOpacity>
    )
}

export default CrossIconButton;