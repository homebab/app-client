import {Ionicons} from "@expo/vector-icons";
import {GestureResponderEvent, StyleProp, TouchableOpacity, ViewStyle} from "react-native";
import * as React from "react";

type Props = {
    containerStyle?: StyleProp<ViewStyle>,
    size?: number,
    onPressHandler?: (event: GestureResponderEvent) => void,
}
const Search = (props: Props) => {

    const {containerStyle, size, onPressHandler} = props;

    return (
        <TouchableOpacity style={containerStyle} onPress={onPressHandler}>
            <Ionicons
                name="ios-search"
                size={size? size: 28}
                color="black"
                // @ts-ignore, TODO: how to fix it without @ts-ignore
                borderRadius={32}
                backgroundColor="transparent"
                // iconStyle={{marginRight: 4, marginLeft: 4}}
            />
        </TouchableOpacity>
    )
}

export default Search