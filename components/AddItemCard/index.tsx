import React, {useEffect} from 'react';
import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import Assets from "../../constants/Assets";
import {useContainerContext} from "../../contexts/Container";

type Props = {
    label: string
}

const AddItemCard = (props: Props) => {
    const {label} = props;

    const {containerState, containerDispatch} = useContainerContext();
    const {basket} = containerState;

    const isContained = basket.filter(item => item.name == label).length > 0;

    const handlePress = (_: GestureResponderEvent) => {
        console.log(isContained);
        const updatedBasket = isContained ? basket.filter(item => item.name != label) : [...basket, {name: label}];
        containerDispatch({type: "updateBasket", value: {basket: updatedBasket}});
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={[styles.avatar, isContained? styles.pressed: styles.unPressed]}>
                <Image
                    source={Assets.Image.ingredients}
                    fadeDuration={0}
                    style={{width: 32, height: 32}}
                />
            </View>

            <Text style={isContained? styles.pressed: styles.unPressed}>{label}</Text>
        </TouchableOpacity>
    );
}

export default AddItemCard;
