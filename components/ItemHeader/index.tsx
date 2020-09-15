import {GestureResponderEvent, Text, TouchableOpacity, View} from "react-native";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import React from 'react';
import {Item} from "../../contexts/Account";
import {styles} from "./styles";

enum Color {
    RED = "#ff3333", YELLOW = "#ffff1a", GREEN = "#47d147"
}

type Props = {
    item: Item,
    showModal: (event: GestureResponderEvent) => void,
}

const ItemHeader = (props: Props) => {
    const {item, showModal} = props
    const {expiredAt} = item

    const remainingDay = Math.round((expiredAt.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    const color = 7 > remainingDay && remainingDay > 3 ? Color.YELLOW : remainingDay >= 7 ? Color.GREEN : Color.RED

    return (
        <View style={styles.container}>
            <View style={{marginLeft: 10, marginRight: 12}}>
                <MaterialCommunityIcons name="circle" color={color} size={14}/>
            </View>
            <Text>{remainingDay}일 남은 식품</Text>

            <View style={styles.deleteButton}>
                <TouchableOpacity style={{}} onPress={showModal}>
                    <Entypo name="cross" size={16} color="white"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ItemHeader;
