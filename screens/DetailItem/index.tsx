import React, {useState} from "react";
import {ScrollView, Text, TextInput, TouchableOpacity, View, ViewStyle} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Avatar from "../../components/Avatar";
import Assets from "../../constants/Assets";
import {Item} from "../../contexts/Container";
import {convertDateFormat} from "../../utils/convert";
import {EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import {formatMemo} from "../../validators/format";
import {Storage} from "../../types/Storage";
import DeleteItemModal from "../../components/DeleteItemModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {getImageKey} from "../../constants/Ingredients";
import {leftDays} from "../../hooks/useShelfLifeAnalytics";
import ButtonList from "../../components/ButtonList";
import {updateItem} from "../../services/aws/appsync"
import {avatarSize, styles} from "./styles";


const TextInputBox = ({
                          active,
                          value,
                          onChangeHandler,
                          containerStyle
                      }: { active: boolean, value: string, onChangeHandler: (t: string) => void, containerStyle: ViewStyle }) => {

    return (
        <View
            style={styles.textInputContainer}>
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

    const [memo, setMemo] = useState<string>(item.memo!);

    const [editingMemo, setEditingMemo] = useState<boolean>(false);
    const [editingExpiredAt, setEditingExpiredAt] = useState<boolean>(false);
    const [throwing, setThrowing] = useState<boolean>(false);

    const ColumnItemInfo = () => {

        const columnItemInfoList = [
            {
                label: "보관상태", value: item.storage,
                containerStyle: styles.columnItemInfo,
                pressable: false
            },
            {
                label: "유통기한", value: convertDateFormat(item.expiredAt!),
                containerStyle: styles.columnItemCenter,
                pressable: true,
                onPressHandler: () => setEditingExpiredAt(true)
            },
            {
                label: "보관일수", value: leftDays(item.createdAt!),
                containerStyle: styles.columnItemInfo,
                pressable: false
            }
        ]

        return (
            <View style={styles.columnItemInfoContainer}>
                {columnItemInfoList.map((info, key) =>
                    <TouchableOpacity disabled={!info.pressable} key={key} style={info.containerStyle as ViewStyle}
                                      onPress={info.onPressHandler}>
                        <Text style={styles.columnItemInfoTextKey}>{info.label}</Text>
                        <Text style={styles.columnItemInfoTextValue}>{info.value}</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }

    const RowItemButton = () => {
        const storages = Object.values(Storage).filter(s => s != item.storage);
        const rowItemsButtonList = [
            ...storages.map(s => {
                return {
                    label: `${s} 보관하기`,
                    icon: <MaterialCommunityIcons name={"restore"} color={'#000000'}
                                                  size={hp(2.8)} style={styles.rowItemButtonIcon1}/>,
                    onPress: () => {
                        updateItem({...item, storage: s});
                        // containerDispatch({type: "UPDATE_FRIDGE_ITEM", item: {...item, storage: s}});
                        navigatePop();
                    }
                }
            }),
            {
                label: "버리기",
                icon: <EvilIcons name="trash" color={'black'} size={hp(3.6)}
                                 style={styles.rowITemButtonIcon2}/>,
                onPress: () => setThrowing(true)
            }
        ]

        return (
            <ButtonList dataset={rowItemsButtonList}
                        buttonContainerStyle={{borderTopColor: 'white', borderLeftColor: 'white'}}/>
        )
    }

    const ItemAvatar = () => {
        const key = getImageKey(item.name);
        return (
            <View style={styles.itemAvatarContainer}>
                <Avatar
                    containerStyle={styles.itemAvatar}
                    // @ts-ignore
                    source={Assets.FoodImages[key ? key : 'default']}
                    size={avatarSize}/>
                <Text style={styles.itemText}>{item.name}</Text>

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{convertDateFormat(item.createdAt!)} 등록</Text>
                    <Text style={styles.dateText}>{convertDateFormat(item.updatedAt!)} 수정</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {ItemAvatar()}

            <ScrollView>
                <ColumnItemInfo/>

                <View style={styles.textInputBoxContainer}>
                    <TextInputBox containerStyle={styles.textInputBox} value={memo}
                                  onChangeHandler={text => setMemo(formatMemo(text))} active={editingMemo}/>
                    <TouchableOpacity style={styles.textEditing}
                                      onPress={() => {
                                          if (editingMemo) {
                                              setEditingMemo(false)
                                              updateItem({...item, memo: memo})
                                              // containerDispatch({type: "UPDATE_FRIDGE_ITEM", item: {...item, memo: memo}})
                                          } else setEditingMemo(true)
                                      }}>
                        <Text style={styles.textEditingText}>{editingMemo ? "저장" : "수정"}</Text>
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
                        updateItem({...item, expiredAt: date})
                        // containerDispatch({type: "UPDATE_FRIDGE_ITEM", item: {...item, expiredAt: date}});
                        setEditingExpiredAt(false);
                    }}/>
            </ScrollView>
        </View>
    )
}

export default DetailItem;