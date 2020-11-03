import React, {useEffect} from 'react';
import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import Assets from "../../constants/Assets";
import {useContainerContext} from "../../contexts/Container";

type Props = {
    label: string,
    handlePress?: (e: GestureResponderEvent) => void
}

const ItemCard = (props: Props) => {
    const {label, handlePress} = props;

    return (
        <TouchableOpacity style={[styles.container]} onPress={handlePress}>
            <View style={styles.avatar}>
                <Image
                    source={Assets.Image.ingredients}
                    fadeDuration={0}
                    style={{width: 32, height: 32}}
                />
            </View>

            <Text>{label}</Text>
        </TouchableOpacity>
    );
}

export default ItemCard;
