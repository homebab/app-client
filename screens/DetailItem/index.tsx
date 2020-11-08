import React from "react";
import {Text, View, ViewStyle} from "react-native";
import Avatar from "../../components/Avatar";
import Assets from "../../constants/Assets";
import {ListItem} from "react-native-elements";
import {Item, useContainerContext} from "../../contexts/Container";
import {convertDateFormat} from "../../utils/convert";

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
                containerDispatch({type: "deleteFridgeItem", value: {id: item.id}})

                console.debug(`[omtm]: success to delete item, ${item.id}`)
                navigatePop();
            },
        },
    ];
    console.log(typeof item.createdAt)
    // console.log(item.createdAt?.getDate())
    const rowItemInfoList = [
        {
            label: "보관상태",
            containerStyle: {
                flex: 1,
                alignItems: 'center',
                borderRightColor: 'rgba(160,169,179,0.8)',
                borderRightWidth: 0.3
            },
            value: item.storage
        },
        {
            label: "등록일",
            containerStyle: {
                flex: 1,
                alignItems: 'center',
                borderRightColor: 'rgba(160,169,179,0.8)',
                borderRightWidth: 0.3
            },
            value: convertDateFormat(item.createdAt!)
        },
        {
            label: "보관일수",
            containerStyle: {flex: 1, alignItems: 'center'},
            value: new Date().getDate() - item.createdAt!.getDate() + 1
        }
    ]

    return (

        <View>
            <Avatar style={{alignSelf: "center"}} source={Assets.Image.ingredients} size={32}/>
            <Text>{item.name}</Text>

            <View style={{flexDirection: "row", width: '100%'}}>
                {rowItemInfoList.map((item, key) => {
                    return (
                        <View key={key} style={item.containerStyle as ViewStyle}>
                            <Text>{item.label}</Text>
                            <Text>{item.value}</Text>
                        </View>
                    )
                })}

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
            {/*<DeleteItem item={item}/>*/}
        </View>
    )
}

export default DetailItem;