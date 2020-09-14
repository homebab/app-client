import React, {useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, Foundation} from "@expo/vector-icons";


import {styles} from "./styles";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {TabOneParamList, TextInputField} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";

import {addUserItem} from "../../services/api";
import {Item, Storage, useAccountContext} from "../../contexts/Account";

const AddItems = () => {

    const navigation = useNavigation<StackNavigationProp<TabOneParamList, 'AddItems'>>();
    const route = useRoute<RouteProp<TabOneParamList, 'AddItems'>>();

    const {accountState, accountDispatch} = useAccountContext();
    const {profile} = accountState;
    const {id} = profile;

    const [name, setName] = useState<string>('');
    const [expiredAt, setExpiredAt] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [memo, setMemo] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');


    const formatDate = (date: string) => {
        const delimiter = '-';
        const split_date = date.split(delimiter);
        const filtered_date = split_date.map(d => d.replace(/[^0-9]/g, ''));

        const len = filtered_date.length
        if (len === 1) {
            const str = filtered_date[0];

            if (str.length > 4) return str.slice(0, 4) + delimiter + str.slice(4, 5); // over
            else return str // right
        } else if (len === 2) {
            const str = filtered_date[0];
            const mid = filtered_date[1];
            const midInt = parseInt(mid);

            if (mid.length > 2) return str.slice(0, 4) + delimiter + mid.slice(0, 2) + delimiter + mid.slice(2, 3); // over
            else if (mid.length == 2) {
                if (midInt > 12) return str.slice(0, 4) + delimiter + mid.slice(0, 1) + delimiter + mid.slice(1, 2); // over
                else return str.slice(0, 4) + delimiter + mid.slice(0, 2); // right
            } else return str.slice(0, 4) + delimiter + mid.slice(0, 1); // right
        } else if (len === 3) {
            const str = filtered_date[0];
            const mid = filtered_date[1];
            const end = filtered_date[2];
            const endInt = parseInt(end);

            if (1 <= endInt && endInt <= 31) return str + delimiter + mid + delimiter + end.slice(0, 2); // right
            else if (endInt > 31) return str + delimiter + mid + delimiter + '31';
            else return str + delimiter + mid + delimiter;
        } else {
            const str = filtered_date[0];
            const mid = filtered_date[1];
            const end = filtered_date[2];

            return str + delimiter + mid + delimiter + end;
        }

    }

    const onChangeTag = (text: string) => {
        if (text.length > 10) {
            alert("10자리 이상 입력할 수 없습니다.")
            text = text.substr(0, 9)
        }

        //this.props.newItem.category = text
        setTag(text)
    }

    const handleSubmit = () => {
        if ((name).length == 0 || (expiredAt).split('-').length < 3) alert("옳바르지 않은 형식입니다.")
        else {
            // TODO: fetch POST api to upload item image to s3

            // fetch POST api to add user's item on RDS and add the item to container
            addUserItem(id, name, new Date(expiredAt), Storage.FRIDGE, tag, memo, imageUrl)
                .then(res => {
                    const item = res as Item;
                    console.debug("[omtm]: success to add user's item with " + JSON.stringify(res));
                    accountDispatch({type: 'addItem', value: {item: {...item, expiredAt: new Date(item.expiredAt)}}});

                    navigation.navigate('ListItems');
                })
                .catch(err => console.warn("[omtm]: fail to add user's item with " + err))

            // TODO: fetch POST API for event logging

        }

    }

    const bottomTextInputFields: Array<TextInputField> = [
        {
            keyboardType: "numeric",
            placeholder: '2020-2-3',
            value: expiredAt,
            onChangeHandler: (text: string) => setExpiredAt(formatDate(text)),
            icon: <AntDesign name="calendar" size={28} color="#8c8c8c" style={{marginRight: 32}}/>
        },
        {
            keyboardType: "default", placeholder: '미분류', value: tag, onChangeHandler: setTag,
            icon: <AntDesign name="tago" size={28} color="#8c8c8c" style={{marginRight: 32}}/>
        },
        {
            keyboardType: 'default', placeholder: '메모를 입력하시오.', value: memo, onChangeHandler: setMemo,
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

export default AddItems;