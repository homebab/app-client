import React, {useState, useEffect} from "react";
import {Text, TextInput, TouchableOpacity, View, ViewStyle} from "react-native";
import Avatar from "../../components/Avatar";
import Assets from "../../constants/Assets";
import {Item, useContainerContext} from "../../contexts/Container";
import {convertDateFormat} from "../../utils/convert";
import {EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import {formatMemo} from "../../validators/format";
import {Storage} from "../../types/Storage";
import DeleteItemModal from "../../components/DeleteItemModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { imageKeys } from "../../constants/Ingredients";
import { leftDays } from "../../hooks/useShelfLifeAnalytics";


const TextInputBox = ({active, value, onChangeHandler, containerStyle}: { active: boolean, value: string, onChangeHandler: (t: string) => void, containerStyle: ViewStyle }) => {

    return (
        <View
            style={{flex: 1, padding: 20, paddingTop: 16, paddingBottom: 16, backgroundColor: 'rgba(208,200,192,0.2)'}}>
            <TextInput style={[containerStyle]} keyboardType={"default"} placeholder={"메모 영역 (100자 이하)"}
                       value={value} onChangeText={onChangeHandler} editable={active} multiline={true}/>
        </View>
    )
}

type Props = {
    item: Item
    navigatePop: () => void
}

const DetailItem = (props: Props) => {
    const {item, navigatePop} = props;

    const {containerDispatch} = useContainerContext();

    const [memo, setMemo] = useState<string>(item.memo!);

    const [editingMemo, setEditingMemo] = useState<boolean>(false);
    const [editingExpiredAt, setEditingExpiredAt] = useState<boolean>(false);
    const [throwing, setThrowing] = useState<boolean>(false);

    const ColumnItemInfo = () => {

        const columnItemInfoList = [
            {
                label: "보관상태", value: item.storage,
                containerStyle: {flex: 1, alignItems: 'center'},
                pressable: false
            },
            {
                label: "유통기한", value: convertDateFormat(item.expiredAt!),
                containerStyle: {
                    flex: 1, alignItems: 'center',
                    borderColor: 'rgba(110,115,121,0.8)',
                    borderRightWidth: 0.3, borderLeftWidth: 0.3
                },
                pressable: true,
                onPressHandler: () => setEditingExpiredAt(true)
            },
            {
                label: "보관일수", value: leftDays(item.createdAt!),
                containerStyle: {flex: 1, alignItems: 'center'},
                pressable: false,
            }
        ]

        return (
            <View style={{flexDirection: "row", width: '100%', marginBottom: 24}}>
                {columnItemInfoList.map((info, key) =>
                    <TouchableOpacity disabled={!info.pressable} key={key} style={info.containerStyle as ViewStyle}
                                      onPress={info.onPressHandler}>
                        <Text style={{marginBottom: 8, color: 'rgb(100,102,110)'}}>{info.label}</Text>
                        <Text style={{fontWeight: "bold"}}>{info.value}</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
    const RowItemButton = () => {

        const storages = Object.values(Storage).filter(s => !(s === item.storage || s === Storage.TOTAL));

        const rowItemsButtonList = [
            ...storages.map(s => {
                return {
                    label: `${s} 보관하기`,
                    icon: <MaterialCommunityIcons name={"restore"} color={'#000000'} size={24}
                                                  style={{position: "absolute", left: 32}}/>,
                    onPressHandler: () => {
                        containerDispatch({type: "UPDATE_FRIDGE_ITEM", item: {...item, storage: s}});
                        console.debug(`[omtm]: success to change item storageType to ${s}, ${item.id}`)
                        navigatePop();
                    }
                }
            }),
            {
                label: "버리기",
                icon: <EvilIcons name="trash" color={'black'} size={32}
                                 style={{position: "absolute", left: 28}}/>,
                onPressHandler: () => setThrowing(true)
            }
        ]

        return (
            <>
                {rowItemsButtonList.map((v, k) =>
                    <TouchableOpacity
                        key={k} onPress={v.onPressHandler}
                        style={{
                            alignSelf: "center", alignItems: 'center', justifyContent: 'center', margin: 4,
                            flexDirection: "row", width: '100%', borderWidth: 1, borderColor: 'rgba(208,200,192,0.5)'
                        }}
                    >
                        {v.icon}
                        <Text style={{padding: 8, paddingTop: 16, paddingBottom: 16, fontSize: 16}}>{v.label}</Text>
                    </TouchableOpacity>
                )}
            </>
        )
    }

    const ItemAvatar = () => {
        const key = imageKeys.filter(key => key.includes(item.name) || item.name.includes(key))[0];
        const avatarSize = 58;
        const padding = 14;
        return (
            <View style={{alignItems: 'center', marginBottom: 24}}>
                <Avatar containerStyle={{position: "absolute", top: -40, padding: padding, width: avatarSize + padding*2}}
                    // @ts-ignore
                        source={Assets.Image[key? key: '토마토']}
                        size={avatarSize}/>
                <Text style={{marginTop: 52, fontSize: 18}}>{item.name}</Text>

                <View style={{position: "absolute", alignItems: 'center', marginTop: 16, right: '4%'}}>
                    <Text style={{fontSize: 12}}>{convertDateFormat(item.createdAt!)} 등록</Text>
                    <Text style={{fontSize: 12}}>{convertDateFormat(item.updatedAt!)} 수정</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{flex: 1, width: "92%"}}>
            {ItemAvatar()}

            <ColumnItemInfo/>

            <View style={{height: 120, marginBottom: 20}}>
                <TextInputBox containerStyle={{
                    width: '100%',
                    borderRadius: 8
                }} value={memo} onChangeHandler={text => setMemo(formatMemo(text))} active={editingMemo}/>
                <TouchableOpacity style={{position: "absolute", right: "5%", bottom: "10%"}}
                                  onPress={() => {
                                      if (editingMemo) {
                                          setEditingMemo(false)
                                          containerDispatch({type: "UPDATE_FRIDGE_ITEM", item: {...item, memo: memo}})
                                          console.debug(`[omtm]: success to update item, ${item.id}`)
                                      } else setEditingMemo(true)
                                  }}>
                    <Text>{editingMemo ? "저장" : "수정"}</Text>
                </TouchableOpacity>
            </View>

            {/*<DatePicker/>*/}

            <RowItemButton/>
            <DeleteItemModal
                item={item}
                visible={throwing}
                onCancel={() => setThrowing(false)}
                onConfirm={() => {
                    setThrowing(false);
                    navigatePop();
                }}/>
            <DateTimePickerModal
                date={item.expiredAt!}
                isVisible={editingExpiredAt}
                onCancel={() => setEditingExpiredAt(false)}
                onConfirm={(date: Date) => {
                    containerDispatch({type: "UPDATE_FRIDGE_ITEM", item: {...item, expiredAt: date}});
                    console.debug(`[omtm]: success to update item, ${item.id}`);
                    setEditingExpiredAt(false);
                }}/>
        </View>
    )
}

export default DetailItem;