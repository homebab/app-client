
import {View, Text, TouchableOpacity, GestureResponderEvent} from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import React from 'react';
import { Item } from "../../contexts/Account";
import {EndPoints} from "../../constants/Endpoints";
import {deleteUserItems} from "../../services/api";

enum Color {
    RED = "#ff3333", YELLOW = "#ffff1a", GREEN = "#47d147"
}

type Props = {
    item: Item,
}

const ItemHeader = (props: Props) => {
    const {item} = props
    const {id, expiredAt} = item

    const remainingDay = Math.round((expiredAt.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    const color = 7 > remainingDay && remainingDay > 3 ? Color.YELLOW : remainingDay >= 7 ? Color.GREEN : Color.RED

    const deleteButton = (e: GestureResponderEvent) => {

        // TODO: fetch DELETE API to delete item on RDB
        deleteUserItems(id)
            .then(res => console.log("[omtm]: success to delete user's item with " + res))
            .catch(err => console.warn("[omtm]: fail to delete user's item with " + err))

        // TODO: fetch DELETE API to delete item image on s3

        // TODO: fetch POST API for event logging

    }

    return (
        <View style={{ padding: 10, width: "100%", flexDirection: "row", backgroundColor: "transparent", alignItems: "center" }}>
            <View style={{ marginLeft: 10, marginRight: 12 }}>
                <MaterialCommunityIcons name="circle" color={color} size={14} />
            </View>
            <Text>{remainingDay}일 남은 식품</Text>

            <View style={{ position: "absolute", padding: 2, borderRadius: 16, right: 18, aspectRatio: 1, backgroundColor: "#b3b3b3" }}>
                <TouchableOpacity style={{}} onPress={deleteButton}>
                    <Entypo name="cross" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ItemHeader;
