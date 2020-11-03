import React from 'react';
import {Item} from "../../contexts/Account";
import {GestureResponderEvent, Image, Text, View} from "react-native";
import {styles} from "./styles";
import Assets from "../../constants/Assets";

type Props = {
    label: string,
    // showModal: (event: GestureResponderEvent) => void,
}

const ItemCard = (props: Props) => {
    const {label} = props

    return (
        <View style={styles.container}>
            <View style={styles.Avatar}>
                <Image
                    source={Assets.Image.ingredients}
                    fadeDuration={0}
                    style={{width: 32, height: 32}}
                />
            </View>
            <Text>{label}</Text>
        </View>
    );
}

export default ItemCard;
