import React from 'react';
import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import Assets from "../../constants/Assets";
import {useContainerContext, Item} from "../../contexts/Container";
import { useRoute } from '@react-navigation/native';

type Props = {
    item: Item
}

const AddItemCard = (props: Props) => {
    const {item} = props;

    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const isContained = basket.filter(i => i.name == item.name).length > 0;

    const handlePress = (_: GestureResponderEvent) => {
        // isContain ? deleteItem : addItem
        const updatedBasket = isContained ?
            basket.filter(i => i.name != item.name) :
            [...basket, {name: item.name, category: item.category}];
        containerDispatch({type: "updateBasket", value: {basket: updatedBasket}});
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={[styles.avatar, isContained ? styles.pressed : styles.unPressed]}>
                <Image
                    source={Assets.Image.ingredients}
                    fadeDuration={0}
                    style={{width: 32, height: 32}}
                />
            </View>

            <Text style={isContained ? styles.pressed : styles.unPressed}>{item.name}</Text>
        </TouchableOpacity>
    );
}

export default AddItemCard;
