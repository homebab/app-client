import {Image, Text, View} from "react-native";
import React from 'react';
import {Item} from "../../contexts/Account";

type Props = {
    item: Item,
}

const ItemContent = (props: Props) => {

    const {name, memo, tag, expiredAt, imageUrl} = props.item;

    const formatDate = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    return (
        <View style={{
            padding: 18,
            width: "100%",
            flexDirection: "row",
            backgroundColor: "white",
            borderBottomWidth: 1.5,
            borderColor: "#e6e6e6"
        }}>

            <View style={{
                flex: 3,
                height: "100%",
                aspectRatio: 1,
                backgroundColor: "black",
                alignItems: "center",
                justifyContent: "center",
            }}>
                {!(imageUrl == '') &&
                <Image source={{uri: imageUrl}} style={{height: "100%", resizeMode: "cover", aspectRatio: 1}}/>}
            </View>

            <View style={{
                flex: 10,
                height: "100%" /* , backgroundColor:"pink" */,
                alignItems: "flex-start",
                marginLeft: 18
            }}>
                <Text style={{fontSize: 12, color: "#737373"}}>{formatDate(expiredAt)}</Text>
                <Text style={{fontSize: 16}}>{name}</Text>
                <Text style={{position: "absolute", fontSize: 12, bottom: 0, color: "#737373"}}>{memo}</Text>
                <View style={{backgroundColor: "#f2f2f2", padding: 1, position: "absolute", right: 0, top: 0}}>
                    <Text style={{fontSize: 12, color: "#737373"}}>{tag}</Text>
                </View>
            </View>

        </View>
    );
}

export default ItemContent;

