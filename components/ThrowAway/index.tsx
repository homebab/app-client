import {StyleProp, TouchableOpacity, ViewStyle} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {useContainerContext} from "../../contexts/Container";

type Props = {
    style: StyleProp<ViewStyle>
}

const ThrowAway = (props:Props) => {

    const {containerDispatch} = useContainerContext();

    const onPressHandler = () => {
        containerDispatch({type: 'FLUSH'})
    }

    return (
        <TouchableOpacity style={props.style} onPress={onPressHandler}>
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