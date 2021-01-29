import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";


type Props = {
    containerStyle?: StyleProp<TextStyle>,
    size?: number,
    onPress: () => void
}

const CrossIconButton = (props: Props) => {

    const { containerStyle, size, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <Feather
                name="x" style={containerStyle} color="black"
                // @ts-ignore
                backgroundColor="transparent" />
        </TouchableOpacity>
    )
}

export default CrossIconButton;