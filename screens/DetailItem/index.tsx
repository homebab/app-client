import React, {Dispatch, SetStateAction} from "react";
import {Text, View} from "react-native";
import Avatar from "../../components/Avatar";
import Assets from "../../constants/Assets";
import {ListItem} from "react-native-elements";
import {Item, useContainerContext} from "../../contexts/Container";
import DeleteItem from "../../components/DeleteItem";

type Props = {
    item: Item
    navigatePop: () => void
}

const DetailItem = (props: Props) => {
    const {item, navigatePop} = props;

    const {containerDispatch} = useContainerContext();

    const list = [
        {title: 'List Item 1'},
        {title: 'List Item 2'},
        {
            title: '버리기',
            containerStyle: {backgroundColor: '#f44336'},
            titleStyle: {color: 'white'},
            onPress: () => {
                containerDispatch({
                    type: "deleteFridgeItem",
                    value: {id: item.id}
                })

                console.debug(`[omtm]: success to delete item, ${item.id}`)
                navigatePop();
            },
        },
    ];

    const rowItemInfoList = [
        {label: "보관상태", value: item.storage},
        {label: "등록일", value: item.createdAt},
        // {label: "보관일수", value: new Date().getDay() - item.createdAt?.getDay()}
    ]

    return (

        <View>
            <Avatar style={{alignSelf: "center"}} source={Assets.Image.ingredients} size={32}/>
            <Text>{item.name}</Text>

            <View style={{flexDirection: "row"}}>
                <View>
                    <Text>보관상태</Text>
                    <Text>{item.storage}</Text>
                </View>
                <View>
                    <Text>보관상태</Text>
                    <Text>{item.storage}</Text>
                </View>
                <View>
                    <Text>보관상태</Text>
                    <Text>{item.storage}</Text>
                </View>
            </View>

            <View>
                {list.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
            <DeleteItem item={item}/>
        </View>
    )
}

export default DetailItem;