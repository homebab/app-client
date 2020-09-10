import React, {useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, Foundation} from "@expo/vector-icons";


import {styles} from "./styles";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {TabOneParamList, TextInputField} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";

const AddItems = () => {

    const navigation = useNavigation<StackNavigationProp<TabOneParamList, 'AddItems'>>();
    const route = useRoute<RouteProp<TabOneParamList, 'AddItems'>>();

    const [name, setName] = useState<string>('');
    const [expiredAt, setExpiredAt] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [memo, setMemo] = useState<string>('');
    const [url, setUrl] = useState<string>('');


    // TODO: precise validate Date format
    const onChangeDate = (text: string) => {
        /* console.log(text) */

        const date = text.split('-');
        console.log(date)

        switch (date.length) {
            case 1:
                if (date[0].length == 4) {
                    if (2019 <= parseInt(date[0]) && parseInt(date[0]) < 5000) text = date[0] + '-'
                    else alert("적절하지 않는 입력값입니다.")
                }

                break;
            case 2:
                if (0 < parseInt(date[1]) && parseInt(date[1]) < 13) {
                    // text = date[0] + '-' + date[1] + '-'    //error 있음
                } else alert("적절하지 않는 입력값입니다.")

                break;
            case 3:
                if (0 < parseInt(date[2]) && parseInt(date[2]) < 32 || date[2] == '') {

                } else alert("적절하지 않는 입력값입니다.")

                break;
        }

        setExpiredAt(text)
    }

    const onChangeTag = (text: string) => {
        if (text.length > 10) {
            alert("10자리 이상 입력할 수 없습니다.")
            text = text.substr(0, 9)
        }

        //this.props.newItem.category = text
        setCategory(text)
    }

    const handleSubmit = () => {
        if ((name).length == 0 || (expiredAt).split('-').length < 3) alert("옳바르지 않은 형식입니다.")
        else {
            // TODO: fetch POST api to upload item image to s3

            // TODO: fetch POST api to add item on RDS

            // TODO: fetch POST API for event logging

            // alert(itemPhoto)
            //
            // this.props.addItem(this.state.newItem, this.props.id, photoItem)

            // console.log(this.props.newContainer)
            // this.props.navigation.navigate('ShowItems')
            // setTimeout(() => this.props.navigation.navigate('ShowItems'), 3000);
        }
        navigation.navigate('ListItems');
    }

    const bottomTextInputFields: Array<TextInputField> = [
        {
            keyboardType: "numeric", placeholder: '2020-2-3', value: expiredAt, onChangeHandler: onChangeDate,
            icon: <AntDesign name="calendar" size={28} color="#8c8c8c" style={{marginRight: 32}}/>
        },
        {
            keyboardType: "default", placeholder: '미분류', value: category, onChangeHandler: setCategory,
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