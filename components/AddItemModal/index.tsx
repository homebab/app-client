import React, {useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, Foundation} from "@expo/vector-icons";

import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {FridgeNaviParamList, TextInputField} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {Item, Storage, useAccountContext} from "../../contexts/Account";
import {formatDate, formatTag} from "../../validators/format";
import {v4 as uuidv4} from "uuid"

const AddItemModal = () => {

    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'AddItems'>>();
    const route = useRoute<RouteProp<FridgeNaviParamList, 'AddItems'>>();

    const {accountState, accountDispatch} = useAccountContext();
    const {profile, container} = accountState;
    const {id} = profile;

    const [name, setName] = useState<string>('');
    const [expiredAt, setExpiredAt] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [memo, setMemo] = useState<string>('');

    const handleSubmit = () => {
        const splitDate = expiredAt.split('-').map(d => parseInt(d));
        const expiredDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2], 0, 0, 0);

        if ((name).length == 0 || (expiredAt).split('-').length < 3) alert("옳바르지 않은 형식입니다.")
        else {
            // store userItem on Account Context
            const userItem: Item = {
                id: uuidv4(),
                name: name,
                expiredAt: expiredDate,
                storage: Storage.FRIDGE,
                tag: tag,
                memo: memo
            }

            accountDispatch({type: "addItem", value: {item: userItem}})
            navigation.pop()
        }
    }

    const bottomTextInputFields: Array<TextInputField> = [
        {
            keyboardType: "numeric",
            placeholder: '2020-2-3',
            value: expiredAt,
            onChangeHandler: (date: string) => setExpiredAt(formatDate(date)),
            icon: <AntDesign name="calendar" size={28} color="#8c8c8c" style={{marginRight: 32}}/>
        },
        {
            keyboardType: "default",
            placeholder: '미분류 (10자 이내)',
            value: tag,
            onChangeHandler: (tag: string) => setTag(formatTag(tag)),
            icon: <AntDesign name="tago" size={28} color="#8c8c8c" style={{marginRight: 32}}/>
        },
        {
            keyboardType: 'default',
            placeholder: '메모를 입력하시오. (20자 이내)',
            value: memo,
            onChangeHandler: (memo: string) => setTag(formatTag(memo)),
            icon: <Foundation name="clipboard-pencil" size={28} color="#8c8c8c" style={{marginRight: 32}}/>
        }
    ]


    return (
        <View style={styles.container}>

            <View style={styles.headContainer}>
                <View style={styles.imageBox}>

                    {!(route.params == null) &&
                    <Image source={{uri: route.params.itemPhoto.uri}}
                           style={{zIndex: -1, width: "100%", resizeMode: "cover", aspectRatio: 1}}/>}

                    <View style={styles.cameraIconContainer}>
                        <View style={styles.cameraIconWrapper}>
                            <TouchableOpacity style={{}} onPress={() => navigation.navigate("CaptureItems")}>
                                <Foundation name="camera" size={22} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.topTextInputBox}>
                    <TextInput
                        keyboardType='default'
                        placeholder='식자재 이름을 입력하시오.'
                        value={name}
                        onChangeText={setName}
                        style={styles.topTextInput}>
                    </TextInput>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                {bottomTextInputFields.map((f, k) => {
                    return (
                        <View
                            style={styles.bottomTextInputBox}
                            key={k}>
                            {f.icon}
                            <TextInput
                                keyboardType={f.keyboardType}
                                placeholder={f.placeholder}
                                value={f.value}
                                onChangeText={f.onChangeHandler}
                                style={styles.bottomTextInput}>
                            </TextInput>
                        </View>
                    )
                })}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>
                        식자재 추가
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default AddItemModal;