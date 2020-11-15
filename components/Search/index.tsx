import {Ionicons} from "@expo/vector-icons";
import {StyleProp, TouchableOpacity, ViewStyle} from "react-native";
import * as React from "react";

type Props = {
    style?: StyleProp<ViewStyle>
}
const Search = (props: Props) => {

    return (
        <TouchableOpacity style={props.style} onPress={() => alert("search")}>
            <Ionicons
                name="md-search"
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

export default Search