import React, {Dispatch, SetStateAction, useState} from "react";
import {Modal, Text, TouchableOpacity, View} from "react-native";
import Avatar from "../../components/Avatar";
import Assets from "../../constants/Assets";
import {ListItem} from "react-native-elements";

type Props = {
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

const DetailItem = (props: Props) => {
    const {isVisible, setIsVisible} = props;

    const list = [
        {title: 'List Item 1'},
        {title: 'List Item 2'},
        {
            title: 'Cancel',
            containerStyle: {backgroundColor: 'red'},
            titleStyle: {color: 'white'},
            onPress: () => setIsVisible(false),
        },
    ];

    return (
        <Modal visible={isVisible} animationType={"slide"} transparent={true}>
            <TouchableOpacity style={{
                flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.4)'
            }} onPressOut={() => setIsVisible(false)}>
                <View style={{flex: 0.6, backgroundColor: 'white', width: '100%'}}>
                    <Avatar style={{alignSelf: "center"}} source={Assets.Image.ingredients} size={32}/>
                    <View>
                        <Text>hi</Text>
                        {list.map((l, i) => (
                            <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                <ListItem.Content>
                                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default DetailItem;