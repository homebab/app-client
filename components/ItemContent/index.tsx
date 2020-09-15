import {Image, Text, View} from "react-native";
import React from 'react';
import {Item} from "../../contexts/Account";
import {styles} from './styles'

type Props = {
    item: Item,
}

const ItemContent = (props: Props) => {

    const {name, memo, tag, expiredAt, imageUrl} = props.item;

    const formatDate = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                {!(imageUrl == '') &&
                <Image source={{uri: imageUrl}} style={styles.image}/>}
            </View>

            <View style={styles.content}>
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

