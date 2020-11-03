import React, {useEffect, useState} from 'react';
import {Item} from "../../contexts/Account";
import {GestureResponderEvent, Image, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import Assets from "../../constants/Assets";

type Props = {
    label: string,
    // showModal: (event: GestureResponderEvent) => void,
}

const ItemCard = (props: Props) => {
    const {label} = props;
    const [isPressed, setIsPressed] = useState<boolean>(false);

    useEffect(() => {
        console.log(`[omtm]: ${label} is pressed, set ${isPressed}`)
    }, [isPressed])
    const handlePress = (_: GestureResponderEvent) => {
        isPressed ? setIsPressed(false) : setIsPressed(true);
    }

    return (
        <TouchableOpacity style={[styles.container]} onPress={handlePress}>
            <View style={[styles.avatar, isPressed? styles.pressed: styles.unPressed]}>
                <Image
                    source={Assets.Image.ingredients}
                    fadeDuration={0}
                    style={{width: 32, height: 32}}
                    // style={{width: 32, height: 32}}
                />
            </View>

            <Text style={isPressed? styles.pressed: styles.unPressed}>{label}</Text>
        </TouchableOpacity>
    );
}

export default ItemCard;
