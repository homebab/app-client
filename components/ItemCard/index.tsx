import React from 'react';
import {Image, StyleProp, Text, View, ViewStyle} from "react-native";
import {styles} from "./styles";
import Assets from "../../constants/Assets";
import {Item} from "../../contexts/Container";
import Avatar from "../Avatar";

type Props = {
    item: Item,
    style?: StyleProp<ViewStyle>
    // handlePress?: (e: GestureResponderEvent) => void
}

const ItemCard = (props: Props) => {
    const {item, style} = props;

    return (
        <View style={[styles.container, style ? style : null]}>
            <Avatar source={Assets.Image.ingredients} size={32}/>
            <Text>{item.name}</Text>
        </View>
    );
}

export default ItemCard;
