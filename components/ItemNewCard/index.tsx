import React from 'react';
import {Item} from "../../contexts/Account";
import {GestureResponderEvent, Image, Text, View} from "react-native";
import {styles} from "./styles";
import Assets from "../../constants/Assets";

enum Color {
    RED = "#ff3333", YELLOW = "#ffff1a", GREEN = "#47d147"
}

type Props = {
    item: Item,
    showModal: (event: GestureResponderEvent) => void,
}

const ItemCard = (props: Props) => {
    const {item, showModal} = props
    const {expiredAt} = item

    const remainingDay = Math.round((expiredAt.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    const color = 7 > remainingDay && remainingDay > 3 ? Color.YELLOW : remainingDay >= 7 ? Color.GREEN : Color.RED

    return (
        <View style={styles.container}>
            <View style={styles.Avatar}>
                <Image
                    source={Assets.Image.ingredients}
                    fadeDuration={0}
                    style={{width: 32, height: 32}}
                />
            </View>
            <Text>{item.name}</Text>
        </View>
    );
}

export default ItemCard;
