import {StyleProp, TouchableOpacity, ViewStyle} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";

type Props = {
    style: StyleProp<ViewStyle>
}

const ThrowAway = (props:Props) => {

    const PressHandler = () => {

    }

    return (
        <TouchableOpacity style={props.style} onPress={() => alert("search")}>
            <Ionicons
                name="ios-trash"
                size={32}
                color="black"
                // @ts-ignore, TODO: how to fix it without @ts-ignore
                borderRadius={32}
                backgroundColor="transparent"
                // iconStyle={{marginRight: 4, marginLeft: 4}}
            />
        </TouchableOpacity>
    )
}

export default ThrowAway;