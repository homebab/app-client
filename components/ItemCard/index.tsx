import React from 'react';
import {Image, StyleProp, Text, View, ViewStyle} from "react-native";
import {styles} from "./styles";
import Assets from "../../constants/Assets";
import {Item} from "../../contexts/Container";
import Avatar from "../Avatar";

type Props = {
    item: Item,
    containerStyle?: StyleProp<ViewStyle>,
    avatarStyle?: StyleProp<ViewStyle>,
    avatarSize: number,
    // handlePress?: (e: GestureResponderEvent) => void
}

const ItemCard = (props: Props) => {
    const {item, containerStyle, avatarStyle, avatarSize} = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <Avatar style={[{bottom: 8, padding: 2}, avatarStyle]} source={Assets.Image.ingredients} size={avatarSize}/>
            <Text>{item.name}</Text>
        </View>
    );
}

export default ItemCard;
