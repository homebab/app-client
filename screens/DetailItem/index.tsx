import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View, ViewStyle} from "react-native";
import Avatar from "../../components/Avatar";
import Assets from "../../constants/Assets";
import {Item, useContainerContext} from "../../contexts/Container";
import {convertDateFormat} from "../../utils/convert";
import {EvilIcons} from "@expo/vector-icons";

type Props = {
    item: Item
    navigatePop: () => void
}

const RowItemInfo = ({item}: { item: Item }) => {

    const columnItemInfoList = [
        {
            label: "보관상태", value: item.storage,
            containerStyle: {
                flex: 1, alignItems: 'center', borderRightColor: 'rgba(160,169,179,0.8)', borderRightWidth: 0.3
            }
        },
        {
            label: "유통기한", value: convertDateFormat(item.expiredAt!),
            containerStyle: {flex: 1, alignItems: 'center',},
        },
        {
            label: "보관일수", value: new Date().getDate() - item.createdAt!.getDate() + 1,
            containerStyle: {
                flex: 1, alignItems: 'center', borderLeftColor: 'rgba(160,169,179,0.8)', borderLeftWidth: 0.3
            },

        }
    ]

    return (
        <View style={{flexDirection: "row", width: '100%', marginBottom: 24}}>
            {columnItemInfoList.map((info, key) => {
                return (
                    <View key={key} style={info.containerStyle as ViewStyle}>
                        <Text style={{marginBottom: 8, color: 'rgb(100,102,110)'}}>{info.label}</Text>
                        <Text style={{fontWeight: "bold"}}>{info.value}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const TextInputBox = ({active, value, onChangeHandler, containerStyle}: { active: boolean, value: string, onChangeHandler: (t: string) => void, containerStyle: ViewStyle }) => {

    return (
        <View style={containerStyle}>
            <TextInput style={{padding: 20}} keyboardType={"default"} placeholder={"메모 영역 (100자 이하)"}
                       value={value} onChangeText={onChangeHandler} editable={active}/>
        </View>
    )
}

const DetailItem = (props: Props) => {
    const {item, navigatePop} = props;

    const {containerDispatch} = useContainerContext();

    const [memo, setMemo] = useState<string>(item.memo ? item.memo : "");
    const [active, setActive] = useState<boolean>(false);

    return (
        <View style={{flex: 1, width: "92%"}}>
            <View style={{alignItems: 'center', marginBottom: 24}}>
                <Avatar style={{position: "absolute", top: -26}} source={Assets.Image.ingredients} size={52}/>
                <Text style={{marginTop: 36, fontSize: 18}}>{item.name}</Text>
                <View style={{position: "absolute", alignItems: 'center', marginTop: 16, right: '4%'}}>
                    <Text style={{fontSize: 12}}>{convertDateFormat(item.createdAt!)} 등록</Text>
                    <Text style={{fontSize: 12}}>{convertDateFormat(item.updatedAt!)} 수정</Text>
                </View>
            </View>

            <RowItemInfo item={item}/>

            <View style={{flex: 0.5, marginBottom: 20}}>
                <TextInputBox containerStyle={{
                    flex: 1, width: '100%', backgroundColor: 'rgba(208,200,192,0.2)',
                    borderRadius: 8
                }} value={memo} onChangeHandler={text => setMemo(text)} active={active}/>
                <TouchableOpacity style={{position: "absolute", right: "5%", bottom: "10%"}}
                                  onPress={() => {
                                      if(active) {
                                          setActive(false)

                                          console.log({...item, memo: memo})
                                          containerDispatch({type: "updateFridgeItem", value:{item: {...item, memo: memo}}})
                                      }
                                      else setActive(true)
                                  }}>
                    <Text>{active ? "저장" : "수정"}</Text>
                </TouchableOpacity>
            </View>

            {/*<DatePicker/>*/}

            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignSelf: "center", alignItems: 'center', justifyContent: 'center',
                    width: '100%', borderWidth: 1, borderColor: 'rgba(208,200,192,0.5)'
                }}
                onPress={() => {
                    containerDispatch({type: "deleteFridgeItem", value: {id: item.id}})

                    console.debug(`[omtm]: success to delete item, ${item.id}`)
                    navigatePop();
                }}
            >
                <EvilIcons name={"trash"} color={'#d32f2f'} size={32}/>
                <Text style={{padding: 16, fontSize: 16}}> 버리기</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailItem;